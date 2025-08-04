import type { Meta, StoryObj } from '@storybook/react';
import { ContentSection } from '@molecules/shared/ContentSection';

const meta: Meta<typeof ContentSection> = {
  title: 'Molecules/Shared/ContentSection',
  component: ContentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the section',
    },
    title: {
      control: 'text',
      description: 'Section title',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: false,
      description: 'Content to be displayed in the section',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
  args: {
    id: 'example-section',
    title: 'Example Section',
    children: (
      <div>
        <p className="mb-4 leading-relaxed text-gray-700">
          This is an example content section with some sample text to
          demonstrate how the component looks and behaves.
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
          <li>First bullet point</li>
          <li>Second bullet point</li>
          <li>Third bullet point</li>
        </ul>
      </div>
    ),
  },
};

export const WithCustomClass: Story = {
  args: {
    id: 'custom-section',
    title: 'Custom Styled Section',
    className: 'bg-gray-50 p-4 rounded-lg',
    children: (
      <p className="text-gray-700">
        This section has custom styling applied through the className prop.
      </p>
    ),
  },
};

export const LongContent: Story = {
  args: {
    id: 'long-content',
    title: 'Section with Long Content',
    children: (
      <div>
        <p className="mb-4 leading-relaxed text-gray-700">
          This section demonstrates how the component handles longer content.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="mb-4 leading-relaxed text-gray-700">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-gray-700">
          <li>Multiple paragraphs</li>
          <li>Bullet points</li>
          <li>Proper spacing</li>
          <li>Consistent styling</li>
        </ul>
      </div>
    ),
  },
};
