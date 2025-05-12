import CarouselAboutUs from '@molecules/landing/CarouselAboutUs';
import { useTranslations } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto p-5">
      <div className="mb-12 max-w-max">
        <h1 className="text-title mb-12 text-5xl font-extrabold sm:text-6xl xl:text-left">
          {t('aboutTitle')}
        </h1>

        <p className="text-text mb-8 text-xl sm:text-3xl">{t('aboutText1')}</p>
        <p className="text-text mb-8 text-xl sm:text-3xl">{t('aboutText2')}</p>
        <p className="text-text mb-8 text-xl sm:text-3xl">{t('aboutText3')}</p>
      </div>
      <div className="relative z-10 md:-mx-15 xl:-mx-25">
        <CarouselAboutUs />
      </div>
    </section>
  );
}
