import { useTranslations } from 'next-intl';

export default function WelcomeDetailCategory() {
  const t = useTranslations('CategoryDetail');

  return (
    <div className="mx-3 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeDetailCategory')}
      </h1>
    </div>
  );
}
