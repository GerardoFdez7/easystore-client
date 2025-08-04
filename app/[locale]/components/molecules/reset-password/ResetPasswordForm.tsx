'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';
import { Form } from '@shadcn/ui/form';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import ResetPasswordFields from '@atoms/reset-password/ResetPasswordFields';
import { useUpdatePassword } from '@hooks/authentication/useUpdatePassword';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const searchParams = useSearchParams();
  const { handleUpdatePassword, isLoading, error } = useUpdatePassword();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Extract email from URL parameters
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      // Decode the email (handles %40 -> @)
      const decodedEmail = decodeURIComponent(emailParam);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!email) {
      console.error('No email found in URL parameters');
      return;
    }

    const result = await handleUpdatePassword(email, data.password);

    if (result.success) {
      // TODO: Show success message and redirect to login
      console.log('Password updated successfully:', result.message);
      // Redirect to login page
      window.location.href = '/dashboard';
    } else {
      // Error is handled by the hook
      console.error('Failed to update password:', result.message);
    }
  };

  if (!email) {
    return (
      <div className="text-center">
        <p className="text-red-600">Invalid reset link. Email not found.</p>
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
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            Updating password for: <span className="font-medium">{email}</span>
          </p>
        </div>
        <ResetPasswordFields />
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        <ButtonLoadable
          type="submit"
          variant="auth"
          size="xl"
          className="w-full"
          isLoading={isLoading}
        >
          Update Password
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
