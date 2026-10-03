import { cn } from 'utils';
import { useTranslations } from 'next-intl';

interface SpinLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'inverse';
  borderWidth?: 'thin' | 'normal' | 'thick';
}

/**
 * SpinLoader component displays a circular spinning border loader
 * Used for indicating loading states with a circular border animation
 */
const SpinLoader: React.FC<SpinLoaderProps> = ({
  className,
  size = 'md',
  message,
  variant = 'default',
  borderWidth = 'normal',
}) => {
  const t = useTranslations('Shared');
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const borderClasses = {
    thin: 'border',
    normal: 'border-2',
    thick: 'border-4',
  };

  const variantClasses = {
    default: 'border-muted-foreground/30 border-b-title',
    primary: 'border-primary/30 border-b-primary',
    secondary: 'border-secondary/30 border-b-secondary',
    // For use on filled `title` / `primary` surfaces
    inverse: 'border-primary-foreground/30 border-b-primary-foreground',
  };

  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
      role="status"
      aria-label={message ?? t('loading')}
    >
      <div
        className={cn(
          'border-title h-8 w-8 animate-spin rounded-full border-b-2',
          sizeClasses[size],
          borderClasses[borderWidth],
          variantClasses[variant],
        )}
      />
      {message && (
        <span className="text-muted-foreground text-sm">{message}</span>
      )}
    </div>
  );
};

export default SpinLoader;
