import { memo } from 'react';
import { Card } from '@shadcn/ui/card';
import { Skeleton } from '@shadcn/ui/skeleton';

function CategoryCardSkeleton() {
  return (
    <article className="group" aria-label="Loading category">
      <Card className="m-0 flex h-70 w-70 flex-col gap-0 p-0">
        {/* Image skeleton - matches the aspect-square image area */}
        <div className="relative block aspect-square w-full overflow-hidden rounded-t-lg">
          <Skeleton
            className="h-full w-full"
            aria-label="Loading category image"
          />
        </div>

        {/* Content area skeleton - matches the title and description */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-4 flex flex-col px-4">
            {/* Title skeleton */}
            <Skeleton
              className="h-5 w-3/4 sm:h-6"
              aria-label="Loading category name"
            />
            {/* Description skeleton */}
            <Skeleton
              className="mt-2 h-3 w-1/2 sm:h-4"
              aria-label="Loading category count"
            />
          </div>

          {/* Action buttons skeleton - matches the delete and edit buttons */}
          <div className="mt-2 flex items-center justify-between px-4 py-2">
            {/* Delete button skeleton */}
            <Skeleton
              className="h-8 w-8 rounded-md"
              aria-label="Loading delete button"
            />
            {/* Edit button skeleton */}
            <Skeleton
              className="h-8 w-16 rounded-md"
              aria-label="Loading edit button"
            />
          </div>
        </div>
      </Card>
    </article>
  );
}

export default memo(CategoryCardSkeleton);
