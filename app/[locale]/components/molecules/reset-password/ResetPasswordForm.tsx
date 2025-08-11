'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Form } from '@shadcn/ui/form';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import ResetPasswordFields from '@atoms/reset-password/ResetPasswordFields';
import { useUpdatePassword } from '@hooks/authentication/useUpdatePassword';
import { useRouter } from '@i18n/navigation';

export const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const searchParams = useSearchParams();
  const { handleUpdatePassword, isLoading } = useUpdatePassword();
  const t = useTranslations('ResetPassword');
  const router = useRouter();

  const resetPasswordSchema = z
    .object({
      password: z.string().min(8, t('passwordTooShort')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Extract email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('token');
    if (emailParam) {
      // Decode the email (handles %40 -> @)
      const decodedEmail = decodeURIComponent(emailParam);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!email) return;

    const result = await handleUpdatePassword(
      email,
      data.password,
      data.confirmPassword,
    );
    if (result.success) {
      router.push('/login');
    }
  };

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-red-600">{t('invalidResetLink')}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(handleSubmit)(e);
        }}
        className="w-full space-y-6 sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <ResetPasswordFields />
        <ButtonLoadable
          type="submit"
          variant="auth"
          size="xl"
          className="w-full"
          isLoading={isLoading}
          loadingText={t('updating')}
        >
          {t('updatePassword')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
