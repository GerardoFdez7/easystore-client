import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ignorePatterns = [
  '*.config.js',
  '*.config.ts',
  '*.config.mjs',
  '.storybook',
  '**/generated.ts',
];

const eslintConfig = [
  { ignores: ignorePatterns },
  ...nextVitals,
  ...storybook.configs['flat/recommended'],
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

      // React Compiler diagnostics are opt-in while the existing components
      // are progressively migrated to its stricter render and effect model.
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
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
          format: ['camelCase', 'PascalCase'],
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
