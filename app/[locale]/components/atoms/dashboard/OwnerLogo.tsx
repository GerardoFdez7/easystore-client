'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useAuth } from '@contexts/AuthContext';

export default function OwnerLogo() {
  const { tenantData } = useAuth();
  const t = useTranslations('Dashboard');

  return (
    <div className="bg-accent/20 flex justify-center rounded-lg pt-2 group-data-[collapsible=icon]:hidden">
      <Image
        src={tenantData?.logo || ''}
        alt={t('companyLogoAlt')}
        width={160}
        height={120}
        className="rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
