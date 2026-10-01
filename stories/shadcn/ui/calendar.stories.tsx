import type { Meta, StoryObj } from '@storybook/nextjs';
import { Calendar } from '@shadcn/ui/calendar';

const selectedDate = new Date(2026, 8, 15);

const meta = {
  title: 'Shadcn/UI/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    defaultMonth: selectedDate,
    mode: 'single',
    selected: selectedDate,
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectedDate: Story = {};

export const WithUnavailableDates: Story = {
  args: {
    disabled: [
      { before: new Date(2026, 8, 10) },
      { after: new Date(2026, 8, 20) },
    ],
  },
};
