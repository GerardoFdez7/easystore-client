import type { Meta, StoryObj } from '@storybook/nextjs';
import OrdersTemplate from '@templates/Orders';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  title: 'Templates/Orders',
  component: OrdersTemplate,
  decorators: [withCountdown],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Orders workspace template with authenticated navigation and its current construction state.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OrdersTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnderConstruction: Story = {};
