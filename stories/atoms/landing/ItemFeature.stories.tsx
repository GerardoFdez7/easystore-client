import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Star } from 'lucide-react';
import ItemFeature from '@atoms/landing/ItemFeature';
import { Carousel, CarouselContent } from '@shadcn/ui/carousel';

const meta: Meta<typeof ItemFeature> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(
      await canvas.findByRole('heading', { name: 'Fast Setup' }),
    ).toBeInTheDocument();
    await storybookExpect(
      canvas.getByText('Get started quickly with minimal setup.'),
    ).toBeInTheDocument();
  },
  title: 'Atoms/Landing/ItemFeature',
  parameters: {
    layout: 'centered',
  },
  component: ItemFeature,
  decorators: [
    (Story) => (
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          <Story />
        </CarouselContent>
      </Carousel>
    ),
  ],
  args: {
    icon: <Star />,
    title: 'Fast Setup',
    text: 'Get started quickly with minimal setup.',
  },
};

export default meta;

type Story = StoryObj<typeof ItemFeature>;

export const Default: Story = {};
