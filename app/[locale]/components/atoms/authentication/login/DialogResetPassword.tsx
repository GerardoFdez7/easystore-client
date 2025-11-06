'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import { Form } from '@shadcn/ui/form';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import ResetPasswordFields from '@atoms/authentication/login/ResetPasswordFields';
import { ResetPasswordFormData } from '@molecules/authentication/login/ResetPasswordForm';

interface DialogResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  token: string;
  form: UseFormReturn<ResetPasswordFormData>;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  loading: boolean;
  isTokenInvalid?: boolean;
}

export default function DialogResetPassword({
  isOpen,
  onClose: _onClose,
  onSuccess: _onSuccess,
  token,
  form,
  onSubmit,
  loading,
  isTokenInvalid = false,
}: DialogResetPasswordProps) {
  const t = useTranslations('ResetPassword');

  if ((!token || isTokenInvalid) && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && _onClose()}>
        <DialogContent className="sm:max-w-md" showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-red-600">{t('invalidResetLink')}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <ResetPasswordFields />
            <ButtonLoadable
              type="submit"
              variant="auth"
              size="xl"
              className="w-full"
              loading={loading}
            >
              {t('updatePassword')}
            </ButtonLoadable>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
