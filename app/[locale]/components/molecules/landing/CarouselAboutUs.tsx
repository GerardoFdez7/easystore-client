import { Carousel, CarouselContent } from '@shadcn/ui/carousel';
import ItemFeature from '@atoms/landing/ItemFeature';
import { useTranslations } from 'next-intl';
import { Building2, Users, Earth, Focus, Flag } from 'lucide-react';

export default function CarouselAboutUs() {
  const t = useTranslations('Landing');
  const iconClass = 'text-secondary h-9 w-9';

  return (
    <div className="flex w-full flex-col items-center">
      {/*Row 1*/}
      <Carousel className="mb-10 w-full" autoScroll={true}>
        <CarouselContent className="justify-center gap-4">
          <ItemFeature
            icon={<Building2 className={iconClass} />}
            title={t('foundedT')}
            text={t('founded')}
          />
          <ItemFeature
            icon={<Users className={iconClass} />}
            title={t('managedT')}
            text={t('managed')}
          />
          <ItemFeature
            icon={<Earth className={iconClass} />}
            title={t('headquartersT')}
            text={t('headquarters')}
          />
        </CarouselContent>
      </Carousel>

      {/*Row 2*/}
      <Carousel startAtEnd className="mb-10 w-full" autoScroll={true}>
        <CarouselContent className="justify-center gap-4">
          <ItemFeature
            icon={<Focus className={iconClass} />}
            title={t('focusT')}
            text={t('focus')}
          />
          <ItemFeature
            icon={<Flag className={iconClass} />}
            title={t('missionT')}
            text={t('mission')}
          />
        </CarouselContent>
      </Carousel>
    </div>
  );
}
