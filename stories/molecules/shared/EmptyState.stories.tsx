import type { Meta, StoryObj } from '@storybook/nextjs';
import EmptyState from '@molecules/shared/EmptyState';
import { Home, PlusCircle, Settings, Warehouse } from 'lucide-react';

const meta = {
  title: 'Molecules/Shared/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The EmptyState component is used to display a message when there is no content to show, often accompanied by an icon and an action button. It guides users on what to do next in an empty section.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['Home', 'PlusCircle', 'Settings', 'Warehouse'],
      mapping: {
        Home: Home,
        PlusCircle: PlusCircle,
        Settings: Settings,
        Warehouse: Warehouse,
      },
      description: 'The Lucide icon to display at the top of the empty state.',
    },
    title: {
      control: 'text',
      description: 'The main title or heading for the empty state.',
    },
    description: {
      control: 'text',
      description:
        'A detailed description explaining why the state is empty and what the user can do.',
    },
    buttonText: {
      control: 'text',
      description: 'The text displayed on the action button.',
    },
    onButtonClick: {
      action: 'button clicked',
      description:
        'Callback function to be executed when the button is clicked.',
    },
    buttonVariant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'title',
      ],
      defaultValue: 'title',
      description: 'The visual style of the action button.',
    },
    buttonIcon: {
      control: 'select',
      options: ['Home', 'PlusCircle', 'Settings', 'Warehouse', undefined],
      mapping: {
        Home: Home,
        PlusCircle: PlusCircle,
        Settings: Settings,
        Warehouse: Warehouse,
        undefined: undefined,
      },
      description: 'Optional Lucide icon to display next to the button text.',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Settings,
    title: 'No items found',
    description:
      'It looks like there are no items to display here yet. Start by adding a new item.',
    buttonText: 'Add New Item',
    onButtonClick: () => alert('Add New Item clicked!'),
  },
};

export const WithDifferentIcon: Story = {
  args: {
    icon: PlusCircle,
    title: 'Create your first product',
    description:
      'You havent added any products yet. Click the button below to get started.',
    buttonText: 'Create Product',
    onButtonClick: () => alert('Create Product clicked!'),
  },
};

export const WithOutlineButton: Story = {
  args: {
    icon: Home,
    title: 'No data available',
    description:
      'There is no data to show at the moment. Please try again later or adjust your filters.',
    buttonText: 'Refresh Data',
    onButtonClick: () => alert('Refresh Data clicked!'),
    buttonVariant: 'outline',
  },
};

export const WithButtonIcon: Story = {
  args: {
    icon: Home,
    title: 'No tasks assigned',
    description:
      'You currently have no tasks assigned. Assign new tasks to see them here.',
    buttonText: 'Assign Task',
    onButtonClick: () => alert('Assign Task clicked!'),
    buttonIcon: PlusCircle,
  },
};

export const WithWarehouseIcon: Story = {
  args: {
    icon: Warehouse,
    title: 'No stock available',
    description:
      'The selected product is currently out of stock. Please check back later.',
    buttonText: 'View other products',
    onButtonClick: () => alert('View other products clicked!'),
  },
};
