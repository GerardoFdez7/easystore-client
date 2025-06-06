import type { Preview } from '@storybook/react';
import '../app/[locale]/globals.css';
import { withNextIntl } from './decorators/withNextIntl';

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
  decorators: [withNextIntl],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
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
  },
};

export default preview;
