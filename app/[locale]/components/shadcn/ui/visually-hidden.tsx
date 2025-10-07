import * as React from 'react';
import { cn } from 'utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * VisuallyHidden component for accessibility
 * Hides content visually while keeping it available to screen readers
 */
function VisuallyHidden({
  className,
  children,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span className={cn('sr-only', className)} {...props}>
      {children}
    </span>
  );
}

export { VisuallyHidden };
