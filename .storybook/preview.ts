import type { Preview } from '@storybook/nextjs-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { withNextIntl } from './decorators/withNextIntl';
import { withNextThemes } from './decorators/withNextThemes';
import { withApollo } from './decorators/withApollo';
import { withAuth } from './decorators/withAuth';
import { apolloMswHandler } from '../app/[locale]/lib/storybook/ApolloMswMocks';
// @ts-ignore - CSS import for styling
import '../app/[locale]/globals.css';

const preview: Preview = {
  parameters: {
    msw: {
      handlers: [apolloMswHandler],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      // Accessibility addon configuration
      config: {
        rules: [
          {
            // Allow color contrast issues for now (can be strict later)
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },

      // Run accessibility checks automatically
      manual: false,

      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
  decorators: [withAuth, withApollo, withNextIntl, withNextThemes],
  // mswLoader() creates and initializes the browser worker for CSF 3 stories.
  loaders: [mswLoader()],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
          { value: 'pt', title: 'Português' },
        ],
      },
    },
    theme: {
      name: 'Theme',
      description: 'Themes',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
      },
    },
  },
};

export default preview;
