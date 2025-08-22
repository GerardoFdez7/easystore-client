import React from 'react';
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

interface MultipleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  renderDoneButton?: (
    onDone: () => void,
    isProcessing: boolean,
  ) => React.ReactNode;
}

const MultipleMediaUploader: React.FC<MultipleMediaUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  className,
  renderDoneButton,
  acceptedFileTypes,
  maxImageSize,
  maxVideoSize,
  disabled = false,
  maxItems = 10,
  minItems = 2,
}) => {
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
    startUpload,
  } = useMediaUploadLogic({
    onUploadSuccess,
    onUploadError,
    onMediaProcessed,
    multiple: true,
  });

  const handleValidationError = (error: string) => {
    onUploadError?.(error);
  };

  const handleFileSelection = (files: File[]) => {
    const validation = validateFileCount(files, true, maxItems);
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
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (mediaItems.length > 0) {
      const newMediaItems = mediaItems.filter((_, i) => i !== index);

      // Clean up object URLs
      if (mediaItems[index]?.file) {
        cleanupObjectUrls([mediaItems[index]]);
      }

      setMediaItems(newMediaItems);

      if (newMediaItems.length === 0) {
        setIsEditing(false);
      }
    }
  };

  const handleReorderItems = (fromIndex: number, toIndex: number) => {
    const { reorderedArray1: newItems, reorderedArray2: newFiles } =
      reorderArrays(mediaItems, selectedFiles, fromIndex, toIndex);

    setMediaItems(newItems);
    setSelectedFiles(newFiles);
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
    if (selectedFiles.length === 0) return;

    // Validate minimum files for multiple mode at Done button press
    const validation = validateFileCountForSubmission(
      selectedFiles,
      true,
      maxItems,
      minItems,
    );
    if (!validation.isValid) {
      onUploadError?.(validation.error || '');
      return;
    }

    await startUpload(selectedFiles);
  };

  const handleDoneWrapper = () => {
    void handleDone();
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {!isEditing && !persistedMedia ? (
        <FileDropZone
          onFileSelect={handleFileSelection}
          onValidationError={handleValidationError}
          acceptedFileTypes={acceptedFileTypes}
          maxImageSize={maxImageSize}
          maxVideoSize={maxVideoSize}
          disabled={disabled || isUploading || isProcessing}
          multiple={true}
        />
      ) : !isEditing && mediaItems.length > 0 ? (
        // Multiple files view-only mode (after upload)
        <div className="space-y-4">
          <CarouselMedia
            items={mediaItems}
            isEditing={false}
            className="mx-auto"
            maxItems={maxItems}
            minItems={minItems}
          />
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
        </div>
      )}
    </div>
  );
};

export default MultipleMediaUploader;
