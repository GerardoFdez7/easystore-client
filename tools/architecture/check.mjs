import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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
    join(stories, `${rel}.stories.tsx`),
    join(stories, `${rel}.stories.jsx`),
    join(stories, `${rel}.story.tsx`),
    join(stories, `${rel}.story.jsx`),
  ];
  if (!candidates.some(existsSync))
    report('ARCH-STORY-001', file, `missing story for ${rel}`);
}
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
