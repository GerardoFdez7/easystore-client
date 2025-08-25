import React from 'react';
import SingleMediaUploader from '../../molecules/shared/SingleMediaUploader';
import MultipleMediaUploader from '../../molecules/shared/MultipleMediaUploader';
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
  initialMedia?: string | string[] | null;
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

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  onMediaProcessed,
  className,
  multiple = DefaultMultipleUpload,
  acceptedFileTypes = DefaultAcceptedFileTypes,
  maxImageSize = DefaultMaxImageSize,
  maxVideoSize = DefaultVideoSize,
  disabled = DefaultDisabled,
  maxItems = DefaultMaxItems,
  minItems = DefaultMinItems,
  hideDoneButton = false,
  initialMedia,
  renderDoneButton,
  renderEditButton,
}) => {
  if (multiple) {
    return (
      <MultipleMediaUploader
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        onMediaProcessed={onMediaProcessed}
        className={className}
        hideDoneButton={hideDoneButton}
        initialMedia={Array.isArray(initialMedia) ? initialMedia : null}
        renderDoneButton={renderDoneButton}
        renderEditButton={renderEditButton}
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
      className={className}
      hideDoneButton={hideDoneButton}
      initialMedia={typeof initialMedia === 'string' ? initialMedia : null}
      renderDoneButton={renderDoneButton}
      renderEditButton={renderEditButton}
      acceptedFileTypes={acceptedFileTypes}
      maxImageSize={maxImageSize}
      maxVideoSize={maxVideoSize}
      disabled={disabled}
    />
  );
};

export default MediaUploader;
