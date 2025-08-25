'use client';

import React, { useEffect } from 'react';
import FileDropZone from '@atoms/shared/FileDropZone';
import SingleImagePreview from '@atoms/shared/SingleImagePreview';
import DoneButton from '@atoms/shared/DoneButton';
import { MediaUploaderCallbacks, MediaUploaderConfig } from '@lib/types/media';
import { useMediaUploadLogic } from '@hooks/media/useMediaUploadLogic';
import { validateFileCount } from '@lib/utils/media';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';

interface SingleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  hideDoneButton?: boolean;
  initialMedia?: string | null;
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

const SingleMediaUploader: React.FC<SingleMediaUploaderProps> = ({
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
}) => {
  const t = useTranslations('Media');
  const {
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    isUploading,
    setIsEditing,
    setSelectedFiles,
    setPersistedMedia,
    startUpload,
  } = useMediaUploadLogic({
    onUploadSuccess,
    onUploadError,
    onMediaProcessed,
    multiple: false,
  });

  // Initialize persisted media with initial media if provided
  useEffect(() => {
    if (initialMedia && !persistedMedia) {
      setPersistedMedia({ url: initialMedia });
    } else if (!initialMedia && persistedMedia) {
      // Clear persisted media when initialMedia is removed
      setPersistedMedia(null);
    }
  }, [initialMedia, persistedMedia, setPersistedMedia]);

  const handleValidationError = (error: string) => {
    onUploadError?.(error);
  };

  const handleFileSelection = (files: File[]) => {
    const validation = validateFileCount(files, false, 10, t);
    if (!validation.isValid) {
      onUploadError?.(validation.error || '');
      return;
    }

    setSelectedFiles(files);
    setIsEditing(true);
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    setPersistedMedia(null);
    setIsEditing(false);

    // If we're removing persisted media (existing logo), notify parent
    if (persistedMedia) {
      void onMediaProcessed?.(null);
    }
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
          {/* Edit Button */}
          {renderEditButton && (
            <div className="flex justify-end">
              {renderEditButton(
                () => setIsEditing(true),
                isEditing,
                !!persistedMedia,
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <SingleImagePreview
            file={selectedFiles[0]}
            imageUrl={
              !selectedFiles[0] &&
              persistedMedia &&
              typeof persistedMedia === 'object' &&
              'url' in persistedMedia
                ? persistedMedia.url
                : undefined
            }
            onRemove={handleRemoveFile}
            isProcessing={isProcessing}
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
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleMediaUploader;
