import { CarouselItem } from '@shadcn/ui/carousel';
import { ReactNode } from 'react';

interface ItemFeatureProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export default function ItemFeature({ icon, title, text }: ItemFeatureProps) {
  return (
    <CarouselItem className="basis-full pl-4 sm:w-92 sm:basis-auto sm:pl-0">
      <div className="bg-card h-41.25 basis-auto rounded-lg p-4">
        <div className="mb-4 flex items-center gap-2">
          {icon}
          <h3 className="text-text text-2xl leading-[0.95] font-bold sm:text-[28px]">
            {title}
          </h3>
        </div>
        <p className="text-text text-2xl leading-[0.95]">{text}</p>
      </div>
    </CarouselItem>
  );
}
