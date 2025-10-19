import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@shadcn/ui/carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@lib/consts/products';
import ProductStatus from '@atoms/products/ProductStatus';
import BadgeTag from '@atoms/shared/BadgeTag';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [previewIndex, setPreviewIndex] = React.useState<number | null>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // Update current slide
    setCurrent(api.selectedScrollSnap() + 1);

    // Update scroll capabilities
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    // Listen for selection changes
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  // Sort all media by position (both images and videos)
  const allMedia = product.media
    ? [...product.media].sort((a, b) => a.position - b.position)
    : [];

  // Create media array: cover first, then all media items
  const mediaItems = [
    { url: product.cover, mediaType: 'IMAGE' as const },
    ...allMedia,
  ];

  const handleIndicatorHover = (index: number) => {
    setPreviewIndex(index);
  };

  const handleIndicatorLeave = () => {
    setPreviewIndex(null);
  };

  const handleIndicatorClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const handleNavigateToProduct = () => {
    router.push(`/products/${product.id}`);
  };

  const renderMediaContent = (
    mediaItem: (typeof mediaItems)[0],
    isPreview = false,
  ) => {
    if (mediaItem.mediaType === 'IMAGE') {
      return (
        <Image
          src={mediaItem.url}
          alt={`${product.name} ${isPreview ? 'preview' : 'media'}`}
          width={300}
          height={200}
          className="h-full w-full object-cover"
        />
      );
    } else {
      return (
        <video
          src={mediaItem.url}
          className="h-full w-full object-cover"
          controls={!isPreview}
          preload="metadata"
          muted={isPreview}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="bg-card overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
      <div className="group relative">
        {mediaItems.length > 1 ? (
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {mediaItems.map((mediaItem, index) => (
                <CarouselItem key={index}>
                  <div
                    className="h-48 w-full cursor-pointer overflow-hidden"
                    onClick={handleNavigateToProduct}
                  >
                    {renderMediaContent(mediaItem)}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {canScrollPrev && (
              <CarouselPrevious className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}
            {canScrollNext && (
              <CarouselNext className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}

            {/* Preview overlay - shows when hovering over indicators */}
            {previewIndex !== null && (
              <div className="absolute inset-0 z-10 h-48 w-full overflow-hidden">
                {renderMediaContent(mediaItems[previewIndex], true)}
              </div>
            )}

            {/* Progress indicators with preview */}
            <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1">
              {mediaItems.map((_, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleIndicatorHover(index)}
                  onMouseLeave={handleIndicatorLeave}
                  onClick={() => handleIndicatorClick(index)}
                >
                  <button
                    className={`h-1 w-8 rounded-full transition-all duration-200 ${
                      index === current - 1
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Preview slide ${index + 1}${index === 0 ? ' (cover)' : ''}`}
                  />
                </div>
              ))}
            </div>
          </Carousel>
        ) : (
          <div
            className="h-48 w-full cursor-pointer overflow-hidden"
            onClick={handleNavigateToProduct}
          >
            {renderMediaContent(mediaItems[0])}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3
          className="text-title mb-3 cursor-pointer text-center text-[16px] font-medium"
          onClick={handleNavigateToProduct}
        >
          {product.name}
        </h3>
        <div className="space-y-2">
          <span className="text-foreground text-sm">
            {product.variants?.[0]?.attributes?.[0]?.value || 'N/A'}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">
              ${product.variants?.[0]?.price}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm">{product.brand}</span>
            <ProductStatus product={product} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.categories?.[0]?.categoryName && (
              <BadgeTag
                key={product.categories[0].categoryName}
                tag={product.categories[0].categoryName}
                className="text-xs"
              />
            )}
            {product.tags
              ?.slice(0, 3)
              .map((tag) => (
                <BadgeTag key={tag} tag={tag} className="text-xs" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
