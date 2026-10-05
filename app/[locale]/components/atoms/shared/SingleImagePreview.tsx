import { useTranslations } from 'next-intl';
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
  /**
   * Drops the card surface (fill, border, shadow) so images with transparent
   * backgrounds, such as PNG logos, show the page background. The image is always
   * cropped to the square.
   */
  transparent?: boolean;
}

const SingleImagePreview: React.FC<SingleImagePreviewProps> = ({
  file,
  imageUrl: providedImageUrl,
  onRemove,
  isProcessing = false,
  className,
  viewOnly = false,
  transparent = false,
}) => {
  const t = useTranslations('Media');
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
      <div
        className={cn(
          'relative overflow-hidden rounded-lg',
          transparent
            ? 'bg-transparent'
            : 'bg-card text-card-foreground border shadow-sm',
        )}
      >
        <div className="relative aspect-square w-full">
          <Image
            key={fileKey}
            src={displayImageUrl}
            alt={t('previewAlt')}
            fill
            className="object-cover"
            priority
          />

          {/* Remove Button - only show if not in view-only mode */}
          {!viewOnly && onRemove && (
            <Button
              type="button"
              onClick={onRemove}
              className="hover:bg-background bg-background absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl"
              disabled={isProcessing}
              aria-label={t('removeImage')}
            >
              <X className="text-foreground h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleImagePreview;
