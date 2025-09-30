import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { cn } from 'utils';

export interface LoadMoreButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loadingTextKey?: string;
  loadMoreTextKey?: string;
  translationNamespace?: string;
  containerClassName?: string;
  showContainer?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  className,
  size = 'default',
  containerClassName,
  showContainer = true,
  iconSize = 'md',
}) => {
  const t = useTranslations('Shared');

  const getIconSizeClass = () => {
    switch (iconSize) {
      case 'sm':
        return 'h-3 w-3';
      case 'md':
        return 'h-4 w-4';
      case 'lg':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  const buttonContent = (
    <Button
      variant="outline"
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(size === 'sm' && 'text-xs', size === 'default', className)}
    >
      {isLoading ? (
        <>
          <Loader2 className={cn(getIconSizeClass(), 'animate-spin')} />
          {size !== 'icon'}
        </>
      ) : (
        t('loadMore')
      )}
    </Button>
  );

  if (!showContainer) {
    return buttonContent;
  }

  return (
    <div className={cn('flex justify-center', containerClassName)}>
      {buttonContent}
    </div>
  );
};

export default LoadMoreButton;
