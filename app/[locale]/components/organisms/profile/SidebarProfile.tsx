'use client';

import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';
import { useTranslations } from 'next-intl';
import MediaUploader from '@organisms/shared/MediaUploader';
import { Button } from '@shadcn/ui/button';
import { useProfile } from '@hooks/domains/tenant/useProfile';
import LogoutConfirmDialog from '@atoms/shared/LogoutConfirmDialog';
import { LogOut, Edit2, Save as SaveIcon } from 'lucide-react';
import BackButton from '@atoms/shared/BackButton';
import { EditableField } from '@molecules/profile/EditableField';

export default function SidebarProfile() {
  const t = useTranslations('Profile');
  const { profile, actions, loading } = useProfile();

  return (
    <aside className="mt-6 flex w-full flex-col md:mt-0 md:min-h-full md:max-w-md md:shrink-0">
      <div className="border-b border-gray-300 md:border-none">
        <BackButton />
        <div data-tour="profile-logo">
          <MediaUploader
            multiple={false}
            className="mx-auto max-w-40 sm:max-w-60"
            initialMedia={profile?.logo}
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
            onMediaProcessed={async (processedData) => {
              try {
                if (processedData === null) {
                  // Handle logo removal
                  await actions.updateLogo(null);
                } else {
                  const cover = processedData?.cover;
                  if (cover) {
                    await actions.updateLogo(cover);
                  }
                }
              } catch (_error) {}
            }}
            renderDoneButton={(onDone, isProcessing) => (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 translate-x-full -translate-y-full transform px-2"
                onClick={onDone}
                disabled={isProcessing}
                aria-label="Save"
              >
                <SaveIcon className="h-4 w-4" />
              </Button>
            )}
            renderEditButton={(onEdit, isEditing, hasMedia) => (
              <Button
                type="button"
                variant="link"
                disabled={isEditing || !hasMedia}
                className="text-secondary h-9 translate-x-full -translate-y-full transform px-2"
                onClick={onEdit}
                aria-label="Edit"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          />
        </div>
        <div className="relative [&_.flex.md\:hidden]:absolute [&_.flex.md\:hidden]:right-0">
          <div data-tour="profile-business-name">
            <EditableField
              value={profile?.businessName ?? ''}
              className="bg-background dark:bg-dark text-title flex items-center justify-center border-none p-0 text-center text-2xl font-bold shadow-none"
              placeholder={t('defaultName')}
              iconEditable
              saveLabel={t('save')}
              onSave={(v) => void actions.updateBusinessName(v)}
            />
          </div>
        </div>

        <div data-tour="profile-description">
          <DescriptionEditor
            value={profile?.description ?? ''}
            onSave={(v) => void actions.updateDescription(v)}
            loading={loading}
          />
        </div>

        <div className="mt-4 mb-5 sm:mt-6">
          <h3 className="text-title mb-2 text-sm font-bold">
            {t('storeProfileTitle')}
          </h3>
          <p className="text-text text-sm leading-relaxed">
            {t('storeProfileDescription')}
          </p>
        </div>
      </div>

      <div className="hidden md:mt-auto md:block">
        <LogoutConfirmDialog>
          <div data-tour="profile-logout">
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
    </aside>
  );
}
