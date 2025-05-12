import CarouselFeature from '@molecules/landing/CarouselFeature';
import { useTranslations } from 'next-intl';

export default function Features() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto p-5">
      <div className="mb-10 max-w-7xl">
        <h1 className="text-title mb-12 text-5xl font-extrabold sm:text-6xl xl:text-left">
          {t('featureTitle')}
        </h1>

        <p className="text-text text-xl sm:text-3xl">{t('featureText')}</p>
      </div>
      <div className="relative z-10 md:-mx-15 xl:-mx-25">
        <CarouselFeature />
      </div>
    </section>
  );
}
