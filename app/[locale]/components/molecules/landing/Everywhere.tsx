import ImageEveryWhere from '@atoms/landing/ImageEveryWhere';
import { useTranslations } from 'next-intl';

export default function Everywhere() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto p-5">
      <h2 className="text-title mb-5 text-5xl font-extrabold sm:text-6xl">
        {t('everyWhereTitle')}
      </h2>
      <p className="text-text mb-5 text-xl sm:text-3xl">
        {t('everyWhereText')}
      </p>
      <div className="mx-auto max-w-[2000px]">
        <div className="grid items-center justify-items-center gap-8 2xl:grid-cols-2">
          <ImageEveryWhere src="/laptop.webp" />
          <ImageEveryWhere src="/phone.webp" />
        </div>
      </div>
    </section>
  );
}
