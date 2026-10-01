import type { Meta, StoryObj } from '@storybook/nextjs';
import CustomersTemplate from '@templates/Customers';
import { withCountdown } from './mocks/withCountdown';

const meta = {
  title: 'Templates/Customers',
  component: CustomersTemplate,
  decorators: [withCountdown],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Customers workspace template with authenticated navigation and its current construction state.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomersTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UnderConstruction: Story = {};
