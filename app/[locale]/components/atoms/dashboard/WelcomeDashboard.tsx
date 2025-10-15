'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@contexts/AuthContext';

export default function WelcomeDashboard() {
  const t = useTranslations('Dashboard');
  const { tenantData } = useAuth();

  return (
    <div className="mx-5 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeDashboard')} {tenantData?.ownerName || ''}
      </h1>
      <p className="text-text text-sm sm:text-lg">
        {t('descriptionDashboard')}
      </p>
    </div>
  );
}
