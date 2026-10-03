import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-mcp',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  features: {
    componentsManifest: true,
  },
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          '@atoms': path.resolve(__dirname, '../app/[locale]/components/atoms'),
          '@molecules': path.resolve(
            __dirname,
            '../app/[locale]/components/molecules',
          ),
          '@organisms': path.resolve(
            __dirname,
            '../app/[locale]/components/organisms',
          ),
          '@templates': path.resolve(
            __dirname,
            '../app/[locale]/components/templates',
          ),
          '@shadcn': path.resolve(
            __dirname,
            '../app/[locale]/components/shadcn',
          ),
          '@schemas': path.resolve(__dirname, '../app/[locale]/schemas'),
          '@hooks': path.resolve(__dirname, '../app/[locale]/hooks'),
          '@types': path.resolve(__dirname, '../app/[locale]/lib/types'),
          '@lib': path.resolve(__dirname, '../app/[locale]/lib'),
          '@contexts': path.resolve(__dirname, '../app/[locale]/lib/contexts'),
          '@consts': path.resolve(__dirname, '../app/[locale]/lib/consts'),
          utils: path.resolve(__dirname, '../app/[locale]/lib/utils/cn'),
          '@graphql': path.resolve(__dirname, '../server/graphql'),
          '@errors': path.resolve(__dirname, '../server/errors'),
          '@i18n': path.resolve(__dirname, '../i18n'),
          '@shadcn/ui': path.resolve(
            __dirname,
            '../app/[locale]/components/shadcn/ui',
          ),
        },
      },
    }) as typeof config,
};
export default config;
