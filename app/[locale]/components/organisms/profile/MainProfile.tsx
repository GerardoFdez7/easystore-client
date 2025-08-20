'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
// import ProfileSocialButtons from '@molecules/shared/ProfileSocialButton';
import BackButton from '@molecules/shared/BackButton';
import { useTranslations } from 'next-intl';
import { useProfile } from '@hooks/useProfile';
import FormFieldSkeleton from '@molecules/shared/FormFieldSkeleton';

export default function MainProfile() {
  const t = useTranslations('Profile');
  const { profile, isLoading, phoneDisplay, hasPhone, actions } =
    useProfile(/* tenantId */);

  return (
    <main className="relative flex-1 p-4 sm:p-6 md:p-10">
      <div className="flex w-full max-w-[1200px] flex-col gap-6 md:flex-row md:gap-0">
        <div className="relative">
          <Sidebar />
          {/* botón dentro del área del sidebar */}
          <BackButton className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4" />
        </div>

        <div className="hidden w-px bg-gray-200 md:block" />

        <div className="relative mx-auto w-full max-w-[720px] pt-12">
          {isLoading ? (
            <>
              <FormFieldSkeleton />
              <FormFieldSkeleton />
              <FormFieldSkeleton />
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
                value={hasPhone ? phoneDisplay : ''}
                placeholder={t('noPhone')}
                {...(hasPhone
                  ? { iconEditable: true }
                  : { actionLabel: t('add') })}
                saveLabel={t('save')}
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
              {/* <p className="mb-4 text-sm text-[#6b7280]">
                  {profile?.passwordChangedAgo
                    ? t('passwordChangedNotice', {
                        when: profile.passwordChangedAgo,
                      })
                    : t('passwordChangedNotice')}
                </p> */}
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

          {/* <div className="flex justify-center">
              <ProfileSocialButtons />
            </div> */}
        </div>
      </div>
    </main>
  );
}
