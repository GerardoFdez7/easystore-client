import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { Card } from '@shadcn/ui/card';
import { Skeleton } from '@shadcn/ui/skeleton';

function ProductCardSkeleton() {
  const t = useTranslations('Products');
  return (
    <article
      className="group"
      aria-label={t('loadingProduct')}
      aria-busy="true"
    >
      <Card className="m-0 flex flex-col gap-0 p-0!">
        {/* Image skeleton - matches the aspect-square image area */}
        <div className="relative block aspect-square w-full overflow-hidden rounded-t-lg">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Content area skeleton - matches the product details */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-4 flex flex-col items-center justify-center px-4 text-center">
            {/* Product name skeleton */}
            <Skeleton className="h-5 w-3/4 sm:h-6" />
            {/* Variant attributes and count skeleton - matches new layout */}
            <div className="mt-2 flex w-full items-center justify-between">
              <Skeleton className="h-3 w-1/3 sm:h-4" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
          </div>

          {/* Product details skeleton - matches price, brand, and tags */}
          <div className="mt-2 px-4 py-2">
            <div className="space-y-2">
              {/* Price and status skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>

              {/* Brand skeleton */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}

export default memo(ProductCardSkeleton);
