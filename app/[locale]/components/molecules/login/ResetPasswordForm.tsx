'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import DialogResetPassword from '@atoms/login/DialogResetPassword';
import { useUpdatePassword } from '@hooks/authentication/useUpdatePassword';

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [token, setToken] = useState<string>('');
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const searchParams = useSearchParams();
  const { handleUpdatePassword, isLoading, formSchema } = useUpdatePassword();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // Check if there's a reset token in the URL and decode it
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      const decodedToken = decodeURIComponent(tokenParam);
      setToken(decodedToken);
      setIsResetPasswordOpen(true);
      setIsTokenInvalid(false);
    }
  }, [searchParams]);

  // Reset form when dialog opens
  useEffect(() => {
    if (isResetPasswordOpen) {
      form.reset();
    }
  }, [isResetPasswordOpen, form]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    const result = await handleUpdatePassword(
      token,
      data.password,
      data.confirmPassword,
    );
    if (result.success) {
      handleResetPasswordSuccess();
    } else {
      // If the request failed, it could be due to invalid/expired token
      setIsTokenInvalid(true);
    }
  };

  const handleResetPasswordSuccess = () => {
    setIsResetPasswordOpen(false);
    // Clear the token from URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.replaceState({}, '', url.toString());
  };

  const handleResetPasswordClose = () => {
    setIsResetPasswordOpen(false);
    // Clear the token from URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <DialogResetPassword
      isOpen={isResetPasswordOpen}
      onClose={handleResetPasswordClose}
      onSuccess={handleResetPasswordSuccess}
      token={token}
      form={form}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isTokenInvalid={isTokenInvalid}
    />
  );
}
