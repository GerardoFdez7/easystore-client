import { useTranslations } from 'next-intl';

export default function WelcomeVariant() {
  const t = useTranslations('Variant');

  return (
    <div className="mx-5 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeVariant')}
      </h1>
    </div>
  );
}
