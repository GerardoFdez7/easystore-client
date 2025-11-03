import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Add path aliases from tsconfig.json
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
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
        '@shadcn': path.resolve(__dirname, '../app/[locale]/components/shadcn'),
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
      };
    }

    return config;
  },
};
export default config;
