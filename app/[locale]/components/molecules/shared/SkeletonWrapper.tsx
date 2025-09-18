import { Skeleton } from '@shadcn/ui/skeleton';
import { ReactNode, isValidElement, ReactElement } from 'react';

interface SkeletonWrapperProps {
  children: ReactNode;
  loading?: boolean;
  className?: string;
  /**
   * Height for the skeleton when dimensions can't be inferred
   * @default "h-10" (40px, typical for form controls)
   */
  fallbackHeight?: string;
  /**
   * Width for the skeleton when dimensions can't be inferred
   * @default "w-full"
   */
  fallbackWidth?: string;
}

/**
 * SkeletonWrapper - A shared molecule component that automatically wraps child components with skeleton loading
 * It preserves the original component's dimensions and layout by creating a skeleton that matches the expected size
 *
 * @param children - The component(s) to wrap with skeleton loading
 * @param loading - Whether to show skeleton (true) or actual content (false)
 * @param className - Additional CSS classes to apply to the skeleton
 * @param fallbackHeight - Default height class when dimensions can't be inferred
 * @param fallbackWidth - Default width class when dimensions can't be inferred
 */
export default function SkeletonWrapper({
  children,
  loading = true,
  className,
  fallbackHeight = 'h-8',
  fallbackWidth = 'w-full',
}: SkeletonWrapperProps) {
  if (!loading) return <>{children}</>;

  if (isValidElement(children)) {
    // Type assertion to safely access props
    const element = children as ReactElement<{
      className?: string;
      style?: React.CSSProperties;
      width?: string | number;
    }>;

    // Extract width from props if available (for components like Combobox)
    const elementWidth = element.props.width;
    const widthStyle: React.CSSProperties = {};
    let widthClass = '';

    if (elementWidth) {
      if (typeof elementWidth === 'number') {
        widthStyle.width = `${elementWidth}px`;
      } else {
        widthStyle.width = elementWidth;
      }
    } else {
      // Use fallback width class if no width is specified
      widthClass = fallbackWidth;
    }

    // Combine styles
    const combinedStyle = {
      ...element.props.style,
      ...widthStyle,
    };

    // Create skeleton with appropriate dimensions
    return (
      <Skeleton
        className={`${fallbackHeight} ${widthClass} ${className || ''}`.trim()}
        style={combinedStyle}
      />
    );
  }

  // Fallback for non-React elements
  return (
    <Skeleton
      className={`${fallbackHeight} ${fallbackWidth} ${className || ''}`.trim()}
    />
  );
}
