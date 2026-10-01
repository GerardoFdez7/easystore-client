import { useTranslations } from 'next-intl';
import ItemFeature from '@atoms/landing/ItemFeature';
import { Carousel, CarouselContent } from '@shadcn/ui/carousel';
import type { LandingFeatureCarouselProps } from '@lib/types/landing-carousel';

const carouselOptions = {
  align: 'start' as const,
  loop: true,
};

const defaultIconClassName = 'text-secondary h-9 w-9';

export default function LandingFeatureCarousel({
  items,
  rowSizes,
}: LandingFeatureCarouselProps) {
  const t = useTranslations('Landing');

  return (
    <div className="flex w-full flex-col items-center">
      {rowSizes.map((rowSize, rowIndex) => {
        const rowStart = rowSizes
          .slice(0, rowIndex)
          .reduce((total, size) => total + size, 0);
        const rowItems = items.slice(rowStart, rowStart + rowSize);

        return (
          <Carousel
            key={rowItems.map(([, titleKey]) => titleKey).join('-')}
            startAtEnd={rowIndex % 2 === 1}
            className="mb-10 w-full px-4"
            opts={carouselOptions}
            autoScroll={true}
          >
            <CarouselContent className="-ml-4 sm:ml-0 sm:gap-4 xl:justify-center">
              {rowItems.map(
                ([
                  Icon,
                  titleKey,
                  textKey,
                  iconClassName = defaultIconClassName,
                ]) => (
                  <ItemFeature
                    key={titleKey}
                    icon={<Icon className={iconClassName} aria-hidden="true" />}
                    title={t(titleKey)}
                    text={t(textKey)}
                  />
                ),
              )}
            </CarouselContent>
          </Carousel>
        );
      })}
    </div>
  );
}
