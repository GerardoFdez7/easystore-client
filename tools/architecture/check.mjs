import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '../..');
const components = join(root, 'app', '[locale]', 'components');
const stories = join(root, 'stories');
const findings = [];
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? files(p) : [p];
  });
const display = (p) => relative(root, p).split(sep).join('/');
const report = (rule, file, evidence) =>
  findings.push({ rule, file: display(file), evidence });
const layerOf = (p) =>
  p
    .split(sep)
    .find((x) =>
      ['atoms', 'molecules', 'organisms', 'templates', 'shadcn'].includes(x),
    );
const imports = (file, source) => {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const out = [];
  const visit = (n) => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier))
      out.push(n.moduleSpecifier.text);
    if (ts.isExportDeclaration(n) && n.moduleSpecifier?.text)
      out.push(n.moduleSpecifier.text);
    if (
      ts.isCallExpression(n) &&
      n.expression.kind === ts.SyntaxKind.ImportKeyword &&
      ts.isStringLiteral(n.arguments[0])
    )
      out.push(n.arguments[0].text);
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
};
const targetLayer = (file, spec) => {
  if (spec.startsWith('@'))
    return spec.match(/^@(atoms|molecules|organisms|templates|shadcn)\//)?.[1];
  if (!spec.startsWith('.')) return null;
  return layerOf(resolve(dirname(file), spec));
};
const rank = { atoms: 0, molecules: 1, organisms: 2, templates: 3 };
const sourceFile = (file) =>
  ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  );
const isCodeFile = (file) => /\.(?:[cm]?[jt]sx?)$/.test(file);
const isStoryFile = (file) => /\.stories?\.(?:[cm]?[jt]sx?)$/.test(file);
const unwrap = (node) => {
  if (!node) return undefined;
  let value = node;
  while (
    ts.isParenthesizedExpression(value) ||
    ts.isAsExpression(value) ||
    ts.isSatisfiesExpression(value) ||
    ts.isNonNullExpression(value)
  )
    value = value.expression;
  return value;
};
const propertyName = (property) =>
  ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
    ? property.name.text
    : undefined;
const isExpectCall = (node, expectNames) =>
  ts.isCallExpression(node) &&
  ts.isIdentifier(node.expression) &&
  expectNames.has(node.expression.text);
