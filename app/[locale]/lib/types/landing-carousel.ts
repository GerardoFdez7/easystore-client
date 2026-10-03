import type { ComponentType, SVGProps } from 'react';

export type LandingCarouselIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type LandingCarouselItemDefinition = readonly [
  icon: LandingCarouselIcon,
  titleKey: string,
  textKey: string,
  iconClassName?: string,
];

export interface LandingFeatureCarouselProps {
  items: readonly LandingCarouselItemDefinition[];
  rowSizes: readonly number[];
}
