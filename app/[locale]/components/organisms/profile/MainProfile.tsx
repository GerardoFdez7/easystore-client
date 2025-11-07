'use client';

import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
// import ProfileSocialButtons from '@molecules/shared/ProfileSocialButton';
import { useTranslations } from 'next-intl';
import { useProfile } from '@hooks/domains/tenant/useProfile';
import FormFieldSkeleton from '@atoms/shared/FormFieldSkeleton';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import { LogOut } from 'lucide-react';
import ProfileSection from '@atoms/profile/ProfileSection';
import useDriverTourProfile from '@hooks/driver/useDriverTourProfile';

export default function MainProfile() {
  const t = useTranslations('Profile');
  const { profile, loading, actions } = useProfile();

  // Initialize profile tour (runs only once per browser)
  useDriverTourProfile();

  return (
    <main className="relative mt-6 min-h-full w-full flex-1 md:mt-0">
      {loading ? (
        <>
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <FormFieldSkeleton />
        </>
      ) : (
        <>
          <div data-tour="profile-owner-name">
            <EditableField
              label={t('ownerName')}
              value={profile?.ownerName ?? ''}
              iconEditable
              saveLabel={t('save')}
              onSave={(v) => void actions.updateOwnerName(v)}
            />
          </div>

          <div data-tour="profile-domain">
            <EditableField
              label={t('domain')}
              value={profile?.domain ?? ''}
              iconEditable
              saveLabel={t('save')}
              onSave={(v) => void actions.updateDomain(v)}
            />
          </div>

          {/* <EditableField
            label={t('phone')}
            value={hasPhone ? phoneDisplay : ''}
            placeholder={t('noPhone')}
            {...(hasPhone ? { iconEditable: true } : { actionLabel: t('add') })}
            saveLabel={t('save')}
            onSave={(v) => void actions.updatePhone(v)}
          /> */}

          <div data-tour="profile-email">
            <EditableField
              label={t('email')}
              value={profile?.email ?? ''}
              statusChip={{ label: t('verified'), tone: 'denied' }}
            />
          </div>
        </>
      )}

      <div data-tour="profile-password">
        <ProfileSection
          title={t('password')}
          buttonText={t('changePassword')}
          className="mb-8"
        />
      </div>
      <div data-tour="profile-plan">
        <ProfileSection
          title={t('plan')}
          description={t('currentPlan')}
          buttonText={t('changePlan')}
        />
      </div>

      {/* Mobile logout button at bottom */}
      <div className="p-4 md:hidden">
        <LogoutConfirmDialog>
          <div data-tour="profile-logout-mobile">
            <Button
              variant="outline"
              className="text-title h-10 w-full justify-start rounded-lg border-gray-200 bg-white px-4 shadow-sm hover:bg-gray-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('logOut')}
            </Button>
          </div>
        </LogoutConfirmDialog>
      </div>

      {/* <div className="flex justify-center">
              <ProfileSocialButtons />
            </div> */}
    </main>
  );
}
