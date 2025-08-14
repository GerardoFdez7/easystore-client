'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import ProfileSocialButtons from '@molecules/shared/ProfileSocialButton';
import { useTranslations } from 'next-intl';

export default function MainProfile() {
  const t = useTranslations('Profile');

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] px-4 pt-20 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[1200px] gap-0">
        <Sidebar />
        {/* separador vertical */}
        <div className="hidden w-px bg-gray-200 md:block" />

        <main className="flex-1 p-4 md:p-10">
          <div className="max-w-[720px]">
            <EditableField
              label={t('domain')}
              value=""
              iconEditable
              saveLabel={t('save')}
              onSave={(v) => {
                console.log('saved domain:', v);
              }}
            />

            <EditableField
              label={t('phone')}
              value=""
              actionLabel={t('add')}
              saveLabel={t('save')}
              onAction={() => {}}
              onSave={(v) => {
                console.log('saved phone:', v);
              }}
            />

            <EditableField
              label={t('email')}
              value=""
              statusChip={{ label: t('verified'), tone: 'success' }}
              actionLabel={t('change')}
              saveLabel={t('save')}
              onSave={(v) => {
                console.log('saved email:', v);
              }}
            />

            <section className="mb-8 grid grid-cols-[140px_1fr] items-start gap-6">
              <div className="pt-2 text-sm font-medium text-[#111827]">
                {t('password')}
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
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

            <section className="mb-10 grid grid-cols-[140px_1fr] items-start gap-6">
              <div className="pt-2 text-sm font-medium text-[#111827]">
                {t('plan')}
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
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

            <ProfileSocialButtons />
          </div>
        </main>
      </div>
    </div>
  );
}
