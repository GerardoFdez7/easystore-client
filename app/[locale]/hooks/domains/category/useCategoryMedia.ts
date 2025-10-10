'use client';

import { useMemo } from 'react';
import type { ProcessedData } from '@lib/types/media';

interface CategoryEntity {
  cover?: string | null;
}

interface UseCategoryMediaParams {
  category: CategoryEntity | null;
  setValue: (
    name: 'cover',
    value: string,
    options?: { shouldDirty: boolean },
  ) => void;
}

interface UseCategoryMediaReturn {
  initialMedia: string | null;
  handleMediaProcessed: (processedData?: ProcessedData | null) => void;
}

/**
 * Hook to handle media management for categories
 * Similar to useProductMedia but simplified for single cover image
 */
export const useCategoryMedia = ({
  category,
  setValue,
}: UseCategoryMediaParams): UseCategoryMediaReturn => {
  // Prepare initial media for MediaUploader (single cover image)
  const initialMedia = useMemo(() => {
    if (!category) return null;
    return category.cover || null;
  }, [category]);

  // Handle media updates from MediaUploader - only update form state
  const handleMediaProcessed = (processedData?: ProcessedData | null) => {
    if (processedData === null) {
      // Handle removal case - set cover to empty string
      setValue('cover', '', { shouldDirty: true });
    } else if (processedData?.cover !== undefined) {
      // Handle upload case - set cover to the new URL
      setValue('cover', processedData.cover, { shouldDirty: true });
    }
  };

  return {
    initialMedia,
    handleMediaProcessed,
  };
};
