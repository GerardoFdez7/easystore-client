import React from 'react';
import Image from 'next/image';
import { Button } from '@shadcn/ui/button';
import { X } from 'lucide-react';
import { cn } from 'utils';

interface SingleImagePreviewProps {
  file?: File;
  imageUrl?: string | null;
  onRemove?: () => void;
  isProcessing?: boolean;
  className?: string;
  viewOnly?: boolean;
}

const SingleImagePreview: React.FC<SingleImagePreviewProps> = ({
  file,
  imageUrl: providedImageUrl,
  onRemove,
  isProcessing = false,
  className,
  viewOnly = false,
}) => {
  const generatedImageUrl = React.useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  React.useEffect(() => {
    return () => {
      if (generatedImageUrl) {
        URL.revokeObjectURL(generatedImageUrl);
      }
    };
  }, [generatedImageUrl]);

  const displayImageUrl = providedImageUrl || generatedImageUrl;
  const fileKey = file
    ? `${file.name}-${file.size}-${file.lastModified}`
    : 'persisted-image';

  // Don't render anything if there's no valid image URL
  if (!displayImageUrl) {
    return null;
  }

  return (
    <div className={cn('mx-auto w-full max-w-lg space-y-4', className)}>
      {/* Preview Card */}
      <div className="bg-card text-card-foreground relative overflow-hidden rounded-lg border shadow-sm">
        <div className="relative aspect-square w-full">
          <Image
            key={fileKey}
            src={displayImageUrl}
            alt="Preview"
            fill
            className="object-cover"
            priority
          />

          {/* Remove Button - only show if not in view-only mode */}
          {!viewOnly && onRemove && (
            <Button
              onClick={onRemove}
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              disabled={isProcessing}
            >
              <X className="h-4 w-4 text-gray-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImagePreview;
