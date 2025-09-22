'use client';

import React, { useEffect } from 'react';
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

interface MultipleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  hideDoneButton?: boolean;
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

const MultipleMediaUploader: React.FC<MultipleMediaUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  className,
  hideDoneButton = false,
  initialMedia,
  renderDoneButton,
  renderEditButton,
  acceptedFileTypes,
  maxImageSize,
  maxVideoSize,
  disabled = false,
  maxItems = 10,
  minItems = 2,
}) => {
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
  });

  // Initialize persistedMedia with initialMedia if provided
  useEffect(() => {
    if (initialMedia && initialMedia.length > 0 && !persistedMedia) {
      setPersistedMedia(initialMedia);

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

  const handleValidationError = (error: string) => {
    onUploadError?.(error);
  };

  const handleFileSelection = (files: File[]) => {
    const validation = validateFileCount(files, true, maxItems, t);
    if (!validation.isValid) {
      onUploadError?.(validation.error || '');
      return;
    }

    setSelectedFiles(files);
    setIsEditing(true);

    // Convert files to media items for carousel
    const newMediaItems = filesToMediaItems(files);
    setMediaItems(newMediaItems);
  };

  const handleRemoveFile = (index: number) => {
    // Only update selectedFiles if we have them (new uploads)
    if (selectedFiles.length > 0) {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
    }

    if (mediaItems.length > 0) {
      const newMediaItems = mediaItems.filter((_, i) => i !== index);

      // Clean up object URLs only if this item has a file (new upload)
      if (mediaItems[index]?.file) {
        cleanupObjectUrls([mediaItems[index]]);
      }

      setMediaItems(newMediaItems);

      // Only exit editing mode if we have no items left AND we were working with new files
      if (newMediaItems.length === 0 && selectedFiles.length > 0) {
        setIsEditing(false);
      }
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
    if (selectedFiles.length >= maxItems) return;

    // Trigger file selection for additional files
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedFileTypes?.join(',') || '';
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const newFiles = Array.from(target.files);
        const totalFiles = selectedFiles.length + newFiles.length;

        if (totalFiles <= maxItems) {
          handleFileSelection([...selectedFiles, ...newFiles]);
        } else {
          onUploadError?.(
            `No se pueden subir más de ${maxItems} archivos multimedia`,
          );
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
        setIsEditing(false);
      } catch (error) {
        console.error('Error processing existing media:', error);
        onUploadError?.('Failed to process media changes');
      }
    }
  };

  const handleDoneWrapper = () => {
    void handleDone();
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {!isEditing && !persistedMedia ? (
        // No media - show dropzone
        <FileDropZone
          onFileSelect={handleFileSelection}
          onValidationError={handleValidationError}
          acceptedFileTypes={acceptedFileTypes}
          maxImageSize={maxImageSize}
          maxVideoSize={maxVideoSize}
          disabled={disabled || isUploading || isProcessing}
          multiple={true}
        />
      ) : !isEditing && (mediaItems.length > 0 || persistedMedia) ? (
        // Has media - show view-only mode (existing or uploaded)
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
        // Multiple files mode with CarouselMedia
        <div className="space-y-4">
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

          {/* Done Button */}
          {!hideDoneButton && (
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
};

export default MultipleMediaUploader;
