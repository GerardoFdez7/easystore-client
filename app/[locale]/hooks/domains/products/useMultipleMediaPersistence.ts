'use client';

import { useMemo } from 'react';
import type { ProcessedData } from '@lib/types/media';
import type { Media } from '@lib/graphql/generated';

interface MediaEntity {
  cover?: string | null;
  media?: Media[] | null;
  variantCover?: string | null;
  variantMedia?: Media[] | null;
}

interface MediaConfig {
  coverField: 'cover' | 'variantCover';
  mediaField: 'media' | 'variantMedia';
  successMessage?: string;
  errorMessage?: string;
}

interface UseUniversalMediaParams {
  entity: MediaEntity | null;
  config: MediaConfig;
  actions: {
    updateMultipleFields: (fields: Record<string, unknown>) => Promise<{
      success: boolean;
      error?: string;
    }>;
  };
}

interface UseUniversalMediaReturn {
  initialMedia: string[] | null;
  handleMediaProcessed: (processedData?: ProcessedData | null) => Promise<void>;
}

/**
 * Universal hook to handle media management for any entity (Product, Variant, etc.)
 * Centralizes all media-related logic with configurable field names
 */
export const useMultipleMediaPersistence = ({
  entity,
  config,
  actions,
}: UseUniversalMediaParams): UseUniversalMediaReturn => {
  // Prepare initial media for MediaUploader (cover + media array)
  // Optimized with specific dependencies to avoid unnecessary recalculations
  const initialMedia = useMemo(() => {
    if (!entity) return null;

    const mediaUrls: string[] = [];
    const coverValue = entity[config.coverField];
    const mediaArray = entity[config.mediaField];

    // Always add cover as first item if it exists
    if (coverValue) {
      mediaUrls.push(coverValue);
    }

    // Add additional media items (gallery) if they exist
    if (mediaArray && mediaArray.length > 0) {
      const additionalMedia = [...mediaArray] // Create a mutable copy first
        .sort((a: Media, b: Media) => a.position - b.position)
        .map((mediaItem: Media) => mediaItem.url)
        .filter((url: string) => url !== coverValue); // Avoid duplicating cover

      mediaUrls.push(...additionalMedia);
    }

    return mediaUrls.length > 0 ? mediaUrls : null;
  }, [entity, config.coverField, config.mediaField]); // Depend on entity and config fields

  // Handle media updates from MediaUploader
  const handleMediaProcessed = async (processedData?: ProcessedData | null) => {
    if (!processedData) return;

    try {
      const updates: Record<string, unknown> = {};

      // Update cover if provided (first element) - handle empty string as valid value
      if (processedData.cover !== undefined) {
        updates[config.coverField] = processedData.cover;
      }

      // Update media array if provided - ONLY additional media (position 1+)
      if (processedData.mediaItems && processedData.mediaItems.length > 0) {
        // Convert MediaData to the format expected by useUpdateProduct
        // Filter out position 0 items (those should go to cover field)
        const additionalMedia = processedData.mediaItems
          .filter((item) => item.position > 0)
          .map((item) => ({
            url: item.url,
            position: item.position,
            mediaType: item.mediaType,
          }));

        updates[config.mediaField] = additionalMedia;
      } else {
        // If no additional media, clear the media array
        updates[config.mediaField] = [];
      }

      // Actually perform the update
      if (Object.keys(updates).length > 0) {
        const result = await actions.updateMultipleFields(updates);
        if (!result.success) {
          console.error('Failed to update media:', result.error);
        }
      }
    } catch (error) {
      console.error('Error processing media:', error);
    }
  };

  return {
    initialMedia,
    handleMediaProcessed,
  };
};

// Convenience wrapper for Products
export const useProductMedia = ({
  product,
  actions,
}: {
  product: MediaEntity | null;
  actions: {
    updateMultipleFields: (fields: Record<string, unknown>) => Promise<{
      success: boolean;
      error?: string;
    }>;
  };
}) => {
  return useMultipleMediaPersistence({
    entity: product,
    config: {
      coverField: 'cover',
      mediaField: 'media',
      successMessage: 'Product media updated successfully',
      errorMessage: 'Failed to update product media',
    },
    actions,
  });
};

// Convenience wrapper for Variants
export const useVariantMedia = ({
  variant,
  actions,
}: {
  variant: MediaEntity | null;
  actions: {
    updateMultipleFields: (fields: Record<string, unknown>) => Promise<{
      success: boolean;
      error?: string;
    }>;
  };
}) => {
  return useMultipleMediaPersistence({
    entity: variant,
    config: {
      coverField: 'variantCover',
      mediaField: 'variantMedia',
      successMessage: 'Variant media updated successfully',
      errorMessage: 'Failed to update variant media',
    },
    actions,
  });
};
