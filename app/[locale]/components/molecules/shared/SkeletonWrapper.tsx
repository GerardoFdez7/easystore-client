import { Skeleton } from '@shadcn/ui/skeleton';
import {
  ReactNode,
  isValidElement,
  ReactElement,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
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
   * Whether to automatically measure child dimensions and inherit layout
   * @default true
   */
  autoMeasure?: boolean;
  /**
   * Whether to inherit layout properties (display, flex, grid, etc.)
   * @default true
   */
  inheritLayout?: boolean;
}

/**
 * SkeletonWrapper - A robust shared molecule component that automatically wraps child components with skeleton loading
 * It preserves the original component's dimensions and layout by creating a skeleton that matches the expected size
 * Features:
 * - Automatic dimension measurement using DOM APIs for precise skeleton sizing
 * - Layout mirroring to inherit display properties (flex, grid, positioning, etc.)
 * - Mobile-responsive with proper viewport handling
 * - ResizeObserver for dynamic size changes
 * - Intersection observer for performance optimization
 *
 * @param children - The component(s) to wrap with skeleton loading
 * @param loading - Whether to show skeleton (true) or actual content (false)
 * @param className - Additional CSS classes to apply to the skeleton
 * @param fallbackHeight - Default height class when dimensions can't be inferred
 * @param fallbackWidth - Default width class when dimensions can't be inferred
 * @param autoMeasure - Whether to automatically measure child dimensions and inherit layout (default: true)
 * @param inheritLayout - Whether to inherit layout properties (display, flex, grid, etc.) (default: true)
 */
