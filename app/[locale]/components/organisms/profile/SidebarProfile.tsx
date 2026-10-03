'use client';

import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';
import { useTranslations } from 'next-intl';
import MediaUploader from '@molecules/shared/MediaUploader';
import { Card, CardContent } from '@shadcn/ui/card';
import { useProfileDraft } from '@contexts/ProfileDraftContext';
import { EditableField } from '@molecules/profile/EditableField';

export default function SidebarProfile() {
  const t = useTranslations('Profile');
  const { profile, loading, values, setField, resetKey } = useProfileDraft();

  return (
    <aside>
      <Card>
        <CardContent className="gap-card flex flex-col">
          <MediaUploader
            key={resetKey}
            multiple={false}
            alwaysEditing
            reportRemoval
            className="mx-auto max-w-40 sm:max-w-60"
            initialMedia={profile?.logo}
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
            onMediaProcessed={async (processedData) => {
              setField('logo', processedData?.cover ?? null);
            }}
          />

          <EditableField
            id="profile-business-name"
            label={t('defaultName')}
            placeholder={t('defaultName')}
            value={values.businessName}
            onChange={(v) => setField('businessName', v)}
            inputClassName="font-semibold"
          />

          <DescriptionEditor
            value={values.description}
            onChange={(v) => setField('description', v)}
            disabled={loading}
          />

          <div className="gap-control flex flex-col">
            <h2 className="text-title text-sm font-medium">
              {t('storeProfileTitle')}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t('storeProfileDescription')}
            </p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
