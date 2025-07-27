import type { Preview } from '@storybook/react';
import '../app/[locale]/globals.css';
import { withNextIntl } from './decorators/withNextIntl';
import { withNextThemes } from './decorators/withNextThemes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withNextIntl, withNextThemes],
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
          { value: 'fr', title: 'Français' },
          { value: 'it', title: 'Italiano' },
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
