import { useTranslations } from 'next-intl';

export default function WelcomeDashboard() {
  const t = useTranslations('Dashboard');

  return (
    <div className="mx-5 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeDashboard')} [Owner Name]
      </h1>
      <p className="text-text text-sm sm:text-lg">
        {t('descriptionDashboard')}
      </p>
    </div>
  );
}
