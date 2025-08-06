import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@shadcn/ui/carousel';
import Image from 'next/image';
import * as React from 'react';

interface MediaItem {
  id: string;
  url: string;
  position: number;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface Product {
  id: string;
  name: string;
  status: string;
  inventory: number;
  category: string;
  cover: string; // Mandatory cover image
  media?: MediaItem[]; // Optional media array
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export function ProductCard({
  product,
  isSelected,
  onSelect,
}: ProductCardProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Sort all media by position (both images and videos)
  const allMedia = product.media
    ? product.media.sort((a, b) => a.position - b.position)
    : [];

  // Create media array: cover first, then all media items
  const mediaItems = [
    { url: product.cover, mediaType: 'IMAGE' as const },
    ...allMedia,
  ];

  return (
    <div className="bg-card overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
      <div className="group relative">
        {mediaItems.length > 1 ? (
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {mediaItems.map((mediaItem, index) => (
                <CarouselItem key={index}>
                  <div className="h-48 w-full overflow-hidden">
                    {mediaItem.mediaType === 'IMAGE' ? (
                      <Image
                        src={mediaItem.url}
                        alt={`${product.name} ${index === 0 ? '(cover)' : `media ${index}`}`}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={mediaItem.url}
                        className="h-full w-full object-cover"
                        controls
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <CarouselNext className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </Carousel>
        ) : (
          <div className="h-48 w-full overflow-hidden">
            {mediaItems[0].mediaType === 'IMAGE' ? (
              <Image
                src={mediaItems[0].url}
                alt={product.name}
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                src={mediaItems[0].url}
                className="h-full w-full object-cover"
                controls
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="bg-white backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="text-muted-foreground text-center text-xs">
          Slide {current} of {count}
        </div>
        <h3 className="text-title mb-3 text-[16px] font-medium">
          {product.name}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Status:</span>
            <span className="text-foreground text-sm font-medium">
              {product.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Inventory:</span>
            <span className="text-foreground text-sm font-medium">
              {product.inventory}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">Category:</span>
            <span className="text-foreground text-sm">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
