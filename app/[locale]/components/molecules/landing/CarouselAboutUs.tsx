import { Building2, Earth, Flag, Focus, Users } from 'lucide-react';
import LandingFeatureCarousel from '@molecules/landing/LandingFeatureCarousel';
import type { LandingCarouselItemDefinition } from '@lib/types/landing-carousel';

const aboutUsItems = [
  [Building2, 'foundedT', 'founded'],
  [Users, 'managedT', 'managed'],
  [Earth, 'headquartersT', 'headquarters'],
  [Focus, 'focusT', 'focus'],
  [Flag, 'missionT', 'mission'],
] satisfies readonly LandingCarouselItemDefinition[];

export default function CarouselAboutUs() {
  return <LandingFeatureCarousel items={aboutUsItems} rowSizes={[3, 2]} />;
}
