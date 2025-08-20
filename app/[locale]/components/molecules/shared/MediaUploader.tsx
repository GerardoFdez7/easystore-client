'use client';

import FileDropZone from '@atoms/shared/FileDropZone';
import SpinLoader from '@atoms/shared/SpinLoader';
import ErrorState from '@atoms/shared/ErrorState';
import useMediaToken from '@hooks/useMediaToken';
import { useFileUpload } from '@hooks/useFileUpload';
import {
  DefaultAcceptedFileTypes,
  DefaultMaxImageSize,
  DefaultVideoSize,
  DefaultMultipleUpload,
  DefaultDisabled,
} from '@lib/consts/media-uploader';
import { cn } from 'utils';

interface MediaUploaderProps {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  // FileDropZone props passed through
  acceptedFileTypes?: string[];
  maxImageSize?: number; // in MB for images
  maxVideoSize?: number; // in MB for videos
  disabled?: boolean;
  multiple?: boolean;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  className,
  acceptedFileTypes = DefaultAcceptedFileTypes,
  maxImageSize = DefaultMaxImageSize,
  maxVideoSize = DefaultVideoSize,
  disabled = DefaultDisabled,
  multiple = DefaultMultipleUpload,
}) => {
  const { isLoading, errors, authenticator } = useMediaToken();
  const { isUploading, handleFileSelect } = useFileUpload({
    onUploadSuccess,
    onUploadError,
    authenticator,
  });

  const handleValidationError = (error: string) => {
    onUploadError?.(error);
  };

  // Show loading state while fetching media token
  if (isLoading) {
    return <SpinLoader />;
  }

  // Show error state if there are token errors
  if (errors && errors.length > 0) {
    return (
      <ErrorState
        title="Failed to load media uploader"
        message={errors[0]?.message || 'Authentication error'}
      />
    );
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      <FileDropZone
        onFileSelect={(files) => {
          void handleFileSelect(files);
        }}
        onValidationError={handleValidationError}
        acceptedFileTypes={acceptedFileTypes}
        maxImageSize={maxImageSize}
        maxVideoSize={maxVideoSize}
        disabled={disabled || isUploading}
        multiple={multiple}
      />
    </div>
  );
};

export default MediaUploader;
