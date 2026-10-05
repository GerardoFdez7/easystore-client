'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface OwnerLogoProps {
  logo: string;
}

export default function OwnerLogo({ logo }: OwnerLogoProps) {
  const t = useTranslations('Dashboard');

  return (
    <div className="bg-accent/20 flex justify-center rounded-lg pt-2 group-data-[collapsible=icon]:hidden">
      <Image
        src={logo}
        alt={t('companyLogoAlt')}
        width={160}
        height={120}
        className="rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
