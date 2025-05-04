import { useTranslations } from 'next-intl';
import ImageStart from '@components/atoms/landing/ImageStart';
import StepText from '@components/atoms/landing/StepText';

export default function Start() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto px-4 py-12 sm:py-16 md:py-16">
      <h2 className="text-title mb-12 text-center text-5xl font-extrabold xl:text-left">
        {t('starting')}
      </h2>

      <div className="flex flex-col items-center gap-8 pr-10 pl-10 sm:pr-0 xl:flex-row xl:items-start xl:justify-between">
        {/* Left column - Numbered steps */}
        <div className="flex w-full max-w-md flex-col items-center gap-8 md:items-start">
          <StepText number="1." title={t('addYourProducts')} />
          <StepText number="2." title={t('customizeYourStore')} />
          <StepText number="3." title={t('setUpdPayments')} />
        </div>

        {/* Right column - Imágenes */}
        <div className="hidden md:flex-1 md:items-start md:justify-start xl:flex">
          <div className="grid grid-cols-3 justify-items-start sm:gap-x-12">
            <div className="mt-0">
              <ImageStart src="/start_1.webp" />
            </div>
            <div className="mt-12">
              <ImageStart src="/start_2.webp" />
            </div>
            <div className="mt-0">
              <ImageStart src="/start_3.webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
