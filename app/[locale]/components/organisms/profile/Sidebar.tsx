'use client';

import { ProfileLogo } from '@atoms/profile/ProfileLogo';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';
import { Button } from '@shadcn/ui/button';

export function Sidebar() {
  const t = useTranslations('Profile');

  return (
    <aside className="flex w-full max-w-[360px] shrink-0 flex-col justify-between px-6 pt-2 pb-8">
      <div>
        <ProfileLogo />
        <DescriptionEditor />
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-[#111827]">
            {t('storeProfileTitle')}
          </h3>
          <p className="text-sm leading-relaxed text-[#6b7280]">
            {t('storeProfileDescription')}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="outline"
          className="h-10 w-full justify-start rounded-lg border-gray-200 bg-white px-4 text-gray-800 shadow-sm hover:bg-gray-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('logOut')}
        </Button>
      </div>
    </aside>
  );
}
