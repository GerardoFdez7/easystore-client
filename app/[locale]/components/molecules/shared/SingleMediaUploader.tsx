'use client';

import React, { useEffect } from 'react';
import FileDropZone from '@atoms/shared/FileDropZone';
import SingleImagePreview from '@atoms/shared/SingleImagePreview';
import DoneButton from '@atoms/shared/DoneButton';
import { MediaUploaderCallbacks, MediaUploaderConfig } from '@lib/types/media';
import { useMediaUploadLogic } from '@hooks/media/useMediaUploadLogic';
import { validateFileCount, cn } from '@lib/utils';
import { useTranslations } from 'next-intl';

interface SingleMediaUploaderProps
  extends MediaUploaderCallbacks,
    MediaUploaderConfig {
  className?: string;
  hideDoneButton?: boolean;
  alwaysEditing?: boolean;
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
    onUploadCompleted: () => {
      // Only signal changes after successful upload completion
      setHasChanges(true);
      onMediaChange?.(true);
    },
  });

  // Track initial state to detect changes
  const [initialMediaState, setInitialMediaState] = React.useState<
    string | null
  >(null);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [wasRemovedIntentionally, setWasRemovedIntentionally] =
    React.useState(false);

  // Helper function to check if media has changed
  const checkForChanges = React.useCallback(
    (
      currentSelectedFiles: File[],
      currentPersistedMedia: { url: string } | string[] | null,
    ) => {
      // Don't signal changes immediately when files are selected
      // Changes will be signaled only after successful upload via onUploadCompleted

      // Compare current persisted media with initial state for existing media changes
      const currentUrl =
        currentPersistedMedia &&
        typeof currentPersistedMedia === 'object' &&
        'url' in currentPersistedMedia
          ? currentPersistedMedia.url
          : null;
      const hasMediaChanges = currentUrl !== initialMediaState;

      // Only signal changes for existing media modifications (not new uploads)
      if (hasMediaChanges !== hasChanges && currentSelectedFiles.length === 0) {
        setHasChanges(hasMediaChanges);
        onMediaChange?.(hasMediaChanges);
      }
    },
    [hasChanges, initialMediaState, onMediaChange],
  );

  // Initialize persisted media with initial media if provided
  useEffect(() => {
    if (initialMedia && !persistedMedia && !wasRemovedIntentionally) {
      setPersistedMedia({ url: initialMedia });
      setInitialMediaState(initialMedia); // Set initial state for change detection
    } else if (!initialMedia && persistedMedia) {
      // Clear persisted media when initialMedia is removed
      setPersistedMedia(null);
      setInitialMediaState(null);
    }
  }, [
    initialMedia,
    persistedMedia,
    setPersistedMedia,
    wasRemovedIntentionally,
  ]);

  // Check for changes whenever selectedFiles or persistedMedia change
  useEffect(() => {
    checkForChanges(selectedFiles, persistedMedia);
  }, [selectedFiles, persistedMedia, checkForChanges]);

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
    setWasRemovedIntentionally(false); // Reset flag when new files are selected

    // In alwaysEditing mode, upload immediately when file is selected
    if (alwaysEditing && files.length > 0) {
      void startUpload(files);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFiles([]);
    setPersistedMedia(null);
    setWasRemovedIntentionally(true);

    // Only set isEditing to false if not in alwaysEditing mode
    if (!alwaysEditing) {
      setIsEditing(false);
    }

    // Reset change tracking when removing media
    setInitialMediaState(null);
    setHasChanges(false);
    onMediaChange?.(false);

    // Only notify parent about removal if NOT in alwaysEditing mode
    // In alwaysEditing mode, changes should only be persisted on form submission
    if (persistedMedia && !alwaysEditing) {
      void onMediaProcessed?.(null);
    }
  };

  const handleDone = async () => {
    if (selectedFiles.length === 0) return;
    await startUpload(selectedFiles);

    // Reset change tracking after successful upload
    setHasChanges(false);
    onMediaChange?.(false);
  };

  const handleDoneWrapper = () => {
    void handleDone();
  };

  // Set editing mode based on alwaysEditing prop
  useEffect(() => {
    if (alwaysEditing) {
      setIsEditing(true);
    }
  }, [alwaysEditing, setIsEditing]);

  return (
    <div className={cn('w-full space-y-4', className)}>
      {!isEditing && !persistedMedia && !alwaysEditing ? (
        // No media - show dropzone (only when not in alwaysEditing mode)
        <FileDropZone
          onFileSelect={handleFileSelection}
          onValidationError={handleValidationError}
          acceptedFileTypes={acceptedFileTypes}
          maxImageSize={maxImageSize}
          maxVideoSize={maxVideoSize}
          disabled={disabled || isUploading || isProcessing}
          multiple={false}
        />
      ) : !isEditing && persistedMedia && !alwaysEditing ? (
        // Has media - show view-only mode (existing or uploaded) - only when not in alwaysEditing mode
        <div className="space-y-4">
          <SingleImagePreview
            imageUrl={
              typeof persistedMedia === 'object' && 'url' in persistedMedia
                ? persistedMedia.url
                : null
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
        // Editing mode - show FileDropZone if no media, otherwise show SingleImagePreview
        <div className="space-y-4">
          {!persistedMedia && selectedFiles.length === 0 ? (
            <FileDropZone
              onFileSelect={handleFileSelection}
              onValidationError={handleValidationError}
              acceptedFileTypes={acceptedFileTypes}
              maxImageSize={maxImageSize}
              maxVideoSize={maxVideoSize}
              disabled={disabled || isUploading || isProcessing}
              multiple={false}
            />
          ) : (
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
