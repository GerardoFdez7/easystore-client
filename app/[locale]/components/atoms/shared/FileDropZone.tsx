'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent } from '@shadcn/ui/card';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
  maxItems?: number; // Maximum number of items allowed
  currentItemCount?: number; // Current number of items already selected
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
  maxItems,
  currentItemCount = 0,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const error = externalError || internalError;
  const t = useTranslations('Media');

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

      return t('fileTypeNotSupported', {
        fileType: file.type,
        supportedFormats: supportedText,
      });
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    const isVideo = isVideoFile(file.type);
    const maxSize = isVideo ? maxVideoSize : maxImageSize;

    if (fileSizeInMB > maxSize) {
      return isVideo
        ? t('videoSizeExceeded', {
            fileSize: fileSizeInMB.toFixed(1) + 'MB',
            maxSize: maxSize.toString(),
          })
        : t('imageSizeExceeded', {
            fileSize: fileSizeInMB.toFixed(1) + 'MB',
            maxSize: maxSize.toString(),
          });
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    // Check if adding these files would exceed the limit
    if (maxItems && currentItemCount + selectedFiles.length > maxItems) {
      const allowedCount = maxItems - currentItemCount;
      toast.warning(t('imageLimitExceeded'), {
        description: t('imageLimitExceededDescription', {
          maxItems,
          currentCount: currentItemCount,
          allowedCount: allowedCount > 0 ? allowedCount : 0,
        }),
      });
      return;
    }

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

      // Check if adding these files would exceed the limit
      if (maxItems && currentItemCount + selectedFiles.length > maxItems) {
        const allowedCount = maxItems - currentItemCount;
        console.log('Toast should show (drop):', {
          maxItems,
          currentItemCount,
          selectedFilesLength: selectedFiles.length,
          allowedCount,
        });
        toast.warning(t('imageLimitExceeded'), {
          description: t('imageLimitExceededDescription', {
            maxItems,
            currentCount: currentItemCount,
            allowedCount: allowedCount > 0 ? allowedCount : 0,
          }),
        });
        return;
      }

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

  const openFileDialog = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
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
        onClick={(event) => openFileDialog(event)}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="text-muted-foreground h-8 w-8" />

            <div className="text-center">
              <p className="text-lg font-medium">
                {isDragOver ? t('dropFilesHere') : t('uploadMediaFiles')}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {t('dragAndDropOrClick')}
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
                    text += t('imagesFormat', {
                      formats: images.join(', '),
                      maxSize: maxImageSize.toString(),
                    });
                  }
                  if (videos.length > 0) {
                    if (text) text += ' • ';
                    text += t('videosFormat', {
                      formats: videos.join(', '),
                      maxSize: maxVideoSize.toString(),
                    });
                  }

                  return text;
                })()}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="border-none shadow-lg"
              disabled={disabled}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                openFileDialog(event);
              }}
            >
              {t('chooseFiles')}
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
