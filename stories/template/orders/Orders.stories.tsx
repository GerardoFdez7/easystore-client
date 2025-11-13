import type { Meta, StoryObj } from '@storybook/nextjs';
import OrdersTemplate from '@templates/orders/Orders';

const meta: Meta<typeof OrdersTemplate> = {
  title: 'Templates/Orders',
  component: OrdersTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'Complete orders management page template. Includes the dashboard header, sidebar navigation, and the main orders section with table, search, and pagination. This is the full page layout that users see when managing orders in the admin panel.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrdersTemplate>;

/**
 * Default view of the orders page showing the complete layout with
 * header, sidebar, and orders table with mock data.
 */
export const Default: Story = {};
