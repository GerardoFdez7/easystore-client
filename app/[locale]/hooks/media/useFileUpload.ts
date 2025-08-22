import { useState } from 'react';
import { upload } from '@imagekit/next';
import {
  generateOptimizedFileName,
  getImageKitTransformations,
} from '@lib/services/media-optimization';
import { useTranslations } from 'next-intl';

interface UseFileUploadProps {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadError?: (error: string) => void;
  authenticator?: () => Promise<{
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
  }>;
}

interface UseFileUploadReturn {
  isUploading: boolean;
  handleFileSelect: (files: File[]) => Promise<void>;
}

/**
 * Custom hook for handling file upload logic
 * Manages upload state, progress tracking, and file processing
 */
const useFileUpload = ({
  onUploadSuccess,
  onUploadError,
  authenticator,
}: UseFileUploadProps): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations('Media');

  const handleFileSelect = async (files: File[]) => {
    if (!authenticator) {
      onUploadError?.(t('mediaUploaderConfigError'));
      return;
    }

    setIsUploading(true);

    try {
      for (const file of files) {
        try {
          // Request fresh auth token for each file
          const authData = await authenticator();

          // Generate optimized file name and get transformations
          const optimizedFileName = generateOptimizedFileName(
            file.name,
            file.type,
          );
          const transformations = getImageKitTransformations(file.type);

          const result = await upload({
            file,
            fileName: optimizedFileName,
            useUniqueFileName: true,
            ...transformations,
            ...authData,
          });

          // Validate required properties from upload result
          if (!result.url || !result.fileId || !result.name) {
            console.error('Missing properties:', {
              url: result.url,
              fileId: result.fileId,
              name: result.name,
              allKeys: Object.keys(result),
            });
            throw new Error('Upload response missing required properties');
          }

          onUploadSuccess?.(result.url, result.fileId);
        } catch (error) {
          console.error('Upload error for file:', file.name, error);
          const errorMessage =
            error instanceof Error ? error.message : t('uploadFailed');
          onUploadError?.(errorMessage);
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('authenticationFailed');
      onUploadError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleFileSelect,
  };
};

export default useFileUpload;
