import { Carousel, CarouselContent } from '@shadcn/ui/carousel';
import ItemFeature from '@atoms/landing/ItemFeature';
import { useTranslations } from 'next-intl';
import { MdCodeOff } from 'react-icons/md';
import {
  Tag,
  Infinity,
  CreditCard,
  ChartColumnBig,
  Ban,
  ChartNoAxesGantt,
  Globe,
  Search,
  RefreshCcw,
} from 'lucide-react';

export default function CarouselFeature() {
  const t = useTranslations('Landing');
  const iconClass = 'text-secondary h-9 w-9';

  return (
    <div className="flex w-full flex-col items-center">
      {/*Row 1*/}
      <Carousel className="mb-10 w-full" autoScroll={true}>
        <CarouselContent className="justify-center gap-4">
          <ItemFeature
            icon={<Infinity className={iconClass} />}
            title={t('unlimetedProductsT')}
            text={t('unlimetedProducts')}
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
      <Carousel startAtEnd className="mb-10 w-full" autoScroll={true}>
        <CarouselContent className="justify-center gap-4">
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
            icon={<ChartNoAxesGantt className={iconClass} />}
            title={t('manageEaseT')}
            text={t('manageEase')}
          />
          <ItemFeature
            icon={<MdCodeOff className={iconClass} />}
            title={t('noCodeT')}
            text={t('noCode')}
          />
        </CarouselContent>
      </Carousel>

      {/*Row 3*/}
      <Carousel className="mb-10 w-full" autoScroll={true}>
        <CarouselContent className="justify-center gap-4">
          <ItemFeature
            icon={<Globe className={iconClass} />}
            title={t('sellEverywhereT')}
            text={t('sellEverywhere')}
          />
          <ItemFeature
            icon={<Search className="text-secondary h-[46px] w-[46px]" />}
            title={t('searchEngineT')}
            text={t('searchEngine')}
          />
          <ItemFeature
            icon={<RefreshCcw className={iconClass} />}
            title={t('inventorySyncT')}
            text={t('inventorySync')}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
