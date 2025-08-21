'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@shadcn/ui/carousel';
import ImageThumb from '@atoms/shared/ImageThumb';
import VideoThumb from '@atoms/shared/VideoThumb';
import { cn } from 'utils';

interface CarouselMediaProps {
  items: Array<{
    id: string;
    type: 'image' | 'video';
    src: string;
    alt: string;
  }>;
  className?: string;
  autoScroll?: boolean;
}

const CarouselMedia = ({
  items,
  className,
  autoScroll = false,
}: CarouselMediaProps) => {
  const orderedItems = items;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const newIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    // Ensure thumbnail carousel shows the selected item
    //thumbsApi.scrollTo(newIndex);
  }, [mainApi, thumbsApi]);

  React.useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect).on('reInit', onSelect);
  }, [mainApi, onSelect]);

  return (
    <div className={cn('embla sm:m-2', className)}>
      {/* Main Carousel */}
      <Carousel
        setApi={setMainApi}
        className="overflow-hidden rounded-lg"
        opts={{
          align: 'start',
          loop: false,
          watchDrag: true,
        }}
        autoScroll={autoScroll}
      >
        <CarouselContent className="flex gap-4">
          {orderedItems.map((item) => (
            <CarouselItem key={item.id} className="min-w-0 flex-[0_0_100%]">
              <div className="relative mx-auto mb-3 aspect-video w-full max-w-2xl">
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="rounded-lg object-cover transition-opacity"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                ) : (
                  <video
                    className="h-full w-full rounded-lg object-cover transition-opacity"
                    controls
                    src={item.src}
                    aria-label={item.alt}
                    preload="metadata"
                    autoPlay
                    muted
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Carousel */}
      <div className="px-3 lg:px-5">
        <Carousel
          setApi={setThumbsApi}
          className="overflow-hidden rounded-xl"
          opts={{
            containScroll: 'keepSnaps',
            dragFree: true,
            align: 'start',
            startIndex: 0,
          }}
        >
          <CarouselContent className="flex gap-2 lg:gap-3">
            {orderedItems.map((item, index) => (
              <CarouselItem key={item.id} className="basis-auto">
                {item.type === 'image' ? (
                  <ImageThumb
                    key={item.id}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    imageSrc={item.src}
                    altText={item.alt}
                  />
                ) : (
                  <VideoThumb
                    key={item.id}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                    videoSrc={item.src}
                    altText={item.alt}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselMedia;
