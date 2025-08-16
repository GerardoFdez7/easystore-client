import type { Meta, StoryObj } from '@storybook/react';
import { Star } from 'lucide-react';
import ItemFeature from '@atoms/landing/ItemFeature';
import { Carousel, CarouselContent } from '@shadcn/ui/carousel';

const meta: Meta<typeof ItemFeature> = {
  title: 'Atoms/Landing/ItemFeature',
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
