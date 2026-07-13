import type { Meta, StoryObj } from '@storybook/nextjs';
import KPICardsSkeleton from '@molecules/dashboard/KPICardsSkeleton';

const meta: Meta<typeof KPICardsSkeleton> = {
  title: 'Molecules/Dashboard/KPICardsSkeleton',
  component: KPICardsSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading component for the KPI cards section in the dashboard. Displays 4 animated skeleton cards in a responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop). Each card shows placeholders for the title, icon, value, and description matching the structure of the KPICards component.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default KPI Cards skeleton showing the loading state for all 4 KPI metrics
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default skeleton state displaying 4 KPI cards with animated loading placeholders. The cards adapt responsively to different screen sizes, maintaining the same grid layout as the actual KPICards component.',
      },
    },
  },
};

/**
 * Mobile viewport showing single column layout
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'KPI Cards skeleton on mobile devices, displaying cards in a single column for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet viewport showing 2-column layout
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story:
          'KPI Cards skeleton on tablet devices, displaying cards in a 2-column grid layout.',
      },
    },
  },
};

/**
 * Desktop viewport showing full 4-column layout
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          'KPI Cards skeleton on desktop screens, displaying all 4 cards in a single row for maximum information density.',
      },
    },
  },
};
