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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormMessage } from '@shadcn/ui/form';
import { useEffect } from 'react';

type ProfileFormData = {
  businessName: string;
  description: string;
};

export default function SidebarProfile() {
  const t = useTranslations('Profile');
  const { profile, actions, loading, validators } = useProfile();

  // Create form schema for sidebar fields
  const formSchema = z.object({
    businessName: validators.businessName,
    description: validators.description,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      description: '',
    },
    mode: 'onChange',
  });

  // Update form values when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        businessName: profile.businessName || '',
        description: profile.description || '',
      });
    }
  }, [profile, form]);

  const handleFieldSave = async (
    fieldName: keyof ProfileFormData,
    value: string,
  ) => {
    const actionMap = {
      businessName: actions.updateBusinessName,
      description: actions.updateDescription,
    };

    const result = await actionMap[fieldName](value);
    if (!result.success && result.error) {
      form.setError(fieldName, { message: result.error });
      return false;
    }
    form.clearErrors(fieldName);
    return true;
  };

  const handleLogoUpdate = async (processedData: unknown) => {
    try {
      if (processedData === null) {
        // Handle logo removal
        const result = await actions.updateLogo(null);
        if (!result.success && result.error) {
          console.error('Error removing logo:', result.error);
        }
      } else {
        const cover = (processedData as { cover?: string })?.cover;
        if (cover) {
          const result = await actions.updateLogo(cover);
          if (!result.success && result.error) {
            console.error('Error updating logo:', result.error);
          }
        }
      }
    } catch (error) {
      console.error('Error persisting media:', error);
    }
  };

  return (
    <Form {...form}>
      <aside className="mt-6 flex w-full flex-col md:mt-0 md:min-h-full md:max-w-md md:shrink-0">
        <div className="border-b border-gray-300 md:border-none">
          <BackButton />
          <MediaUploader
            multiple={false}
            className="mx-auto max-w-40 sm:max-w-60"
            initialMedia={profile?.logo}
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
            onMediaProcessed={handleLogoUpdate}
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
          <div className="relative [&_.flex.md\:hidden]:absolute [&_.flex.md\:hidden]:right-0">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <EditableField
                    value={field.value}
                    className="bg-background dark:bg-dark text-title flex items-center justify-center border-none !p-0 text-center !text-2xl font-bold shadow-none"
                    placeholder={t('defaultName')}
                    iconEditable
                    saveLabel={t('save')}
                    onSave={(v) => handleFieldSave('businessName', v)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <DescriptionEditor
                  value={field.value}
                  onSave={(v) => handleFieldSave('description', v)}
                  loading={loading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

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
            <Button
              variant="outline"
              className="text-title h-10 w-full justify-start rounded-lg border-gray-200 bg-white px-4 shadow-sm hover:bg-gray-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t('logOut')}
            </Button>
          </LogoutConfirmDialog>
        </div>
      </aside>
    </Form>
  );
}
