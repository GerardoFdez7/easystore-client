import React, { forwardRef } from 'react';
import SingleMediaUploader from '@molecules/shared/SingleMediaUploader';
import MultipleMediaUploader, {
  MultipleMediaUploaderRef,
} from '@molecules/shared/MultipleMediaUploader';
import { MediaUploaderCallbacks, MediaUploaderConfig } from '@lib/types/media';
import {
  DefaultAcceptedFileTypes,
  DefaultMaxImageSize,
  DefaultVideoSize,
  DefaultMultipleUpload,
  DefaultDisabled,
  DefaultMaxItems,
  DefaultMinItems,
} from '@lib/consts/media-uploader';

interface MediaUploaderProps
  extends MediaUploaderCallbacks,
    Partial<MediaUploaderConfig> {
  className?: string;
  multiple?: boolean;
  hideDoneButton?: boolean;
  alwaysEditing?: boolean;
  initialMedia?: string | string[] | null;
  onUploadingChange?: (isUploading: boolean) => void;
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

const MediaUploader = forwardRef<
  MultipleMediaUploaderRef | null,
  MediaUploaderProps
>(
  (
    {
      onUploadSuccess,
      onUploadError,
      onMediaProcessed,
      onMediaChange,
      onUploadingChange,
      className,
      multiple = DefaultMultipleUpload,
      acceptedFileTypes = DefaultAcceptedFileTypes,
      maxImageSize = DefaultMaxImageSize,
      maxVideoSize = DefaultVideoSize,
      disabled = DefaultDisabled,
      maxItems = DefaultMaxItems,
      minItems = DefaultMinItems,
      hideDoneButton = false,
      alwaysEditing = false,
      initialMedia,
      renderDoneButton,
      renderEditButton,
    },
    ref,
  ) => {
    if (multiple) {
      return (
        <MultipleMediaUploader
          ref={ref}
          onUploadSuccess={onUploadSuccess}
          onUploadError={onUploadError}
          onMediaProcessed={onMediaProcessed}
          onMediaChange={onMediaChange}
          onUploadingChange={onUploadingChange}
          className={className}
          hideDoneButton={hideDoneButton || alwaysEditing}
          alwaysEditing={alwaysEditing}
          initialMedia={Array.isArray(initialMedia) ? initialMedia : null}
          renderDoneButton={alwaysEditing ? undefined : renderDoneButton}
          renderEditButton={alwaysEditing ? undefined : renderEditButton}
          acceptedFileTypes={acceptedFileTypes}
          maxImageSize={maxImageSize}
          maxVideoSize={maxVideoSize}
          disabled={disabled}
          maxItems={maxItems}
          minItems={minItems}
        />
      );
    }

    return (
      <SingleMediaUploader
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        onMediaProcessed={onMediaProcessed}
        onMediaChange={onMediaChange}
        className={className}
        hideDoneButton={hideDoneButton || alwaysEditing}
        alwaysEditing={alwaysEditing}
        initialMedia={typeof initialMedia === 'string' ? initialMedia : null}
        renderDoneButton={alwaysEditing ? undefined : renderDoneButton}
        renderEditButton={alwaysEditing ? undefined : renderEditButton}
        acceptedFileTypes={acceptedFileTypes}
        maxImageSize={maxImageSize}
        maxVideoSize={maxVideoSize}
        disabled={disabled}
      />
    );
  },
);

MediaUploader.displayName = 'MediaUploader';

export default MediaUploader;
