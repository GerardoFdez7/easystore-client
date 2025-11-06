import { useTranslations } from 'next-intl';
import ImageStart from '@atoms/landing/ImageStart';
import StepText from '@atoms/landing/StepText';

export default function Start() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto px-5 pt-35">
      <h2 className="text-title mb-12 text-3xl font-extrabold sm:text-5xl xl:text-left">
        {t('starting')}
      </h2>

      <div className="mx-auto flex max-w-[2000px] flex-col items-center gap-8 sm:pr-0 xl:flex-row xl:items-start">
        {/* Left column - Numbered steps */}
        <div className="flex w-fit flex-col items-center gap-8 sm:pr-10 md:items-start">
          <StepText number="1." title={t('addYourProducts')} />
          <StepText number="2." title={t('customizeYourStore')} />
          <StepText number="3." title={t('setUpdPayments')} />
        </div>

        {/* Right column - Images */}
        <div className="hidden md:flex-1 md:items-start md:justify-center xl:flex">
          <div className="grid grid-cols-3 justify-items-start gap-x-12">
            <div>
              <ImageStart src="/start_1.webp" />
            </div>
            <div className="mt-12">
              <ImageStart src="/start_2.webp" />
            </div>
            <div>
              <ImageStart src="/start_3.webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
