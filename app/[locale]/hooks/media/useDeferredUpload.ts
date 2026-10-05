'use client';

import { useCallback, useState } from 'react';
import { upload } from '@imagekit/next';
import { useTranslations } from 'next-intl';
import {
  generateOptimizedFileName,
  getImageKitTransformations,
} from '@lib/services/media-optimization';
import useMediaToken from './useMediaToken';

/**
 * Uploads a file on demand (e.g. when a form is saved) instead of on selection.
 * Resolves with the uploaded URL, or null after reporting the failure through
 * `onError`.
 */
export function useDeferredUpload(onError?: (message: string) => void) {
  const t = useTranslations('Media');
  const { authenticator } = useMediaToken();
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      setIsUploading(true);
      try {
        const authData = await authenticator();
        const result = await upload({
          file,
          fileName: generateOptimizedFileName(file.name, file.type),
          useUniqueFileName: true,
          ...getImageKitTransformations(file.type),
          ...authData,
        });
        if (!result.url) throw new Error(t('uploadFailed'));
        return result.url;
      } catch (error) {
        onError?.(error instanceof Error ? error.message : t('uploadFailed'));
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [authenticator, onError, t],
  );

  return { uploadFile, isUploading };
}

export default useDeferredUpload;
