'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import ProfileSocialButtons from '@molecules/shared/ProfileSocialButton';
import { useTranslations } from 'next-intl';

export default function MainProfile() {
  const t = useTranslations('Profile');

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] px-4 pt-20 sm:px-6 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[1200px] flex-col gap-6 md:flex-row md:gap-0">
        <Sidebar />

        <div className="hidden w-px bg-gray-200 md:block" />

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          <div className="mx-auto w-full max-w-[720px]">
            <EditableField
              label={t('domain')}
              value=""
              iconEditable
              saveLabel={t('save')}
              onSave={(v) => console.log('saved domain:', v)}
            />

            <EditableField
              label={t('phone')}
              value=""
              actionLabel={t('add')}
              saveLabel={t('save')}
              onAction={() => {}}
              onSave={(v) => console.log('saved phone:', v)}
            />

            <EditableField
              label={t('email')}
              value=""
              statusChip={{ label: t('verified'), tone: 'success' }}
              actionLabel={t('change')}
              saveLabel={t('save')}
              onSave={(v) => console.log('saved email:', v)}
            />

            {/* Password */}
            <section className="mb-8 grid grid-cols-1 items-start gap-3 md:grid-cols-[140px_1fr] md:gap-6">
              <div className="pt-1 text-sm font-medium text-[#111827] md:pt-2">
                {t('password')}
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="mb-4 text-sm text-[#6b7280]">
                  {t('passwordChangedNotice')}
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-[#1f2937] text-[#1f2937] hover:bg-[#1f2937] hover:text-white"
                >
                  {t('changePassword')}
                </Button>
              </div>
            </section>

            {/* Plan */}
            <section className="mb-10 grid grid-cols-1 items-start gap-3 md:grid-cols-[140px_1fr] md:gap-6">
              <div className="pt-1 text-sm font-medium text-[#111827] md:pt-2">
                {t('plan')}
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="mb-4 text-sm text-[#6b7280]">
                  {t('currentPlan')}
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-[#1f2937] text-[#1f2937] hover:bg-[#1f2937] hover:text-white"
                >
                  {t('changePlan')}
                </Button>
              </div>
            </section>

            <div className="flex justify-center">
              <ProfileSocialButtons />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
