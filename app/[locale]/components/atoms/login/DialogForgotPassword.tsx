'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import Input from '@atoms/shared/OutsideInput';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { useForgotPassword } from '@hooks/domains/authentication/useForgotPassword';

interface DialogForgotPasswordProps {
  children: React.ReactNode;
}

interface ForgotPasswordFormData {
  email: string;
}

export default function DialogForgotPassword({
  children,
}: DialogForgotPasswordProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleForgotPassword, isLoading, forgotPasswordSchema } =
    useForgotPassword();
  const t = useTranslations('ForgotPassword');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    const result = await handleForgotPassword(data.email);
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
        <Form {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(handleSubmit)(e);
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