export default function SkeletonWrapper({
  children,
  loading = true,
  className,
  fallbackHeight = 'h-8',
  fallbackWidth = 'w-full',
  autoMeasure = true,
  inheritLayout = true,
}: SkeletonWrapperProps) {
  const childRef = useRef<HTMLElement>(null);
  const invisibleRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [measuredDimensions, setMeasuredDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [layoutProperties, setLayoutProperties] = useState<{
    display?: string;
    flexDirection?: string;
    flexWrap?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    position?: string;
    margin?: string;
    padding?: string;
    borderRadius?: string;
  } | null>(null);
  const [isInitialMeasurement, setIsInitialMeasurement] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [measurementComplete, setMeasurementComplete] = useState(false);

  // Enhanced measurement function that captures both dimensions and layout properties
  const measureChild = useCallback(
    (element: HTMLElement) => {
      if (element && autoMeasure && isVisible && !measurementComplete) {
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);

        if (rect.width > 0 && rect.height > 0) {
          // Prevent multiple measurements by setting completion flag first
          setMeasurementComplete(true);

          setMeasuredDimensions({
            width: rect.width,
            height: rect.height,
          });

          // Capture layout properties for mirroring
          if (inheritLayout) {
            setLayoutProperties({
              display: computedStyle.display,
              flexDirection:
                computedStyle.flexDirection !== 'row'
                  ? computedStyle.flexDirection
                  : undefined,
              flexWrap:
                computedStyle.flexWrap !== 'nowrap'
                  ? computedStyle.flexWrap
                  : undefined,
              justifyContent:
                computedStyle.justifyContent !== 'normal'
                  ? computedStyle.justifyContent
                  : undefined,
              alignItems:
                computedStyle.alignItems !== 'normal'
                  ? computedStyle.alignItems
                  : undefined,
              gap:
                computedStyle.gap !== 'normal' ? computedStyle.gap : undefined,
              gridTemplateColumns:
                computedStyle.gridTemplateColumns !== 'none'
                  ? computedStyle.gridTemplateColumns
                  : undefined,
              gridTemplateRows:
                computedStyle.gridTemplateRows !== 'none'
                  ? computedStyle.gridTemplateRows
                  : undefined,
              position:
                computedStyle.position !== 'static'
                  ? computedStyle.position
                  : undefined,
              margin:
                computedStyle.margin !== '0px'
                  ? computedStyle.margin
                  : undefined,
              padding:
                computedStyle.padding !== '0px'
                  ? computedStyle.padding
                  : undefined,
              borderRadius:
                computedStyle.borderRadius !== '0px'
                  ? computedStyle.borderRadius
                  : undefined,
            });
          }

          setIsInitialMeasurement(false);
        }
      }
    },
    [autoMeasure, inheritLayout, isVisible, measurementComplete],
  );

  // Reset measurement state when loading changes
  useLayoutEffect(() => {
    if (loading) {
      setMeasurementComplete(false);
      setIsInitialMeasurement(true);
    }
  }, [loading]);

  // Intersection Observer for performance optimization
  useLayoutEffect(() => {
    if (!containerRef.current || !autoMeasure) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [autoMeasure]);

  // Measure from invisible render on mount
  useLayoutEffect(() => {
    if (
      invisibleRef.current &&
      loading &&
      autoMeasure &&
      isInitialMeasurement &&
      isVisible &&
      !measurementComplete
    ) {
      // Use a longer timeout to ensure the element is fully rendered and styled
      const timeoutId = setTimeout(() => {
        if (invisibleRef.current && !measurementComplete) {
          measureChild(invisibleRef.current);
        }
      }, 16); // One frame delay for better timing

      return () => clearTimeout(timeoutId);
    }
  }, [
    measureChild,
    loading,
    autoMeasure,
    isInitialMeasurement,
    isVisible,
    measurementComplete,
  ]);

  // Measure from visible render when not loading
  useLayoutEffect(() => {
    if (
      childRef.current &&
      !loading &&
      autoMeasure &&
      isVisible &&
      !measurementComplete
    ) {
      measureChild(childRef.current);
    }
  }, [measureChild, loading, autoMeasure, isVisible, measurementComplete]);

  // Set up ResizeObserver for dynamic size changes on visible element
  useLayoutEffect(() => {
    if (!childRef.current || loading || !autoMeasure || !isVisible) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === childRef.current) {
          // Reset measurement completion to allow new measurements on resize
          setMeasurementComplete(false);
          // Use requestAnimationFrame to ensure measurement happens after layout
          requestAnimationFrame(() => {
            if (childRef.current && !measurementComplete) {
              measureChild(childRef.current);
            }
          });
          break;
        }
      }
    });

    resizeObserver.observe(childRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [loading, measureChild, autoMeasure, isVisible, measurementComplete]);

  // Memoize the skeleton style to prevent unnecessary re-renders
  const skeletonStyle = useMemo(() => {
    if (!autoMeasure || !measuredDimensions) return {};

    const baseStyle: React.CSSProperties = {
      width: measuredDimensions.width,
      height: measuredDimensions.height,
    };

    // Apply layout properties if inheritLayout is enabled
    if (inheritLayout && layoutProperties) {
      return {
        ...baseStyle,
        display: layoutProperties.display,
        flexDirection:
          layoutProperties.flexDirection as React.CSSProperties['flexDirection'],
        flexWrap: layoutProperties.flexWrap as React.CSSProperties['flexWrap'],
        justifyContent:
          layoutProperties.justifyContent as React.CSSProperties['justifyContent'],
        alignItems:
          layoutProperties.alignItems as React.CSSProperties['alignItems'],
        gap: layoutProperties.gap,
        gridTemplateColumns: layoutProperties.gridTemplateColumns,
        gridTemplateRows: layoutProperties.gridTemplateRows,
        position: layoutProperties.position as React.CSSProperties['position'],
        margin: layoutProperties.margin,
        padding: layoutProperties.padding,
        borderRadius: layoutProperties.borderRadius,
      };
    }

    return baseStyle;
  }, [autoMeasure, measuredDimensions, inheritLayout, layoutProperties]);

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
    <div ref={containerRef} style={{ display: 'contents' }}>
      {/* Invisible render for measurement - only shown during loading */}
      {invisibleChild && (
        <div
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -9999,
            opacity: 0,
            top: 0,
            left: 0,
            // Inherit the container's width to ensure proper responsive measurement
            width: '100%',
          }}
          aria-hidden="true"
        >
          {invisibleChild}
        </div>
      )}

      {/* Actual skeleton with enhanced layout mirroring */}
      {autoMeasure && measuredDimensions ? (
        <Skeleton className={className} style={skeletonStyle} />
      ) : (
        // Enhanced fallback logic when autoMeasure is disabled or no dimensions measured
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

            // Combine styles with responsive considerations
            const combinedStyle = {
              ...element.props.style,
              ...widthStyle,
              // Ensure proper mobile scaling
              minWidth: 0,
              maxWidth: '100%',
            };

            return (
              <Skeleton
                className={`${element.props.className || ''} ${fallbackHeight} ${widthClass} ${className || ''}`.trim()}
                style={combinedStyle}
              />
            );
          }

          // Enhanced fallback for non-React elements with mobile considerations
          return (
            <Skeleton
              className={`${fallbackHeight} ${fallbackWidth} ${className || ''}`.trim()}
              style={{
                minWidth: 0,
                maxWidth: '100%',
              }}
            />
          );
        })()
      )}
    </div>
  );
}
