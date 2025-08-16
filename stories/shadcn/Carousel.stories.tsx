import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shadcn/ui/carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Shadcn/Carousel',
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
