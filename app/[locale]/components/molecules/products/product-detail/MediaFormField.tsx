'use client';

import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
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
}

export default function MediaFormField({
  isSubmitting = false,
}: MediaFormFieldProps) {
  const { control, setValue, watch } = useFormContext();
  const t = useTranslations('Products');

  // Watch both cover and media fields
  const cover = watch('cover') as string | undefined;
  const mediaArray = watch('media') as string[] | undefined;

  // Prepare initial media for MediaUploader (cover + media array)
  const initialMedia = useMemo(() => {
    const mediaUrls: string[] = [];

    // Always add cover as first item if it exists
    if (cover) {
      mediaUrls.push(cover);
    }

    // Add additional media items (gallery) if they exist
    if (mediaArray && mediaArray.length > 0) {
      const additionalMedia = mediaArray.filter((url) => url !== cover); // Avoid duplicating cover
      mediaUrls.push(...additionalMedia);
    }

    return mediaUrls.length > 0 ? mediaUrls : null;
  }, [cover, mediaArray]);

  // Handle media updates from MediaUploader
  const handleMediaProcessed = async (processedData?: ProcessedData | null) => {
    if (!processedData) {
      // No data means all media was removed
      setValue('cover', '', { shouldDirty: true, shouldValidate: true });
      setValue('media', [], { shouldDirty: true, shouldValidate: true });
      return;
    }

    // Update cover if provided (first element)
    if (processedData.cover) {
      setValue('cover', processedData.cover, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue('cover', '', { shouldDirty: true, shouldValidate: true });
    }

    // Update media array if provided - ONLY additional media (position 1+)
    if (processedData.mediaItems && processedData.mediaItems.length > 0) {
      // Filter out position 0 items (those should go to cover field)
      const additionalMediaUrls = processedData.mediaItems
        .filter((item) => item.position > 0)
        .map((item) => item.url);

      setValue('media', additionalMediaUrls, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      // If no additional media, clear the media array
      setValue('media', [], { shouldDirty: true, shouldValidate: true });
    }
  };

  // Handle errors from MediaUploader (including validation errors when no items)
  const handleUploadError = (_error: string) => {
    // When there's a validation error, ensure form knows cover is empty
    // This triggers React Hook Form validation and shows FormMessage
    if (!cover || cover === '') {
      setValue('cover', '', { shouldDirty: true, shouldValidate: true });
    }
  };

  return (
    <FormField
      control={control}
      name="cover"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">{t('media')}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <MediaUploader
                multiple={true}
                maxImageSize={10}
                maxVideoSize={50}
                initialMedia={initialMedia}
                onMediaProcessed={handleMediaProcessed}
                onUploadSuccess={(_url) => {
                  // Upload success handled by the hook
                }}
                onUploadError={handleUploadError}
                renderEditButton={(onEdit, isEditing, hasMedia) => (
                  <button
                    type="button"
                    onClick={onEdit}
                    disabled={isEditing || !hasMedia || isSubmitting}
                    className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isEditing ? 'Editing...' : 'Edit Media'}
                  </button>
                )}
              />
            </div>
          </FormControl>
          {/* FormMessage will show validation errors from Zod schema for cover field */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
