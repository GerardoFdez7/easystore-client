import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nextVitals from 'eslint-config-next/core-web-vitals';
import graphql from '@graphql-eslint/eslint-plugin';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import security from 'eslint-plugin-security';
import storybook from 'eslint-plugin-storybook';
import tsParser from '@typescript-eslint/parser';
import { plugin as shadcn } from '@shadcn/lint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ignorePatterns = [
  '*.config.js',
  '*.config.ts',
  '*.config.mjs',
  '.storybook',
  'storybook-static',
  '**/generated.ts',
  'app/\\[locale\\]/components/shadcn/ui/**',
];

const eslintConfig = [
  { ignores: ignorePatterns },
  ...nextVitals,
  ...storybook.configs['flat/recommended'],
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: jsxA11y.configs.strict.rules,
  },
  {
    files: [
      'app/**/*.{ts,tsx}',
      'i18n/**/*.ts',
      'server/**/*.ts',
      'stories/**/*.{ts,tsx}',
    ],
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,
      // TypeScript constrains the dynamic keys in this codebase; this heuristic cannot
      // distinguish those safe lookups from user-controlled object access.
      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['server/graphql/**/*.{graphql,gql}'],
    languageOptions: {
      parser: graphql.parser,
      parserOptions: {
        // The API schema is remote, so retain schema-independent document checks in local linting.
        schemaSdl: 'type Query { _empty: String }',
      },
    },
    plugins: {
      '@graphql-eslint': graphql,
    },
    rules: {
      '@graphql-eslint/naming-convention': [
        'error',
        {
          VariableDefinition: 'camelCase',
          OperationDefinition: 'camelCase',
          FragmentDefinition: 'PascalCase',
        },
      ],
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/no-duplicate-fields': 'error',
    },
  },
  {
    files: ['app/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
    plugins: {
      shadcn,
    },
    settings: {
      shadcn: {
        componentImports: ['^@shadcn/ui(/|$)'],
        note: 'Follow DESIGN.md and use semantic EasyStore tokens from app/[locale]/globals.css.',
      },
    },
    rules: {
      'shadcn/no-arbitrary-values': 'error',
      'shadcn/no-inline-styles': 'error',
      'shadcn/no-raw-colors': 'error',
      'shadcn/no-unknown-classes': 'error',
      'shadcn/require-static-classes': 'off',
    },
  },
  {
    files: [
      'app/**/*.{ts,tsx}',
      'i18n/**/*.ts',
      'server/**/*.ts',
      'stories/**/*.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // React 17+ automatic JSX runtime: don't treat `React` as implicitly used.
        jsxPragma: null,
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Base rules
      curly: 'error',
      eqeqeq: ['error', 'always'],

      // TypeScript enhanced rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Automatic JSX runtime: let unused `import React` be reported.
      'react/jsx-uses-react': 'off',
      'react-hooks/immutability': 'error',
      'react-hooks/purity': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],

      // Code organization
      'padding-line-between-statements': [
        'error',
        // Variable declarations
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: '*', next: ['const', 'let', 'var'] },

        // Functions
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'function', next: '*' },

        // Classes
        { blankLine: 'always', prev: '*', next: 'class' },
        { blankLine: 'always', prev: 'class', next: '*' },

        // Imports/exports
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
      ],

      // Prettier integration
      'prettier/prettier': 'warn',
    },
  },
  prettierRecommended,
];

export default eslintConfig;
