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
}

/**
 * Custom hook that orchestrates the media upload process
 */
export const useMediaUploadLogic = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  multiple = false,
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

  const { errors, authenticator, isLoading } = useMediaToken();

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
          const processedData = prepareProcessedData(
            urls,
            selectedFiles,
            multiple,
          );
          await onMediaProcessed(processedData);
        }

        // Save for preview - update mediaItems with uploaded URLs
        if (multiple && urls.length >= 1) {
          const updatedMediaItems = updateMediaItemsWithUrls(mediaItems, urls);
          setMediaItems(updatedMediaItems);
          setPersistedMedia(urls);
          setIsEditing(false);
        } else if (urls.length === 1) {
          setPersistedMedia({ url: urls[0] });
          setIsEditing(false);
          setSelectedFiles([]);
        }
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
      selectedFiles,
      multiple,
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
    ],
  );

  return {
    // State
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    mediaItems,
    isLoading,
    isUploading,
    errors,

    // State setters
    setIsEditing,
    setSelectedFiles,
    setMediaItems,

    // Actions
    startUpload,
  };
};
