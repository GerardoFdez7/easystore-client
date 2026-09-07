import { Carousel, CarouselContent } from '@shadcn/ui/carousel';
import ItemFeature from '@atoms/landing/ItemFeature';
import { useTranslations } from 'next-intl';
import { MdCodeOff } from 'react-icons/md';
import {
  Tag,
  CreditCard,
  ChartColumnBig,
  Ban,
  Globe,
  Landmark,
  Search,
  Sparkles,
  Truck,
} from 'lucide-react';

const landingCarouselOptions = {
  align: 'start' as const,
  loop: true,
};

export default function CarouselFeature() {
  const t = useTranslations('Landing');
  const iconClass = 'text-secondary h-9 w-9';

  return (
    <div className="flex w-full flex-col items-center">
      {/*Row 1*/}
      <Carousel
        className="mb-10 w-full px-4"
        opts={landingCarouselOptions}
        autoScroll={true}
      >
        <CarouselContent className="gap-4 xl:justify-center">
          <ItemFeature
            icon={<Sparkles className={iconClass} />}
            title={t('aiIntegratedT')}
            text={t('aiIntegrated')}
          />
          <ItemFeature
            icon={<Tag className={iconClass} />}
            title={t('customDomainsT')}
            text={t('customDomains')}
          />
          <ItemFeature
            icon={<CreditCard className={iconClass} />}
            title={t('paymantT')}
            text={t('paymant')}
          />
        </CarouselContent>
      </Carousel>

      {/*Row 2*/}
      <Carousel
        startAtEnd
        className="mb-10 w-full px-4"
        opts={landingCarouselOptions}
        autoScroll={true}
      >
        <CarouselContent className="gap-4 xl:justify-center">
          <ItemFeature
            icon={<ChartColumnBig className={iconClass} />}
            title={t('growBussinessT')}
            text={t('growBussiness')}
          />
          <ItemFeature
            icon={<Ban className={iconClass} />}
            title={t('zeroTransactionT')}
            text={t('zeroTransaction')}
          />
          <ItemFeature
            icon={<Landmark className={iconClass} />}
            title={t('satIntegrationT')}
            text={t('satIntegration')}
          />
          <ItemFeature
            icon={<MdCodeOff className={iconClass} />}
            title={t('noCodeT')}
            text={t('noCode')}
          />
        </CarouselContent>
      </Carousel>

      {/*Row 3*/}
      <Carousel
        className="mb-10 w-full px-4"
        opts={landingCarouselOptions}
        autoScroll={true}
      >
        <CarouselContent className="gap-4 xl:justify-center">
          <ItemFeature
            icon={<Globe className={iconClass} />}
            title={t('sellEverywhereT')}
            text={t('sellEverywhere')}
          />
          <ItemFeature
            icon={<Search className="text-secondary h-11.5 w-11.5" />}
            title={t('searchEngineT')}
            text={t('searchEngine')}
          />
          <ItemFeature
            icon={<Truck className={iconClass} />}
            title={t('managedShipmentsT')}
            text={t('managedShipments')}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
