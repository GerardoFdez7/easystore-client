'use client';

import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import MediaUploader from '@organisms/shared/MediaUploader';
import type { ProcessedData } from '@lib/types/media';
import { useTranslations } from 'next-intl';

interface MediaFormFieldProps {
  isSubmitting?: boolean;
  coverFieldName?: string;
  mediaFieldName?: string;
  onUploadingChange?: (isUploading: boolean) => void;
}

export default function MediaFormField({
  coverFieldName = 'cover',
  mediaFieldName = 'media',
  onUploadingChange,
}: MediaFormFieldProps) {
  const { control, setValue } = useFormContext();
  const t = useTranslations('Products');

  const cover = useWatch({
    control,
    name: coverFieldName,
    defaultValue: '',
  }) as string | { url: string; mediaType: string; position: number };

  const mediaArray = useWatch({
    control,
    name: mediaFieldName,
    defaultValue: [],
  }) as Array<{ url: string; mediaType: string; position: number } | string>;

  const [uploaderKey, setUploaderKey] = useState(0);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (
      !hasInitializedRef.current &&
      (cover || (mediaArray && mediaArray.length > 0))
    ) {
      hasInitializedRef.current = true;
      setUploaderKey((prev) => prev + 1);
    }

    if (!cover && (!mediaArray || mediaArray.length === 0)) {
      hasInitializedRef.current = false;
    }
  }, [cover, mediaArray]);

  const initialMedia = useMemo(() => {
    const mediaUrls: string[] = [];

    // Always add cover as first item if it exists
    if (cover) {
      const coverUrl = typeof cover === 'string' ? cover : cover.url;
      mediaUrls.push(coverUrl);
    }

    if (mediaArray && mediaArray.length > 0) {
      // Handle both old format (string[]) and new format (object[])
      const coverUrl = typeof cover === 'string' ? cover : cover?.url;
      const additionalMedia = mediaArray
        .map((item) => (typeof item === 'string' ? item : item.url))
        .filter((url) => url !== coverUrl);
      mediaUrls.push(...additionalMedia);
    }

    return mediaUrls.length > 0 ? mediaUrls : null;
  }, [cover, mediaArray]);

  // Extract media types for proper video/image detection
  const initialMediaTypes = useMemo(() => {
    const types: Array<'video' | 'image'> = [];

    // Detect cover type - can be image or video
    if (cover) {
      if (typeof cover === 'string') {
        // Legacy format: detect from URL
        const isVideo =
          cover.includes('.mp4') ||
          cover.includes('.webm') ||
          cover.includes('.avi') ||
          cover.includes('.mov');
        types.push(isVideo ? 'video' : 'image');
      } else {
        // New format: use mediaType from object
        types.push(cover.mediaType === 'VIDEO' ? 'video' : 'image');
      }
    }

    if (mediaArray && mediaArray.length > 0) {
      mediaArray.forEach((item) => {
        if (typeof item === 'string') {
          // Legacy format: detect from URL
          const isVideo =
            item.includes('.mp4') ||
            item.includes('.webm') ||
            item.includes('.avi') ||
            item.includes('.mov');
          types.push(isVideo ? 'video' : 'image');
        } else {
          // New format: use mediaType from object
          types.push(item.mediaType === 'VIDEO' ? 'video' : 'image');
        }
      });
    }

    return types.length > 0 ? types : null;
  }, [cover, mediaArray]);

  // Handle media updates from MediaUploader
  const handleMediaProcessed = async (processedData?: ProcessedData | null) => {
    if (!processedData) {
      setValue(coverFieldName, '', { shouldDirty: true, shouldValidate: true });
      setValue(mediaFieldName, [], {
        shouldDirty: true,
        shouldValidate: true,
      });
      return;
    }

    // Update cover if provided (first element)
    // Save complete object with mediaType to preserve video/image type
    if (processedData.cover) {
      // Find the cover item in mediaItems to get its complete data
      const coverItem = processedData.mediaItems?.find(
        (item) => item.position === 0,
      );

      if (coverItem) {
        setValue(
          coverFieldName,
          {
            url: coverItem.url,
            mediaType: coverItem.mediaType,
            position: coverItem.position,
          },
          {
            shouldDirty: true,
            shouldValidate: true,
          },
        );
      } else {
        // Fallback to just the URL if item not found
        setValue(coverFieldName, processedData.cover, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    } else {
      setValue(coverFieldName, '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    // Update media array if provided - ONLY additional media (position 1+)
    if (processedData.mediaItems && processedData.mediaItems.length > 0) {
      // Filter out position 0 items (those should go to cover field)
      // Keep the complete media objects with type information
      const additionalMedia = processedData.mediaItems.filter(
        (item) => item.position > 0,
      );

      setValue(mediaFieldName, additionalMedia, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      // If no additional media, clear the media array
      setValue(mediaFieldName, [], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <FormField
      control={control}
      name={coverFieldName}
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">{t('media')}</FormLabel>
          <FormControl>
            <MediaUploader
              key={uploaderKey}
              multiple={true}
              initialMedia={initialMedia}
              initialMediaTypes={initialMediaTypes}
              onMediaProcessed={handleMediaProcessed}
              onUploadingChange={onUploadingChange}
              alwaysEditing={true}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
