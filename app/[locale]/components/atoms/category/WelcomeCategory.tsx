import { useTranslations } from 'next-intl';

export default function WelcomeCategory() {
  const t = useTranslations('Category');

  return (
    <div className="mx-3 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeCategory')}
      </h1>
    </div>
  );
}
