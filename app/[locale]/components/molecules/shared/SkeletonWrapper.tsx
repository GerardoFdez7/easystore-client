import { Skeleton } from '@shadcn/ui/skeleton';
import {
  ReactNode,
  isValidElement,
  ReactElement,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import React from 'react';

interface SkeletonWrapperProps {
  children: ReactNode;
  loading: boolean;
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
  /**
   * Whether to automatically measure child dimensions
   * @default true
   */
  autoMeasure?: boolean;
}

/**
 * SkeletonWrapper - A shared molecule component that automatically wraps child components with skeleton loading
 * It preserves the original component's dimensions and layout by creating a skeleton that matches the expected size
 * Now includes automatic dimension measurement using DOM APIs for precise skeleton sizing
 *
 * @param children - The component(s) to wrap with skeleton loading
 * @param loading - Whether to show skeleton (true) or actual content (false)
 * @param className - Additional CSS classes to apply to the skeleton
 * @param fallbackHeight - Default height class when dimensions can't be inferred
 * @param fallbackWidth - Default width class when dimensions can't be inferred
 * @param autoMeasure - Whether to automatically measure child dimensions (default: true)
 */
export default function SkeletonWrapper({
  children,
  loading = true,
  className,
  fallbackHeight = 'h-8',
  fallbackWidth = 'w-full',
  autoMeasure = true,
}: SkeletonWrapperProps) {
  const childRef = useRef<HTMLElement>(null);
  const invisibleRef = useRef<HTMLElement>(null);
  const [measuredDimensions, setMeasuredDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isInitialMeasurement, setIsInitialMeasurement] = useState(true);

  // Measure child dimensions from invisible render
  const measureChild = useCallback(
    (element: HTMLElement) => {
      if (element && autoMeasure) {
        const rect = element.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setMeasuredDimensions({
            width: rect.width,
            height: rect.height,
          });
          setIsInitialMeasurement(false);
        }
      }
    },
    [autoMeasure],
  );

  // Measure from invisible render on mount
  useLayoutEffect(() => {
    if (
      invisibleRef.current &&
      loading &&
      autoMeasure &&
      isInitialMeasurement
    ) {
      measureChild(invisibleRef.current);
    }
  }, [measureChild, loading, autoMeasure, isInitialMeasurement]);

  // Measure from visible render when not loading
  useLayoutEffect(() => {
    if (childRef.current && !loading && autoMeasure) {
      measureChild(childRef.current);
    }
  }, [measureChild, loading, autoMeasure]);

  // Set up ResizeObserver for dynamic size changes on visible element
  useLayoutEffect(() => {
    if (!childRef.current || loading || !autoMeasure) return;

    const resizeObserver = new ResizeObserver(() => {
      if (childRef.current) {
        measureChild(childRef.current);
      }
    });

    resizeObserver.observe(childRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [loading, measureChild, autoMeasure]);

  // Clone child with ref for invisible measurement
  const invisibleChild =
    isValidElement(children) && autoMeasure && loading
      ? React.cloneElement(children as ReactElement<Record<string, unknown>>, {
          ref: (node: HTMLElement) => {
            invisibleRef.current = node;
            if (node) {
              // Measure immediately when the invisible element is ready
              requestAnimationFrame(() => measureChild(node));
            }
          },
        })
      : null;

  // Clone child with ref for visible rendering
  const childWithRef =
    !loading && isValidElement(children) && autoMeasure
      ? React.cloneElement(children as ReactElement<Record<string, unknown>>, {
          ref: (node: HTMLElement) => {
            childRef.current = node;
            // Preserve original ref if it exists
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalRef = (children as any).ref;
            if (typeof originalRef === 'function') {
              originalRef(node);
            } else if (
              originalRef &&
              typeof originalRef === 'object' &&
              'current' in originalRef
            ) {
              (
                originalRef as React.MutableRefObject<HTMLElement | null>
              ).current = node;
            }
          },
        })
      : children;

  if (!loading) return <>{childWithRef}</>;

  return (
    <>
      {/* Invisible render for measurement - only shown during loading */}
      {invisibleChild && (
        <div
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -9999,
            opacity: 0,
          }}
          aria-hidden="true"
        >
          {invisibleChild}
        </div>
      )}

      {/* Actual skeleton */}
      {autoMeasure && measuredDimensions ? (
        <Skeleton
          className={className}
          style={{
            width: measuredDimensions.width,
            height: measuredDimensions.height,
          }}
        />
      ) : (
        // Fallback to original logic when autoMeasure is disabled or no dimensions measured
        (() => {
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

            return (
              <Skeleton
                className={`${element.props.className || ''} ${fallbackHeight} ${widthClass} ${className || ''}`.trim()}
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
        })()
      )}
    </>
  );
}
