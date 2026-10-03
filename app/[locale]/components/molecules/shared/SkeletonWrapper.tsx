import { Skeleton } from '@shadcn/ui/skeleton';
import { cn } from '@lib/utils/cn';
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
import { useTranslations } from 'next-intl';

function assignRef(ref: React.Ref<HTMLElement>, value: HTMLElement | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref && 'current' in ref) {
    ref.current = value;
  }
}

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
  const t = useTranslations('Shared');
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

  // CSS custom properties carrying the measured, truly dynamic values.
  // Kept as a plain object (not memoized) so the linter can verify every
  // key is a CSS custom property rather than a fixed style property.
  const skeletonStyle: React.CSSProperties & Record<string, string> =
    autoMeasure && measuredDimensions
      ? {
          '--sk-width': `${measuredDimensions.width}px`,
          '--sk-height': `${measuredDimensions.height}px`,
          '--sk-gap':
            (inheritLayout && layoutProperties ? layoutProperties.gap : '') ??
            '',
          '--sk-grid-cols':
            (inheritLayout && layoutProperties
              ? layoutProperties.gridTemplateColumns
              : '') ?? '',
          '--sk-grid-rows':
            (inheritLayout && layoutProperties
              ? layoutProperties.gridTemplateRows
              : '') ?? '',
          '--sk-margin':
            (inheritLayout && layoutProperties
              ? layoutProperties.margin
              : '') ?? '',
          '--sk-padding':
            (inheritLayout && layoutProperties
              ? layoutProperties.padding
              : '') ?? '',
          '--sk-radius':
            (inheritLayout && layoutProperties
              ? layoutProperties.borderRadius
              : '') ?? '',
        }
      : {};

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
              assignRef(originalRef, node);
            }
          },
        })
      : children;

  if (!loading) return <>{childWithRef}</>;

  return (
    <div
      ref={containerRef}
      className="contents"
      role="status"
      aria-label={t('loadingContent')}
    >
      {/* Invisible render for measurement - only shown during loading */}
      {invisibleChild && (
        <div
          // Inherit the container's width to ensure proper responsive measurement
          className="pointer-events-none invisible absolute top-0 left-0 -z-50 w-full opacity-0"
          aria-hidden="true"
        >
          {invisibleChild}
        </div>
      )}

      {/* Actual skeleton with enhanced layout mirroring */}
      {autoMeasure && measuredDimensions ? (
        <Skeleton
          className={cn(
            'h-(--sk-height) w-(--sk-width)',
            inheritLayout && layoutProperties
              ? cn(
                  layoutProperties.display === 'flex'
                    ? 'flex'
                    : layoutProperties.display === 'inline-flex'
                      ? 'inline-flex'
                      : layoutProperties.display === 'grid'
                        ? 'grid'
                        : layoutProperties.display === 'inline-grid'
                          ? 'inline-grid'
                          : layoutProperties.display === 'inline-block'
                            ? 'inline-block'
                            : layoutProperties.display === 'inline'
                              ? 'inline'
                              : layoutProperties.display === 'contents'
                                ? 'contents'
                                : layoutProperties.display === 'table'
                                  ? 'table'
                                  : layoutProperties.display === 'none'
                                    ? 'hidden'
                                    : layoutProperties.display === 'block'
                                      ? 'block'
                                      : '',
                  layoutProperties.flexDirection === 'row'
                    ? 'flex-row'
                    : layoutProperties.flexDirection === 'row-reverse'
                      ? 'flex-row-reverse'
                      : layoutProperties.flexDirection === 'column'
                        ? 'flex-col'
                        : layoutProperties.flexDirection === 'column-reverse'
                          ? 'flex-col-reverse'
                          : '',
                  layoutProperties.flexWrap === 'wrap'
                    ? 'flex-wrap'
                    : layoutProperties.flexWrap === 'wrap-reverse'
                      ? 'flex-wrap-reverse'
                      : layoutProperties.flexWrap === 'nowrap'
                        ? 'flex-nowrap'
                        : '',
                  layoutProperties.justifyContent === 'flex-start' ||
                    layoutProperties.justifyContent === 'start'
                    ? 'justify-start'
                    : layoutProperties.justifyContent === 'flex-end' ||
                        layoutProperties.justifyContent === 'end'
                      ? 'justify-end'
                      : layoutProperties.justifyContent === 'center'
                        ? 'justify-center'
                        : layoutProperties.justifyContent === 'space-between'
                          ? 'justify-between'
                          : layoutProperties.justifyContent === 'space-around'
                            ? 'justify-around'
                            : layoutProperties.justifyContent === 'space-evenly'
                              ? 'justify-evenly'
                              : '',
                  layoutProperties.alignItems === 'flex-start' ||
                    layoutProperties.alignItems === 'start'
                    ? 'items-start'
                    : layoutProperties.alignItems === 'flex-end' ||
                        layoutProperties.alignItems === 'end'
                      ? 'items-end'
                      : layoutProperties.alignItems === 'center'
                        ? 'items-center'
                        : layoutProperties.alignItems === 'baseline'
                          ? 'items-baseline'
                          : layoutProperties.alignItems === 'stretch'
                            ? 'items-stretch'
                            : '',
                  layoutProperties.position === 'relative'
                    ? 'relative'
                    : layoutProperties.position === 'absolute'
                      ? 'absolute'
                      : layoutProperties.position === 'fixed'
                        ? 'fixed'
                        : layoutProperties.position === 'sticky'
                          ? 'sticky'
                          : layoutProperties.position === 'static'
                            ? 'static'
                            : '',
                  layoutProperties.gap ? 'gap-(--sk-gap)' : '',
                  layoutProperties.gridTemplateColumns
                    ? 'grid-cols-(--sk-grid-cols)'
                    : '',
                  layoutProperties.gridTemplateRows
                    ? 'grid-rows-(--sk-grid-rows)'
                    : '',
                  layoutProperties.margin ? 'm-(--sk-margin)' : '',
                  layoutProperties.padding ? 'p-(--sk-padding)' : '',
                  layoutProperties.borderRadius ? 'rounded-(--sk-radius)' : '',
                )
              : '',
            className,
          )}
          style={skeletonStyle}
        />
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
            const hasElementWidth = Boolean(elementWidth);
            const elementWidthValue = elementWidth
              ? typeof elementWidth === 'number'
                ? `${elementWidth}px`
                : elementWidth
              : undefined;

            return (
              <div
                className={element.props.className}
                // eslint-disable-next-line shadcn/no-inline-styles -- forwards an arbitrary child element's own style prop, whose shape is unknown at lint time
                style={element.props.style}
              >
                <Skeleton
                  className={cn(
                    fallbackHeight,
                    hasElementWidth ? 'w-(--sk-fallback-width)' : fallbackWidth,
                    'max-w-full min-w-0',
                    className,
                  )}
                  style={
                    {
                      '--sk-fallback-width': elementWidthValue,
                    } as React.CSSProperties & Record<string, string>
                  }
                />
              </div>
            );
          }

          // Enhanced fallback for non-React elements with mobile considerations
          return (
            <Skeleton
              className={cn(
                fallbackHeight,
                fallbackWidth,
                'max-w-full min-w-0',
                className,
              )}
            />
          );
        })()
      )}
    </div>
  );
}
