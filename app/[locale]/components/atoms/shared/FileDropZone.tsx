'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent } from '@shadcn/ui/card';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from 'utils';

interface FileDropZoneProps {
  onFileSelect: (files: File[]) => void;
  onValidationError?: (error: string) => void;
  acceptedFileTypes: string[];
  maxImageSize: number; // in MB for images
  maxVideoSize: number; // in MB for videos
  multiple: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFileSelect,
  onValidationError,
  acceptedFileTypes,
  maxImageSize,
  maxVideoSize,
  disabled,
  className,
  multiple,
  error: externalError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const error = externalError || internalError;

  const isVideoFile = (fileType: string): boolean => {
    return fileType.startsWith('video/');
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedFileTypes.includes(file.type)) {
      const supportedImages = acceptedFileTypes
        .filter((type) => type.startsWith('image/'))
        .map((type) => type.split('/')[1]);
      const supportedVideos = acceptedFileTypes
        .filter((type) => type.startsWith('video/'))
        .map((type) => type.split('/')[1]);

      let supportedText = '';
      if (supportedImages.length > 0) {
        supportedText += `Images: ${supportedImages.join(', ')}`;
      }
      if (supportedVideos.length > 0) {
        if (supportedText) supportedText += ' • ';
        supportedText += `Videos: ${supportedVideos.join(', ')}`;
      }

      return `File type ${file.type} is not supported. Supported formats: ${supportedText}`;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    const isVideo = isVideoFile(file.type);
    const maxSize = isVideo ? maxVideoSize : maxImageSize;
    const mediaType = isVideo ? 'video' : 'image';

    if (fileSizeInMB > maxSize) {
      return `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} size (${fileSizeInMB.toFixed(1)}MB) exceeds the ${maxSize}MB limit for ${mediaType}s`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);
    const validFiles: File[] = [];
    let hasErrors = false;

    for (const file of selectedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setInternalError(validationError);
        onValidationError?.(validationError);
        hasErrors = true;
        break;
      }
      validFiles.push(file);
    }

    if (!hasErrors) {
      setInternalError(null);
      onFileSelect(validFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);
      const validFiles: File[] = [];
      let hasErrors = false;

      for (const file of selectedFiles) {
        const validationError = validateFile(file);
        if (validationError) {
          setInternalError(validationError);
          onValidationError?.(validationError);
          hasErrors = true;
          break;
        }
        validFiles.push(file);
      }

      if (!hasErrors) {
        setInternalError(null);
        onFileSelect(validFiles);
      }
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Card
        className={cn(
          'border-muted-foreground/50 bg-background cursor-pointer border-2 border-dashed transition-colors',
          isDragOver && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50',
          error && 'border-destructive',
          className,
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-muted rounded-full p-4">
              <Upload className="text-muted-foreground h-8 w-8" />
            </div>

            <div className="text-center">
              <p className="text-lg font-medium">
                {isDragOver ? 'Drop files here' : 'Upload media files'}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Drag and drop or click to select files
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                {(() => {
                  const images = acceptedFileTypes
                    .filter((type) => type.startsWith('image/'))
                    .map((type) => type.split('/')[1]);
                  const videos = acceptedFileTypes
                    .filter((type) => type.startsWith('video/'))
                    .map((type) => type.split('/')[1]);

                  let text = '';
                  if (images.length > 0) {
                    text += `Images: ${images.join(', ')} (${maxImageSize}MB)`;
                  }
                  if (videos.length > 0) {
                    if (text) text += ' • ';
                    text += `Videos: ${videos.join(', ')} (${maxVideoSize}MB)`;
                  }

                  return text;
                })()}
              </p>
            </div>

            <Button
              variant="outline"
              className="border-none shadow-lg"
              disabled={disabled}
            >
              Choose Files
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border-destructive/20 mt-4 rounded-md border p-3">
              <div className="text-destructive flex items-center text-sm">
                <AlertCircle className="mr-2 h-4 w-4" />
                {error}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        onChange={handleFileSelect}
        className={cn('hidden', className)}
        disabled={disabled}
        multiple={multiple}
      />
    </>
  );
};

export default FileDropZone;
