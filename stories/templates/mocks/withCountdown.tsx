import type { Decorator } from '@storybook/nextjs-vite';
import { CountdownProvider } from '@lib/contexts/CountdownContext';

export const withCountdown: Decorator = (Story) => (
  <CountdownProvider>
    <Story />
  </CountdownProvider>
);
