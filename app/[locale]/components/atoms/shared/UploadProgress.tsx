'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Progress } from '@shadcn/ui/progress';
import { cn } from 'utils';

interface UploadProgressEvent {
  lengthComputable: boolean;
  loaded: number;
  total: number;
}

interface UploadSuccessResponse {
  url: string;
  fileId: string;
  name: string;
  filePath: string;
  size: number;
  fileType: string;
}

interface UploadError {
  message?: string;
}

interface UploadProgressRef {
  handleUploadStart: () => void;
  handleUploadProgress: (evt: UploadProgressEvent) => void;
  handleUploadSuccess: (response: UploadSuccessResponse) => void;
  handleUploadError: (error: UploadError) => void;
}

interface UploadProgressProps {
  onUploadStart?: () => void;
  onUploadProgress?: (progress: number) => void;
  onUploadSuccess?: (response: UploadSuccessResponse) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const UploadProgress = forwardRef<UploadProgressRef, UploadProgressProps>(
  (
    {
      onUploadStart,
      onUploadProgress,
      onUploadSuccess,
      onUploadError,
      className,
      showPercentage = true,
      size = 'md',
    },
    ref,
  ) => {
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleUploadStart = () => {
      setIsUploading(true);
      setProgress(0);
      onUploadStart?.();
    };

    const handleUploadProgress = (evt: UploadProgressEvent) => {
      if (evt.lengthComputable) {
        const percentComplete = (evt.loaded / evt.total) * 100;
        const roundedProgress = Math.round(percentComplete);
        setProgress(roundedProgress);
        onUploadProgress?.(roundedProgress);
      }
    };

    const handleUploadSuccess = (response: UploadSuccessResponse) => {
      setIsUploading(false);
      setProgress(100);
      onUploadSuccess?.(response);
    };

    const handleUploadError = (error: UploadError) => {
      setIsUploading(false);
      setProgress(0);
      const errorMessage = error?.message || 'Upload failed';
      onUploadError?.(errorMessage);
    };

    // Expose handlers for external use
    useImperativeHandle(ref, () => ({
      handleUploadStart,
      handleUploadProgress,
      handleUploadSuccess,
      handleUploadError,
    }));

    if (!isUploading) {
      return null;
    }

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    return (
      <div className={cn('space-y-2', className)}>
        {showPercentage && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uploading...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
        )}
        <Progress
          value={progress}
          className={cn('w-full', sizeClasses[size])}
        />
      </div>
    );
  },
);

UploadProgress.displayName = 'UploadProgress';

export default UploadProgress;
export type {
  UploadProgressEvent,
  UploadSuccessResponse,
  UploadError,
  UploadProgressRef,
};
