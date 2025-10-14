'use client';

import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import FileDropZone from '@atoms/shared/FileDropZone';
import CarouselMedia from '@molecules/shared/CarouselMedia';
import DoneButton from '@atoms/shared/DoneButton';
import { MediaUploaderCallbacks, MediaUploaderConfig } from '@lib/types/media';
import { useMediaUploadLogic } from '@hooks/media/useMediaUploadLogic';
import {
  validateFileCount,
  validateFileCountForSubmission,
  filesToMediaItems,
  reorderArrays,
  cleanupObjectUrls,
} from '@lib/utils/media';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface MultipleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  hideDoneButton?: boolean;
  alwaysEditing?: boolean;
  initialMedia?: string[] | null;
  renderDoneButton?: (
    onDone: () => void,
    isProcessing: boolean,
  ) => React.ReactNode;
  renderEditButton?: (
    onEdit: () => void,
    isEditing: boolean,
    hasMedia: boolean,
  ) => React.ReactNode;
}

export interface MultipleMediaUploaderRef {
  handleDoneWrapper: () => void;
}

const MultipleMediaUploader = forwardRef<
  MultipleMediaUploaderRef,
  MultipleMediaUploaderProps
>(
  (
    {
      onUploadSuccess,
      onUploadError,
      onMediaProcessed,
      onMediaChange,
      className,
      hideDoneButton = false,
      alwaysEditing = false,
      initialMedia,
      renderDoneButton,
      renderEditButton,
      acceptedFileTypes,
      maxImageSize,
      maxVideoSize,
      disabled = false,
      maxItems = 10,
      minItems = 0,
    },
    ref,
  ) => {
    const t = useTranslations('Media');
    const {
      isEditing,
      selectedFiles,
      isProcessing,
      persistedMedia,
      mediaItems,
      isUploading,
      setIsEditing,
      setSelectedFiles,
      setMediaItems,
      setPersistedMedia,
      startUpload,
    } = useMediaUploadLogic({
      onUploadSuccess,
      onUploadError,
      onMediaProcessed,
      multiple: true,
      onUploadCompleted: () => {
        // Only signal changes after successful upload completion
        setHasChanges(true);
        onMediaChange?.(true);
      },
    });

    // Track initial state to detect changes
    const [initialMediaState, setInitialMediaState] = React.useState<
      string[] | null
    >(null);
    const [hasChanges, setHasChanges] = React.useState(false);

    // Helper function to check if media has changed
    const checkForChanges = React.useCallback(
      (currentMediaItems: typeof mediaItems, currentSelectedFiles: File[]) => {
        // Don't signal changes immediately when files are selected
        // Changes will be signaled only after successful upload via onUploadCompleted

        // Compare current media URLs with initial state for existing media changes
        const currentUrls = currentMediaItems.map((item) => item.src);
        const initialUrls = initialMediaState || [];

        // Check if arrays are different (length or content)
        const hasMediaChanges =
          currentUrls.length !== initialUrls.length ||
          currentUrls.some((url, index) => url !== initialUrls[index]);

        // Only signal changes for existing media modifications (not new uploads)
        if (
          hasMediaChanges !== hasChanges &&
          currentSelectedFiles.length === 0
        ) {
          setHasChanges(hasMediaChanges);
          onMediaChange?.(hasMediaChanges);
        }
      },
      [hasChanges, initialMediaState, onMediaChange],
    );

    // Initialize persistedMedia with initialMedia if provided
    useEffect(() => {
      if (initialMedia && initialMedia.length > 0 && !persistedMedia) {
        setPersistedMedia(initialMedia);
        setInitialMediaState(initialMedia); // Set initial state for change detection

        // Convert URLs to MediaItem objects for carousel display
        const mediaItemsFromUrls = initialMedia.map((url, index) => ({
          id: `existing-${index}-${Date.now()}`,
          type:
            url.includes('.mp4') ||
            url.includes('.webm') ||
            url.includes('.avi') ||
            url.includes('.mov')
              ? ('video' as const)
              : ('image' as const),
          src: url,
          alt: `Media ${index + 1}`,
          // No file property since these are existing URLs
        }));

        setMediaItems(mediaItemsFromUrls);
      }
    }, [initialMedia, persistedMedia, setPersistedMedia, setMediaItems]);

    // Check for changes whenever mediaItems or selectedFiles change
    useEffect(() => {
      checkForChanges(mediaItems, selectedFiles);
    }, [mediaItems, selectedFiles, checkForChanges]);

    // Set editing mode based on alwaysEditing prop
    useEffect(() => {
      if (alwaysEditing) {
        setIsEditing(true);
      }
    }, [alwaysEditing, setIsEditing]);

    const handleValidationError = (error: string) => {
      onUploadError?.(error);
    };

    const handleFileSelection = (files: File[]) => {
      // Check total items including existing media
      const totalCurrentItems = mediaItems.length;
      const totalAfterAddition = totalCurrentItems + files.length;

      if (totalAfterAddition > maxItems) {
        onUploadError?.(
          t('maxFilesExceeded', { maxItems: maxItems.toString() }),
        );
        return;
      }

      const validation = validateFileCount(files, true, maxItems, t);
      if (!validation.isValid) {
        onUploadError?.(validation.error || '');
        return;
      }

      // Always append new files to existing selectedFiles
      const updatedSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(updatedSelectedFiles);
      setIsEditing(true);

      // Convert files to media items for carousel
      const newMediaItems = filesToMediaItems(files, mediaItems.length);

      // Always append new media items to existing ones
      setMediaItems([...mediaItems, ...newMediaItems]);
    };

    const handleRemoveFile = (index: number) => {
      // Update selectedFiles if we have them (new uploads)
      if (selectedFiles.length > 0) {
        // Find the corresponding file index in selectedFiles
        // We need to account for existing media items that don't have files
        const existingItemsCount = mediaItems.filter(
          (item) => !item.file,
        ).length;
        const fileIndex = index - existingItemsCount;

        if (fileIndex >= 0 && fileIndex < selectedFiles.length) {
          const newFiles = selectedFiles.filter((_, i) => i !== fileIndex);
          setSelectedFiles(newFiles);
        }
      }

      if (mediaItems.length > 0) {
        const newMediaItems = mediaItems.filter((_, i) => i !== index);

        // Clean up object URLs only if this item has a file (new upload)
        if (mediaItems[index]?.file) {
          cleanupObjectUrls([mediaItems[index]]);
        }

        setMediaItems(newMediaItems);
      }
    };

    const handleReorderItems = (fromIndex: number, toIndex: number) => {
      // For existing media (no selectedFiles), only reorder mediaItems
      if (selectedFiles.length === 0) {
        const newItems = [...mediaItems];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        setMediaItems(newItems);
      } else {
        // For new files, reorder both arrays in sync
        const { reorderedArray1: newItems, reorderedArray2: newFiles } =
          reorderArrays(mediaItems, selectedFiles, fromIndex, toIndex);

        setMediaItems(newItems);
        setSelectedFiles(newFiles);
      }
    };

    const handleAddMore = () => {
      // Check total items including existing media
      const totalCurrentItems = mediaItems.length;
      if (totalCurrentItems >= maxItems) return;

      // Trigger file selection for additional files
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptedFileTypes?.join(',') || '';
      input.multiple = true;
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files) {
          const newFiles = Array.from(target.files);
          const totalFiles = totalCurrentItems + newFiles.length;

          if (totalFiles <= maxItems) {
            // Only pass the new files to avoid regenerating IDs for existing files
            handleFileSelection(newFiles);
          } else {
            const allowedCount = maxItems - totalCurrentItems;
            toast.warning(t('imageLimitExceeded'), {
              description: t('imageLimitExceededDescription', {
                maxItems,
                currentCount: totalCurrentItems,
                allowedCount: allowedCount > 0 ? allowedCount : 0,
              }),
            });
          }
        }
      };
      input.click();
    };

    const handleDone = async () => {
      // Case 1: We have new files to upload
      if (selectedFiles.length > 0) {
        // Validate minimum files for multiple mode at Done button press
        const validation = validateFileCountForSubmission(
          selectedFiles,
          true,
          maxItems,
          minItems,
          t,
        );
        if (!validation.isValid) {
          onUploadError?.(validation.error || '');
          return;
        }

        await startUpload(selectedFiles);
        return;
      }

      // Case 2: We have existing media that was modified (reordered/removed)
      if (mediaItems.length > 0 && !selectedFiles.length) {
        try {
          // Extract just the URLs from mediaItems for backwards compatibility
          const mediaUrls = mediaItems.map((item) => item.src);

          // Create processed data from current mediaItems state
          const processedData = {
            cover: mediaUrls[0] || '',
            mediaItems: mediaItems.map((item, index) => {
              const mediaType: 'VIDEO' | 'IMAGE' =
                item.type === 'video' ? 'VIDEO' : 'IMAGE';
              return {
                url: item.src,
                position: index,
                mediaType,
              };
            }),
          };

          // Call onMediaProcessed with the reordered/modified data
          await onMediaProcessed?.(processedData);

          // Update persisted media to reflect changes
          setPersistedMedia(mediaUrls);
          setInitialMediaState(mediaUrls); // Update initial state after successful save
          setHasChanges(false); // Reset changes flag
          onMediaChange?.(false); // Notify parent that changes are saved
          setIsEditing(false);
        } catch (_error) {}
      }

      // Case 3: No files and no existing media (empty arrays) - allow processing to trigger validation
      if (mediaItems.length === 0 && selectedFiles.length === 0) {
        try {
          // Create processed data with empty arrays
          const processedData = {
            cover: '', // Empty cover will trigger coverRequired validation
            mediaItems: [], // Empty media array
          };

          // Call onMediaProcessed with empty data to trigger validation
          await onMediaProcessed?.(processedData);

          // Update state to reflect empty media
          setPersistedMedia([]);
          setInitialMediaState([]); // Update initial state
          setHasChanges(false); // Reset changes flag
          onMediaChange?.(false); // Notify parent that changes are saved
          setIsEditing(false);
        } catch (_error) {
          // Error handling for empty array processing
        }
      }
    };

    const handleDoneWrapper = () => {
      void handleDone();
    };

    // Expose handleDoneWrapper to parent component via ref
    useImperativeHandle(ref, () => ({
      handleDoneWrapper,
    }));

    return (
      <div className={cn('w-full space-y-4', className)}>
        {!isEditing && mediaItems.length === 0 && !alwaysEditing ? (
          // No media - show dropzone (only when not in alwaysEditing mode)
          <FileDropZone
            onFileSelect={handleFileSelection}
            onValidationError={handleValidationError}
            acceptedFileTypes={acceptedFileTypes}
            maxImageSize={maxImageSize}
            maxVideoSize={maxVideoSize}
            disabled={disabled || isUploading || isProcessing}
            multiple={true}
            maxItems={maxItems}
            currentItemCount={mediaItems.length}
          />
        ) : !isEditing && mediaItems.length > 0 && !alwaysEditing ? (
          // Has media - show view-only mode (existing or uploaded) - only when not in alwaysEditing mode
          <div className="space-y-4">
            <CarouselMedia
              items={mediaItems}
              isEditing={false}
              className="mx-auto"
              maxItems={maxItems}
              minItems={minItems}
            />
            {/* Edit Button */}
            {renderEditButton && (
              <div className="flex justify-end">
                {renderEditButton(
                  () => setIsEditing(true),
                  isEditing,
                  mediaItems.length > 0,
                )}
              </div>
            )}
          </div>
        ) : (
          // Editing mode - show FileDropZone if no items, otherwise show CarouselMedia
          <div className="space-y-4">
            {mediaItems.length === 0 ? (
              <FileDropZone
                onFileSelect={handleFileSelection}
                onValidationError={handleValidationError}
                acceptedFileTypes={acceptedFileTypes}
                maxImageSize={maxImageSize}
                maxVideoSize={maxVideoSize}
                disabled={disabled || isUploading || isProcessing}
                multiple={true}
                maxItems={maxItems}
                currentItemCount={mediaItems.length}
              />
            ) : (
              <CarouselMedia
                items={mediaItems}
                isEditing={true}
                onRemoveItem={handleRemoveFile}
                onReorderItems={handleReorderItems}
                onAddMore={
                  selectedFiles.length < maxItems ? handleAddMore : undefined
                }
                maxItems={maxItems}
                minItems={minItems}
              />
            )}

            {/* Done Button - hidden when alwaysEditing is true */}
            {!hideDoneButton && !alwaysEditing && (
              <div className="flex justify-end">
                {renderDoneButton ? (
                  renderDoneButton(handleDoneWrapper, isProcessing)
                ) : (
                  <DoneButton
                    onClick={handleDoneWrapper}
                    isProcessing={isProcessing}
                    disabled={false}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

MultipleMediaUploader.displayName = 'MultipleMediaUploader';

export default MultipleMediaUploader;
