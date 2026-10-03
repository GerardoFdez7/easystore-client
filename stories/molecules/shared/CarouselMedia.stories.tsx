import { expect as storybookExpect, fn, userEvent } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CarouselMedia from '../../../app/[locale]/components/molecules/shared/CarouselMedia';

const meta: Meta<typeof CarouselMedia> = {
  title: 'Molecules/Shared/CarouselMedia',
  component: CarouselMedia,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CarouselMedia>;

// Sample data for stories (local assets keep the stories deterministic)
const sampleItems = [
  { id: '1', type: 'image' as const, src: '/laptop.webp', alt: 'Laptop' },
  { id: '2', type: 'image' as const, src: '/phone.webp', alt: 'Phone' },
  {
    id: '3',
    type: 'image' as const,
    src: '/portrait_image.webp',
    alt: 'Portrait',
  },
  { id: '4', type: 'image' as const, src: '/default.webp', alt: 'Default' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    autoScroll: false,
  },
  play: async ({ canvas }) => {
    for (const { alt } of sampleItems) {
      await storybookExpect(
        canvas.getByRole('button', { name: alt }),
      ).toBeInTheDocument();
      await storybookExpect(
        canvas.getAllByRole('img', { name: alt }),
      ).toHaveLength(2);
    }
    await storybookExpect(canvas.getByText('Cover')).toBeInTheDocument();
    // View mode: no editing controls.
    await storybookExpect(
      canvas.queryByRole('button', { name: /Remove/ }),
    ).toBeNull();
  },
};

export const Editing: Story = {
  args: {
    items: sampleItems,
    isEditing: true,
    autoScroll: false,
    onRemoveItem: fn(),
    onAddMore: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Phone' }));
    await storybookExpect(args.onRemoveItem).toHaveBeenCalledWith(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Add more' }));
    await storybookExpect(args.onAddMore).toHaveBeenCalledTimes(1);
  },
};
