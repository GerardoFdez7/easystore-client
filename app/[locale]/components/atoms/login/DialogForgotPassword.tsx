'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import Input from '@atoms/shared/OutsideInput';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { useForgotPassword } from '@hooks/authentication/useForgotPassword';

interface DialogForgotPasswordProps {
  children: React.ReactNode;
}

export default function DialogForgotPassword({
  children,
}: DialogForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { handleForgotPassword, isLoading } = useForgotPassword();
  const t = useTranslations('ForgotPassword');

  // Reset email when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await handleForgotPassword(email);
    if (result.success) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="space-y-4"
        >
          <Input
            type="email"
            label={t('email')}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonLoadable
            type="submit"
            variant="auth"
            size="xl"
            className="w-full"
            isLoading={isLoading}
            loadingText={t('sending')}
          >
            {t('sendResetLink')}
          </ButtonLoadable>
        </form>
      </DialogContent>
    </Dialog>
  );
}