const hasExpectAssertion = (node, expectNames) => {
  let asserted = false;
  const visit = (child) => {
    if (
      ts.isCallExpression(child) &&
      ts.isPropertyAccessExpression(child.expression) &&
      isExpectCall(child.expression.expression, expectNames)
    )
      asserted = true;
    if (!asserted) ts.forEachChild(child, visit);
  };
  visit(node);
  return asserted;
};
const objectPlay = (node) => {
  const value = unwrap(node);
  if (!ts.isObjectLiteralExpression(value)) return undefined;
  return value.properties.find((property) => propertyName(property) === 'play');
};
const playExpression = (property) => {
  if (!property) return undefined;
  if (ts.isPropertyAssignment(property)) return property.initializer;
  if (ts.isMethodDeclaration(property)) return property;
  return undefined;
};
const storyCandidates = (sourceFile) => {
  const declarations = new Map();
  const exported = new Map();
  for (const statement of sourceFile.statements) {
    if (ts.isVariableStatement(statement)) {
      const isExported = statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      );
      for (const declaration of statement.declarationList.declarations)
        if (ts.isIdentifier(declaration.name)) {
          declarations.set(declaration.name.text, declaration.initializer);
          if (isExported)
            exported.set(declaration.name.text, declaration.name.text);
        }
    }
    if (
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement)) &&
      statement.name &&
      statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      )
    ) {
      declarations.set(statement.name.text, statement);
      exported.set(statement.name.text, statement.name.text);
    }
    if (ts.isExportDeclaration(statement) && !statement.moduleSpecifier)
      for (const element of statement.exportClause?.elements ?? [])
        exported.set(
          element.name.text,
          (element.propertyName ?? element.name).text,
        );
  }
  return { declarations, exported };
};
const verifyStorybookRules = (file) => {
  const sf = sourceFile(file);
  const expectNames = new Set();
  const apolloMockNames = new Set();
  for (const statement of sf.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    )
      continue;
    const specifier = statement.moduleSpecifier.text;
    const named = statement.importClause?.namedBindings;
    if (specifier === 'storybook/test' && named && ts.isNamedImports(named))
      for (const element of named.elements)
        if (
          element.propertyName?.text === 'expect' ||
          element.name.text === 'expect'
        )
          expectNames.add(element.name.text);
    if (isStoryFile(file) && statement.importClause) {
      const hasStoryType =
        statement.importClause.isTypeOnly ||
        (named &&
          ts.isNamedImports(named) &&
          named.elements.some(
            (element) =>
              element.isTypeOnly ||
              ['Meta', 'StoryObj', 'StoryFn'].includes(
                (element.propertyName ?? element.name).text,
              ),
          ));
      if (hasStoryType && specifier !== '@storybook/nextjs-vite')
        report(
          'storybook-nextjs-vite-required',
          file,
          `story type import from ${specifier}`,
        );
    }
    if (
      /^@apollo\/client\/testing(?:\/|$)/.test(specifier) &&
      named &&
      ts.isNamedImports(named)
    )
      for (const element of named.elements)
        if (
          ['MockedProvider', 'MockLink', 'MockSubscriptionLink'].includes(
            (element.propertyName ?? element.name).text,
          )
        )
          apolloMockNames.add(element.name.text);
  }
  if (apolloMockNames.size)
    report(
      'storybook-apollo-msw-required',
      file,
      `uses Apollo testing mock ${[...apolloMockNames].join(', ')}`,
    );
  if (!isStoryFile(file)) return;
  const { declarations, exported } = storyCandidates(sf);
  const resolvePlay = (value, seen = new Set()) => {
    const expression = unwrap(value);
    if (!expression) return undefined;
    if (ts.isIdentifier(expression) && !seen.has(expression.text)) {
      seen.add(expression.text);
      return resolvePlay(declarations.get(expression.text), seen);
    }
    return expression;
  };
  let metaPlay;
  for (const statement of sf.statements)
    if (ts.isExportAssignment(statement) && !statement.isExportEquals)
      metaPlay = playExpression(objectPlay(resolvePlay(statement.expression)));
  for (const [name, localName] of exported) {
    const story = declarations.get(localName);
    const ownPlay = playExpression(objectPlay(resolvePlay(story)));
    const effectivePlay = ownPlay ?? metaPlay;
    if (
      !effectivePlay ||
      !hasExpectAssertion(resolvePlay(effectivePlay), expectNames)
    )
      report(
        'storybook-story-test-required',
        file,
        `story ${name} needs an effective play assertion from storybook/test`,
      );
  }
};
for (const file of files(components).filter((p) => /\.(tsx?|jsx?)$/.test(p))) {
  const source = readFileSync(file, 'utf8');
  const from = layerOf(file);
  for (const spec of imports(file, source)) {
    const to = targetLayer(file, spec);
    if (from === 'shadcn' && to && to !== 'shadcn')
      report('ARCH-SHADCN-001', file, `imports ${to} via ${spec}`);
    if (
      rank[from] !== undefined &&
      rank[to] !== undefined &&
      rank[to] > rank[from]
    )
      report('ARCH-LAYER-001', file, `imports ${to} via ${spec}`);
    if (
      (from === 'atoms' || from === 'molecules') &&
      /(?:apollo|graphql|fetch|axios|graphql-request)/i.test(spec)
    )
      report('ARCH-DATA-001', file, `network/data import ${spec}`);
  }
}
// Every component source has a matching Storybook file, preserving relative grouping.
for (const file of files(components).filter((p) => /\.(tsx?|jsx?)$/.test(p))) {
  const rel = relative(components, file).replace(/\.(tsx?|jsx?)$/, '');
  const candidates = [
    'ts',
    'tsx',
    'js',
    'jsx',
    'mts',
    'mtsx',
    'mjs',
    'mjsx',
  ].flatMap((extension) => [
    join(stories, `${rel}.stories.${extension}`),
    join(stories, `${rel}.story.${extension}`),
  ]);
  if (!candidates.some(existsSync))
    report('ARCH-STORY-001', file, `missing story for ${rel}`);
}
for (const directory of [stories, join(root, '.storybook')])
  for (const file of files(directory).filter(isCodeFile))
    verifyStorybookRules(file);
const localeFiles = files(join(root, 'messages')).filter((p) =>
  /\.(json|ts)$/.test(p),
);
if (localeFiles.length >= 2) {
  const parse = (p) => {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      return {};
    }
  };
  const flatten = (o, pre = '') =>
    Object.entries(o).flatMap(([k, v]) =>
      typeof v === 'object' && v ? flatten(v, `${pre}${k}.`) : [`${pre}${k}`],
    );
  const shapes = localeFiles.map((p) => [p, new Set(flatten(parse(p)))]);
  const base = shapes[0][1];
  for (const [p, keys] of shapes.slice(1))
    for (const k of base)
      if (!keys.has(k)) report('ARCH-I18N-001', p, `missing key ${k}`);
  for (const [p, keys] of shapes.slice(1))
    for (const k of keys)
      if (!base.has(k)) report('ARCH-I18N-001', p, `extra key ${k}`);
}
const normalized = findings.sort((a, b) =>
  `${a.rule}:${a.file}:${a.evidence}`.localeCompare(
    `${b.rule}:${b.file}:${b.evidence}`,
  ),
);
for (const x of normalized) console.error(`${x.rule} ${x.file}: ${x.evidence}`);
if (normalized.length) process.exitCode = 1;
