import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TEMPLATE_PATH = '.github/PULL_REQUEST_TEMPLATE.md';

// Testing labels that only apply when stories or tests changed. At least one of
// them must carry content, but each one individually may stay empty.
const CONDITIONAL_LABEL_PREFIXES = [
  'Stories added or updated',
  'Story tests added or updated',
  'If stories or tests were unchanged',
];

const stripComments = (text) => text.replace(/<!--[\s\S]*?-->/g, '');

const splitSections = (markdown) => {
  const sections = new Map();
  let current = null;
  for (const line of stripComments(markdown).split(/\r?\n/)) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      current = heading[1];
      sections.set(current, []);
    } else if (current) {
      sections.get(current).push(line);
    }
  }
  return sections;
};

// A line is meaningful when something other than a bullet, checkbox, or bare
// label remains after removing template scaffolding.
const lineValue = (line) => {
  const text = line
    .replace(/^\s*[-*]\s*(\[[ xX]\]\s*)?/, '')
    .replace(/\*\*/g, '')
    .trim();
  const labelled = /^[^:]{1,160}:\s*(.*)$/.exec(text);
  return (labelled ? labelled[1] : text).trim();
};

const hasContent = (lines) => lines.some((line) => lineValue(line) !== '');

const TOP_LEVEL_LABEL = /^[-*]\s+\*\*(.+?)\*\*/;

const labelBlocks = (lines) => {
  const blocks = [];
  for (const line of lines) {
    const match = TOP_LEVEL_LABEL.exec(line);
    if (match) {
      blocks.push({ label: match[1].replace(/:\s*$/, ''), lines: [line] });
    } else if (blocks.length > 0) {
      blocks.at(-1).lines.push(line);
    }
  }
  return blocks;
};

const checklistItems = (lines) =>
  lines
    .map((line) => /^\s*[-*]\s+\[([ xX])\]\s+(.+?)\s*$/.exec(line))
    .filter(Boolean)
    .map(([, mark, text]) => ({ checked: mark !== ' ', text }));

const isConditional = (label) =>
  CONDITIONAL_LABEL_PREFIXES.some((prefix) => label.startsWith(prefix));

/**
 * Validates a pull request body against the template structure.
 * @returns {string[]} human-readable problems; empty when the body conforms.
 */
export const validate = (template, body) => {
  const problems = [];
  const expected = splitSections(template);
  const actual = splitSections(body ?? '');

  const expectedHeadings = [...expected.keys()];
  const actualHeadings = [...actual.keys()].filter((heading) =>
    expected.has(heading),
  );
  for (const heading of expectedHeadings) {
    if (!actual.has(heading)) problems.push(`Missing section "## ${heading}".`);
  }
  if (
    expectedHeadings.every((heading) => actual.has(heading)) &&
    expectedHeadings.join('\n') !== actualHeadings.join('\n')
  ) {
    problems.push(
      `Sections are out of order. Expected: ${expectedHeadings.join(', ')}.`,
    );
  }

  for (const [heading, templateLines] of expected) {
    const lines = actual.get(heading);
    if (!lines) continue;

    const templateItems = checklistItems(templateLines);
    if (templateItems.length > 0) {
      const found = checklistItems(lines);
      for (const item of templateItems) {
        const match = found.find((candidate) => candidate.text === item.text);
        if (!match) problems.push(`"${heading}": missing item "${item.text}".`);
        else if (!match.checked)
          problems.push(`"${heading}": unchecked item "${item.text}".`);
      }
      continue;
    }

    const templateBlocks = labelBlocks(templateLines);
    if (templateBlocks.length === 0) {
      if (!hasContent(lines)) problems.push(`"${heading}": section is empty.`);
      continue;
    }

    const found = labelBlocks(lines);
    let conditionalFilled = false;
    let conditionalSeen = false;
    for (const { label } of templateBlocks) {
      const block = found.find((candidate) => candidate.label === label);
      if (!block) {
        problems.push(`"${heading}": missing field "${label}".`);
        continue;
      }
      const filled = hasContent(block.lines);
      if (isConditional(label)) {
        conditionalSeen = true;
        conditionalFilled ||= filled;
      } else if (!filled) {
        problems.push(`"${heading}": field "${label}" is empty.`);
      }
    }
    if (conditionalSeen && !conditionalFilled) {
      problems.push(
        `"${heading}": fill the stories or tests fields, or explain why existing coverage is sufficient.`,
      );
    }
  }

  return problems;
};

const main = () => {
  const template = readFileSync(TEMPLATE_PATH, 'utf8');
  const problems = validate(template, process.env.PR_BODY);
  if (problems.length === 0) {
    console.log('Pull request description follows the template.');
    return;
  }
  for (const problem of problems) console.error(`::error::${problem}`);
  console.error(
    `\nThe pull request description does not follow ${TEMPLATE_PATH}:\n` +
      problems.map((problem) => `- ${problem}`).join('\n'),
  );
  process.exitCode = 1;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
