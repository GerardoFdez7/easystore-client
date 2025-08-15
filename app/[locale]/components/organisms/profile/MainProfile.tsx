'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import ProfileSocialButtons from '@molecules/shared/ProfileSocialButton';
import { useTranslations } from 'next-intl';
import { useProfile } from '@hooks/useProfile';

export default function MainProfile() {
  const t = useTranslations('Profile');
  const { profile, isLoading, phoneDisplay, phoneActionLabel, actions } =
    useProfile(/* tenantId optional */);

  const Sk = () => (
    <div className="mb-6">
      <div className="mb-2 h-4 w-28 rounded bg-gray-200/70" />
      <div className="h-10 w-full rounded-md bg-gray-200/70" />
    </div>
  );

  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] px-4 pt-20 sm:px-6 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[1200px] flex-col gap-6 md:flex-row md:gap-0">
        <Sidebar />

        <div className="hidden w-px bg-gray-200 md:block" />

        <main className="flex-1 p-4 sm:p-6 md:p-10">
          <div className="mx-auto w-full max-w-[720px]">
            {isLoading ? (
              <>
                <Sk />
                <Sk />
                <Sk />
              </>
            ) : (
              <>
                <EditableField
                  label={t('domain')}
                  value={profile?.domain ?? ''}
                  iconEditable
                  saveLabel={t('save')}
                  onSave={(v) => void actions.updateDomain(v)}
                />

                <EditableField
                  label={t('phone')}
                  value={phoneDisplay}
                  actionLabel={phoneActionLabel}
                  saveLabel={t('save')}
                  onAction={() => {}}
                  onSave={(v) => void actions.updatePhone(v)}
                />

                <EditableField
                  label={t('email')}
                  value={profile?.email ?? ''}
                  statusChip={{
                    label: t('verified'),
                    tone: profile?.emailVerified ? 'success' : 'denied',
                  }}
                  actionLabel={t('change')}
                  saveLabel={t('save')}
                  onSave={(v) => void actions.updateEmail(v)}
                />
              </>
            )}

            {/* Password */}
            <section className="mb-8 grid grid-cols-1 items-start gap-3 md:grid-cols-[140px_1fr] md:gap-6">
              <div className="pt-1 text-sm font-medium text-[#111827] md:pt-2">
                {t('password')}
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <p className="mb-4 text-sm text-[#6b7280]">
                  {profile?.passwordChangedAgo
                    ? t('passwordChangedNotice', {
                        when: profile.passwordChangedAgo,
                      })
                    : t('passwordChangedNotice')}
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
                  {profile?.plan ?? t('currentPlan')}
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
