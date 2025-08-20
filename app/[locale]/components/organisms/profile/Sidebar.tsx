'use client';

import { ProfileLogo } from '@atoms/profile/ProfileLogo';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useProfile } from '@hooks/useProfile';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';

export function Sidebar() {
  const t = useTranslations('Profile');
  const { profile, actions, isLoading } = useProfile();

  return (
    <aside className="flex w-full flex-col px-4 pt-2 pb-6 sm:px-6 md:max-w-[360px] md:shrink-0 md:justify-between md:pb-8">
      <div className="border-b border-gray-200 pb-6 md:border-none md:pb-0">
        <ProfileLogo
          name={profile?.storeName ?? t('defaultName')}
          logoUrl={profile?.logoUrl ?? null}
          onNameSave={(v) => void actions.updateStoreName(v)}
          onLogoFile={(file) => void actions.updateLogoFromFile(file)}
          loading={isLoading}
        />

        <DescriptionEditor
          value={profile?.description ?? ''}
          onSave={(v) => void actions.updateDescription(v)}
          loading={isLoading}
        />

        <div className="mt-4 mb-5 sm:mt-6">
          <h3 className="mb-2 text-sm font-medium text-[#111827]">
            {t('storeProfileTitle')}
          </h3>
          <p className="text-sm leading-relaxed text-[#6b7280]">
            {t('storeProfileDescription')}
          </p>
        </div>
      </div>

      <div className="mt-5 md:mt-auto">
        <LogoutConfirmDialog>
          <Button
            variant="outline"
            className="h-10 w-full justify-start rounded-lg border-gray-200 bg-white px-4 text-gray-800 shadow-sm hover:bg-gray-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('logOut')}
          </Button>
        </LogoutConfirmDialog>
      </div>
    </aside>
  );
}
