import React from 'react';
import { Button } from '@shadcn/ui/button';
import { cn } from 'utils';

interface DoneButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const DoneButton: React.FC<DoneButtonProps> = ({
  onClick,
  isProcessing,
  disabled = false,
  className,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={'title'}
      disabled={isProcessing || disabled}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        isProcessing && 'pointer-events-none',
        className,
      )}
    >
      {/* Water fill effect */}
      {isProcessing && (
        <div className="animate-water-fill absolute inset-0 bg-gray-200/50 dark:bg-gray-700/50" />
      )}
      {children || (isProcessing ? 'Uploading...' : 'Done')}
    </Button>
  );
};

export default DoneButton;
