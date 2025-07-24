'use client';

import { ArrowLeft, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileLogo } from '@atoms/profile/ProfileLogo';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';
import { useTranslations } from 'next-intl';

export function Sidebar() {
  const router = useRouter();
  const t = useTranslations('Profile');

  return (
    <div className="w-full max-w-[320px] shrink-0 border-r border-gray-200 bg-white px-6 pt-4 pb-6">
      <div className="mt-6 mb-8">
        <ArrowLeft
          className="mb-6 h-6 w-6 cursor-pointer text-[#423f3d]"
          onClick={() => router.back()}
        />
      </div>

      <ProfileLogo />
      <DescriptionEditor />

      <div className="mb-8 text-center">
        <h3 className="mb-2 font-medium text-[#423f3d]">
          {t('storeProfileTitle')}
        </h3>
        <p className="text-sm leading-relaxed text-[#64748b]">
          {t('storeProfileDescription')}
        </p>
      </div>

      <div className="flex cursor-pointer items-center gap-2 text-[#423f3d]">
        <LogOut className="h-4 w-4" />
        <span className="font-medium">{t('logOut')}</span>
      </div>
    </div>
  );
}
