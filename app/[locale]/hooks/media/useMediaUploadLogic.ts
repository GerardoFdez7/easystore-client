'use client';

import { useCallback } from 'react';
import { MediaUploaderCallbacks } from '@lib/types/media';
import {
  prepareProcessedData,
  updateMediaItemsWithUrls,
} from '@lib/utils/media';
import { useMediaState } from './useMediaState';
import useFileUpload from './useFileUpload';
import useMediaToken from './useMediaToken';

interface UseMediaUploadLogicProps extends MediaUploaderCallbacks {
  multiple?: boolean;
  onUploadCompleted?: () => void;
}

/**
 * Custom hook that orchestrates the media upload process
 */
export const useMediaUploadLogic = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  multiple = false,
  onUploadCompleted,
}: UseMediaUploadLogicProps) => {
  const {
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    mediaItems,
    uploadedUrlsRef,
    expectedFileCountRef,
    setIsEditing,
    setSelectedFiles,
    setIsProcessing,
    setPersistedMedia,
    setMediaItems,
    resetUploadTracking,
  } = useMediaState();

  const { error, authenticator, loading } = useMediaToken();

  /**
   * Handles the completion of upload process and persistence
   */
  const handleUploadSuccess = useCallback(
    async (urls: string[]) => {
      try {
        // Call the original callback for single mode compatibility
        if (urls.length === 1) {
          onUploadSuccess?.(urls[0], 'fileId'); // fileId would come from actual upload
        }

        // Call persistence callback if provided
        if (onMediaProcessed) {
          // For multiple mode, combine existing media URLs with new ones
          if (multiple) {
            // Get existing URLs from mediaItems, separating cover from additional media
            const existingMediaItems = mediaItems.filter((item) => !item.file);

            // The first item in mediaItems should be the cover (from initialMedia)
            // Additional items are the gallery media
            const existingCover =
              existingMediaItems.length > 0 ? existingMediaItems[0].src : '';
            const existingGalleryUrls = existingMediaItems
              .slice(1)
              .map((item) => item.src);

            // Combine existing gallery URLs with new uploaded URLs
            const allGalleryUrls = [...existingGalleryUrls, ...urls];

            // Create processed data with proper cover and mediaItems structure
            const processedData = {
              cover: existingCover || urls[0] || '', // Preserve existing cover, fallback to first new URL if no existing cover
              mediaItems: allGalleryUrls.map((url, index) => {
                // Determine media type from existing mediaItems or default to IMAGE
                const existingItem = mediaItems.find(
                  (item) => item.src === url,
                );
                const mediaType: 'VIDEO' | 'IMAGE' =
                  existingItem?.type === 'video' ? 'VIDEO' : 'IMAGE';

                return {
                  url,
                  position: index + 1, // Position starts from 1 for additional media
                  mediaType,
                };
              }),
            };

            await onMediaProcessed(processedData);
          } else {
            // Single mode - use original logic
            const processedData = prepareProcessedData(
              urls,
              selectedFiles,
              multiple,
            );
            await onMediaProcessed(processedData);
          }
        }

        // Save for preview - update mediaItems with uploaded URLs
        if (multiple && urls.length >= 1) {
          setMediaItems((currentMediaItems) => {
            const updatedMediaItems = updateMediaItemsWithUrls(
              currentMediaItems,
              urls,
            );
            return updatedMediaItems;
          });

          // Update persisted media to include all URLs (existing + new)
          // Separate cover from gallery media
          const existingMediaItems = mediaItems.filter((item) => !item.file);
          const existingCover =
            existingMediaItems.length > 0 ? existingMediaItems[0].src : '';
          const existingGalleryUrls = existingMediaItems
            .slice(1)
            .map((item) => item.src);

          // Combine existing gallery URLs with new uploaded URLs
          const allGalleryUrls = [...existingGalleryUrls, ...urls];

          // Create the complete media array: cover first, then gallery
          const allUrls = existingCover
            ? [existingCover, ...allGalleryUrls]
            : allGalleryUrls;

          setPersistedMedia(allUrls);
          setIsEditing(false);
        } else if (urls.length === 1) {
          setPersistedMedia({ url: urls[0] });
          setIsEditing(false);
          setSelectedFiles([]);
        }

        // Notify that upload is completed successfully
        onUploadCompleted?.();
      } catch (error) {
        console.error('Upload or persistence failed:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Upload failed';
        onUploadError?.(errorMessage);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      onUploadSuccess,
      onMediaProcessed,
      onUploadCompleted,
      multiple,
      selectedFiles,
      mediaItems,
      setMediaItems,
      setPersistedMedia,
      setIsEditing,
      setSelectedFiles,
      setIsProcessing,
      onUploadError,
    ],
  );

  const { isUploading, handleFileSelect } = useFileUpload({
    onUploadSuccess: (url: string) => {
      // For multiple mode, collect URLs using a ref-based approach
      if (multiple) {
        const currentUrls = uploadedUrlsRef.current;
        const newUrls = [...currentUrls, url];
        uploadedUrlsRef.current = newUrls;

        const expectedCount = expectedFileCountRef.current;
        // Check if all files have been uploaded
        if (newUrls.length === expectedCount && expectedCount > 0) {
          // All files uploaded, process them
          void handleUploadSuccess(newUrls);
          // Reset for next upload
          resetUploadTracking();
        }
      } else {
        // For single mode, process immediately
        void handleUploadSuccess([url]);
      }
    },
    onUploadError,
    authenticator,
  });

  /**
   * Initiates the upload process
   */
  const startUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      setIsProcessing(true);

      // For multiple mode, collect URLs and process when all are uploaded
      if (multiple) {
        const fileCount = files.length;
        expectedFileCountRef.current = fileCount;
        uploadedUrlsRef.current = [];

        try {
          await handleFileSelect(files);
        } catch (error) {
          console.error('Upload failed:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Upload failed';
          onUploadError?.(errorMessage);
          resetUploadTracking();
          setIsProcessing(false);
        }
      } else {
        // For single mode, handle directly
        try {
          await handleFileSelect(files);
          setIsEditing(false);
          setSelectedFiles([]);
          setIsProcessing(false);
        } catch (error) {
          console.error('Upload failed:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Upload failed';
          onUploadError?.(errorMessage);
          setIsProcessing(false);
        }
      }
    },
    [
      multiple,
      setIsProcessing,
      handleFileSelect,
      onUploadError,
      resetUploadTracking,
      setIsEditing,
      setSelectedFiles,
      expectedFileCountRef,
      uploadedUrlsRef,
    ],
  );

  return {
    // State
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    mediaItems,
    loading,
    isUploading,
    error,

    // State setters
    setIsEditing,
    setSelectedFiles,
    setMediaItems,
    setPersistedMedia,

    // Actions
    startUpload,
  };
};
