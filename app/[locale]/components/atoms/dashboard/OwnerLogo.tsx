'use client';

import Image from 'next/image';
import { useAuth } from '@contexts/AuthContext';

export default function OwnerLogo() {
  const { tenantData } = useAuth();

  return (
    <div className="bg-opacity-20 flex justify-center rounded-lg pt-2 group-data-[collapsible=icon]:hidden">
      <Image
        src={tenantData?.logo || ''}
        alt="Company Logo"
        width={160}
        height={120}
        className="rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
