import {
  Ban,
  ChartColumnBig,
  CreditCard,
  Globe,
  Landmark,
  Search,
  Sparkles,
  Tag,
  Truck,
} from 'lucide-react';
import { MdCodeOff } from 'react-icons/md';
import LandingFeatureCarousel from '@molecules/landing/LandingFeatureCarousel';
import type { LandingCarouselItemDefinition } from '@lib/types/landing-carousel';

const featureItems = [
  [Sparkles, 'aiIntegratedT', 'aiIntegrated'],
  [Tag, 'customDomainsT', 'customDomains'],
  [CreditCard, 'paymantT', 'paymant'],
  [ChartColumnBig, 'growBussinessT', 'growBussiness'],
  [Ban, 'zeroTransactionT', 'zeroTransaction'],
  [Landmark, 'satIntegrationT', 'satIntegration'],
  [MdCodeOff, 'noCodeT', 'noCode'],
  [Globe, 'sellEverywhereT', 'sellEverywhere'],
  [Search, 'searchEngineT', 'searchEngine', 'text-secondary h-11.5 w-11.5'],
  [Truck, 'managedShipmentsT', 'managedShipments'],
] satisfies readonly LandingCarouselItemDefinition[];

export default function CarouselFeature() {
  return <LandingFeatureCarousel items={featureItems} rowSizes={[3, 4, 3]} />;
}
