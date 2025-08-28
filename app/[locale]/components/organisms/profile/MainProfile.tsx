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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormMessage } from '@shadcn/ui/form';
import { useEffect } from 'react';

type ProfileFormData = {
  ownerName: string;
  businessName: string;
  description: string;
  domain: string;
  defaultPhoneNumberId?: string;
  email: string;
};

export default function MainProfile() {
  const t = useTranslations('Profile');
  const { profile, isLoading, phoneDisplay, hasPhone, actions, validators } =
    useProfile();

  // Create form schema from validators
  const formSchema = z.object({
    ownerName: validators.ownerName,
    businessName: validators.businessName,
    description: validators.description,
    domain: validators.domain,
    defaultPhoneNumberId: z.string().optional(),
    email: validators.email,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: '',
      businessName: '',
      description: '',
      domain: '',
      defaultPhoneNumberId: '',
      email: '',
    },
    mode: 'onChange',
  });

  // Update form values when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        ownerName: profile.ownerName || '',
        businessName: profile.businessName || '',
        description: profile.description || '',
        domain: profile.domain || '',
        defaultPhoneNumberId: profile.defaultPhoneNumberId || '',
        email: profile.email || '',
      });
    }
  }, [profile, form]);

  const handleFieldSave = async (
    fieldName: keyof ProfileFormData,
    value: string,
  ) => {
    const actionMap = {
      ownerName: actions.updateOwnerName,
      businessName: actions.updateBusinessName,
      description: actions.updateDescription,
      domain: actions.updateDomain,
      defaultPhoneNumberId: actions.updatePhone,
      email: actions.updateEmail,
    };

    const result = await actionMap[fieldName](value);
    if (!result.success && result.error) {
      form.setError(fieldName, { message: result.error });
      return false;
    }
    form.clearErrors(fieldName);
    return true;
  };

  return (
    <Form {...form}>
      <main className="relative mt-6 min-h-full w-full flex-1 md:mt-0">
        {isLoading ? (
          <>
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <EditableField
                    label={t('ownerName')}
                    value={field.value}
                    iconEditable
                    saveLabel={t('save')}
                    onSave={(v) => handleFieldSave('ownerName', v)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <EditableField
                    label={t('domain')}
                    value={field.value}
                    iconEditable
                    saveLabel={t('save')}
                    onSave={(v) => handleFieldSave('domain', v)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultPhoneNumberId"
              render={() => (
                <FormItem className="mb-4">
                  <EditableField
                    label={t('phone')}
                    value={hasPhone ? phoneDisplay : ''}
                    placeholder={t('noPhone')}
                    {...(hasPhone
                      ? { iconEditable: true }
                      : { actionLabel: t('add') })}
                    saveLabel={t('save')}
                    onSave={(v) => handleFieldSave('defaultPhoneNumberId', v)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <EditableField
                    label={t('email')}
                    value={field.value}
                    statusChip={{ label: t('verified'), tone: 'denied' }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <ProfileSection
          title={t('password')}
          buttonText={t('changePassword')}
          className="mb-8"
        />
        <ProfileSection
          title={t('plan')}
          description={t('currentPlan')}
          buttonText={t('changePlan')}
        />

        {/* Mobile logout button at bottom */}
        <div className="p-4 md:hidden">
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

        {/* <div className="flex justify-center">
                <ProfileSocialButtons />
              </div> */}
      </main>
    </Form>
  );
}
