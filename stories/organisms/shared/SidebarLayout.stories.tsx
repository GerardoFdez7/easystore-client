import type { Meta, StoryObj } from '@storybook/nextjs';
import SidebarLayout from '@organisms/shared/SidebarLayout';

const meta = {
  title: 'Organisms/Shared/SidebarLayout',
  component: SidebarLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Workspace shell that composes the shared navigation sidebar, page header, and responsive content inset.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description:
        'Page content rendered inside the responsive workspace inset.',
    },
    title: {
      control: 'text',
      description: 'Accessible page heading shown in the workspace header.',
    },
  },
  args: {
    title: 'Inventory',
    children: (
      <section className="bg-card text-card-foreground border-border mx-4 rounded-lg border p-6">
        <h2 className="text-title text-xl font-semibold">Inventory overview</h2>
        <p className="text-muted-foreground mt-2">
          Review warehouse availability and recent stock activity.
        </p>
      </section>
    ),
  },
} satisfies Meta<typeof SidebarLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongContent: Story = {
  args: {
    title: 'Product catalog',
    children: (
      <div className="grid gap-4 px-4 md:grid-cols-2">
        {['Active products', 'Archived products', 'Low stock', 'Drafts'].map(
          (label) => (
            <section
              key={label}
              className="bg-card text-card-foreground border-border min-h-40 rounded-lg border p-6"
            >
              <h2 className="text-title font-semibold">{label}</h2>
              <p className="text-muted-foreground mt-2">
                Representative workspace content for responsive layout review.
              </p>
            </section>
          ),
        )}
      </div>
    ),
  },
};
