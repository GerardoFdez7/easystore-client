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
}

export default function MediaFormField({
  isSubmitting = false,
  coverFieldName = 'cover',
  mediaFieldName = 'media',
}: MediaFormFieldProps) {
  const { control, setValue } = useFormContext();
  const t = useTranslations('Products');

  const cover = useWatch({
    control,
    name: coverFieldName,
    defaultValue: '',
  }) as string;

  const mediaArray = useWatch({
    control,
    name: mediaFieldName,
    defaultValue: [],
  }) as string[];

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
      mediaUrls.push(cover);
    }

    if (mediaArray && mediaArray.length > 0) {
      const additionalMedia = mediaArray.filter((url) => url !== cover);
      mediaUrls.push(...additionalMedia);
    }

    return mediaUrls.length > 0 ? mediaUrls : null;
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
    if (processedData.cover) {
      setValue(coverFieldName, processedData.cover, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      setValue(coverFieldName, '', {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    // Update media array if provided - ONLY additional media (position 1+)
    if (processedData.mediaItems && processedData.mediaItems.length > 0) {
      // Filter out position 0 items (those should go to cover field)
      const additionalMediaUrls = processedData.mediaItems
        .filter((item) => item.position > 0)
        .map((item) => item.url);

      setValue(mediaFieldName, additionalMediaUrls, {
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

  // Handle errors from MediaUploader (including validation errors when no items)
  const handleUploadError = (_error: string) => {
    if (!cover || cover === '') {
      setValue(coverFieldName, '', {
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
            <div className="space-y-2">
              <MediaUploader
                key={uploaderKey}
                multiple={true}
                maxImageSize={10}
                maxVideoSize={50}
                minItems={1}
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
