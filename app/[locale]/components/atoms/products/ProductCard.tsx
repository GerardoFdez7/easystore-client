import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@shadcn/ui/carousel';
import { Card, CardContent, CardTitle } from '@shadcn/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@graphql/generated';
import ProductStatus from '@atoms/products/ProductStatus';
import BadgeTag from '@atoms/shared/BadgeTag';
import { formatPriceWithCommasAndDots } from '@lib/utils/input-formatters';

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

  // Filter out media items that have the same URL as the cover to avoid duplication
  const filteredMedia = allMedia.filter((media) => media.url);

  // Create media array: cover first, then filtered media items
  const mediaItems = [
    { url: product.cover, mediaType: 'IMAGE' as const },
    ...filteredMedia,
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
          height={300}
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
    <article className="group">
      <Card className="m-0 flex cursor-pointer gap-0 p-0 pb-1 transition-transform hover:scale-105">
        {mediaItems.length > 1 ? (
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {mediaItems.map((mediaItem, index) => (
                <CarouselItem key={index}>
                  <button
                    className="group relative block aspect-square w-full overflow-hidden rounded-t-lg focus-visible:ring-2 focus-visible:outline-none"
                    aria-label={`View ${product.name} details`}
                  >
                    {renderMediaContent(mediaItem)}
                  </button>
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
              <div className="absolute inset-0 aspect-square w-full overflow-hidden">
                {renderMediaContent(mediaItems[previewIndex], true)}
              </div>
            )}

            {/* Progress indicators with preview */}
            <div className="absolute right-0 bottom-2 left-0 z-20 flex justify-center gap-1 px-4">
              {mediaItems.map((_, index) => (
                <div
                  key={index}
                  className="relative flex-1"
                  onMouseEnter={() => handleIndicatorHover(index)}
                  onMouseLeave={handleIndicatorLeave}
                  onClick={() => handleIndicatorClick(index)}
                >
                  <button
                    className={`h-1 w-full rounded-full transition-all duration-200 ${
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
          <button
            className="group relative block aspect-square w-full overflow-hidden rounded-t-lg focus-visible:ring-2 focus-visible:outline-none"
            onClick={handleNavigateToProduct}
            aria-label={`View ${product.name} details`}
          >
            {renderMediaContent(mediaItems[0])}
          </button>
        )}

        <div className="flex flex-1 flex-col justify-between">
          <button
            onClick={handleNavigateToProduct}
            className="mt-4 flex cursor-pointer flex-col rounded px-4 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={`View ${product.name} details`}
          >
            <CardTitle className="line-clamp-2 text-sm sm:text-base">
              {product.name}
            </CardTitle>
            {/* Variant attributes at the start with variant count at the end */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {product.variants?.[0]?.attributes?.[0]?.key}:{' '}
                {product.variants?.[0]?.attributes?.[0]?.value}
              </div>
              {product.variants && product.variants.length > 1 && (
                <div className="bg-muted flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium">
                  +{product.variants.length - 1}
                </div>
              )}
            </div>
          </button>

          <CardContent className="mt-2 px-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm">
                  {process.env.NEXT_PUBLIC_DEFAULT_CURRENCY}
                  {product.variants?.[0]?.price
                    ? formatPriceWithCommasAndDots(product.variants[0].price)
                    : '0.00'}
                </span>
                <ProductStatus product={product} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm">{product.brand}</span>
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
          </CardContent>
        </div>
      </Card>
    </article>
  );
}
