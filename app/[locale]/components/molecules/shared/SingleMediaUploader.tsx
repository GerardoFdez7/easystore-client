import React from 'react';
import FileDropZone from '@atoms/shared/FileDropZone';
import SingleImagePreview from '@atoms/shared/SingleImagePreview';
import DoneButton from '@atoms/shared/DoneButton';
import { MediaUploaderCallbacks, MediaUploaderConfig } from '@lib/types/media';
import { useMediaUploadLogic } from '@hooks/media/useMediaUploadLogic';
import { validateFileCount } from '@lib/utils/media';
import { cn } from 'utils';

interface SingleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  renderDoneButton?: (
    onDone: () => void,
    isProcessing: boolean,
  ) => React.ReactNode;
}

const SingleMediaUploader: React.FC<SingleMediaUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  className,
  renderDoneButton,
  acceptedFileTypes,
  maxImageSize,
  maxVideoSize,
  disabled = false,
}) => {
  const {
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    isUploading,
    setIsEditing,
    setSelectedFiles,
    startUpload,
  } = useMediaUploadLogic({
    onUploadSuccess,
    onUploadError,
    onMediaProcessed,
    multiple: false,
  });

  const handleValidationError = (error: string) => {
    onUploadError?.(error);
  };

  const handleFileSelection = (files: File[]) => {
    const validation = validateFileCount(files, false);
    if (!validation.isValid) {
      onUploadError?.(validation.error || '');
      return;
    }

    setSelectedFiles(files);
    setIsEditing(true);
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    setIsEditing(false);
  };

  const handleDone = async () => {
    if (selectedFiles.length === 0) return;
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
          multiple={false}
        />
      ) : !isEditing && persistedMedia ? (
        <div className="space-y-4">
          <SingleImagePreview
            imageUrl={
              typeof persistedMedia === 'object' && 'url' in persistedMedia
                ? persistedMedia.url
                : ''
            }
            viewOnly={true}
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <SingleImagePreview
            file={selectedFiles[0]}
            onRemove={handleRemoveFile}
            isProcessing={isProcessing}
          />
          {/* Done Button */}
          <div className="flex justify-end">
            {renderDoneButton ? (
              renderDoneButton(handleDoneWrapper, isProcessing)
            ) : (
              <DoneButton
                onClick={handleDoneWrapper}
                isProcessing={isProcessing}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMediaUploader;
