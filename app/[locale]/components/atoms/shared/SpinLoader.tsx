import { cn } from 'utils';

interface SpinLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  variant?: 'default' | 'primary' | 'secondary';
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
    default: 'border-gray-300 border-b-gray-900',
    primary: 'border-primary/30 border-b-primary',
    secondary: 'border-secondary/30 border-b-secondary',
  };

  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)}
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
