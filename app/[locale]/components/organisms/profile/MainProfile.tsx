'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import SocialAuthButtons from '@molecules/shared/SocialAuthButtons';
import { Label } from '@shadcn/ui/label';
import { useTranslations } from 'next-intl';

export default function MainProfile() {
  const t = useTranslations('Profile');

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] px-4 pt-20 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[1200px] flex-col gap-6 md:flex-row">
        <Sidebar />

        <main className="max-w-[700px] flex-1 p-4 md:p-8">
          <EditableField label={t('domain')} value="" />
          <EditableField label={t('phone')} value="" />
          <EditableField label={t('email')} value="" />

          <div className="mb-8">
            <Label className="mb-4 block font-medium text-[#423f3d]">
              {t('password')}
            </Label>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm text-[#64748b]">
                {t('passwordChangedNotice')}
              </p>
              <Button
                variant="outline"
                className="w-full border-[#423f3d] text-[#423f3d] hover:bg-[#423f3d] hover:text-white"
              >
                {t('changePassword')}
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <Label className="mb-4 block font-medium text-[#423f3d]">
              {t('plan')}
            </Label>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm text-[#64748b]">{t('currentPlan')}</p>
              <Button
                variant="outline"
                className="w-full border-[#423f3d] text-[#423f3d] hover:bg-[#423f3d] hover:text-white"
              >
                {t('changePlan')}
              </Button>
            </div>
          </div>

          <SocialAuthButtons />
        </main>
      </div>
    </div>
  );
}
