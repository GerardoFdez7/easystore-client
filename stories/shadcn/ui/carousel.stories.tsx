import { expect as storybookExpect, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shadcn/ui/carousel';

const meta: Meta<typeof Carousel> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await storybookExpect(canvas.getByText('Slide 1')).toBeInTheDocument();
  },
  title: 'Shadcn/UI/Carousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4].map((i) => (
            <CarouselItem key={i} className="basis-1/2 p-4">
              <div className="flex h-24 items-center justify-center rounded-lg border text-xl">
                Slide {i}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
