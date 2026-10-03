'use client';

import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';
import { useProfileDraft } from '@contexts/ProfileDraftContext';
import FormFieldSkeleton from '@atoms/shared/FormFieldSkeleton';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import { LogOut } from 'lucide-react';
import ProfileSection from '@atoms/profile/ProfileSection';

export default function MainProfile() {
  const t = useTranslations('Profile');
  const { profile, loading, values, setField } = useProfileDraft();

  return (
    <main className="gap-section flex w-full min-w-0 flex-col">
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>{t('account')}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-card flex flex-col">
          {loading ? (
            <>
              <FormFieldSkeleton className="mb-0" />
              <FormFieldSkeleton className="mb-0" />
              <FormFieldSkeleton className="mb-0" />
            </>
          ) : (
            <>
              <EditableField
                id="profile-owner-name"
                label={t('ownerName')}
                value={values.ownerName}
                onChange={(v) => setField('ownerName', v)}
              />

              <EditableField
                id="profile-domain"
                label={t('domain')}
                value={values.domain}
                onChange={(v) => setField('domain', v)}
              />

              <EditableField
                id="profile-email"
                label={t('email')}
                value={profile?.email ?? ''}
                statusChip={{ label: t('verified'), tone: 'denied' }}
              />
            </>
          )}
        </CardContent>
      </Card>

      <ProfileSection title={t('password')} buttonText={t('changePassword')} />
      <ProfileSection
        title={t('plan')}
        description={t('currentPlan')}
        buttonText={t('changePlan')}
      />

      <div className="flex justify-end">
        <LogoutConfirmDialog>
          <Button variant="outline" className="w-full sm:w-auto">
            <LogOut />
            {t('logOut')}
          </Button>
        </LogoutConfirmDialog>
      </div>
    </main>
  );
}
