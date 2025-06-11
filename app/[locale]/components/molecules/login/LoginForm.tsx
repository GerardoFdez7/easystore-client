'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { Form } from '@shadcn/ui/form';
import LoginFields from '@molecules/login/LoginFields';
import LinkToRegister from '@atoms/login/LinkToRegister';

export const LoginForm: React.FC = () => {
  const t = useTranslations('Login');
  const [isLoading, setIsLoading] = useState(false);

  // Schema validation based on backend value objects
  const loginFormSchema = z.object({
    email: z.string().email({ message: t('invalidEmailFormat') }),
    password: z
      .string()
      .min(8, { message: t('passwordTooShort') })
      .max(255, { message: t('passwordTooLong') }),
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    // Simulate API call
    console.log('Login data:', data);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Different response scenarios
    const scenarios = [
      'success',
      'invalid_credentials',
      'account_disabled',
      'unexpected_error',
    ];
    const randomScenario =
      scenarios[Math.floor(Math.random() * scenarios.length)];

    switch (randomScenario) {
      case 'success':
        toast.success('Login successful!', {
          description: 'Welcome back! You have been successfully logged in.',
        });
        break;

      case 'invalid_credentials':
        toast.warning('Invalid credentials', {
          description:
            'The email or password you entered is incorrect. Please try again.',
        });
        break;

      case 'account_disabled':
        toast.error('Account disabled', {
          description:
            'Your account has been disabled. Please contact support for assistance.',
        });
        break;

      case 'unexpected_error':
        toast.error('Unexpected error occurred', {
          description:
            'Something went wrong. Please check your connection and try again.',
        });
        break;

      default:
        toast.success('Login successful!');
    }
  };

  const handleFormSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await handleLogin(values);
      setIsLoading(false);
    } catch (_error) {
      setIsLoading(false);
      toast.error('Unexpected error occurred', {
        description:
          'Something went wrong. Please check your connection and try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          void form.handleSubmit(handleFormSubmit)(e);
        }}
        className="w-full space-y-6 sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <LoginFields />
        <LinkToRegister />
        <ButtonLoadable
          type="submit"
          variant="auth"
          size="xl"
          className="w-full"
          isLoading={isLoading}
        >
          {t('buttonLogin')}
        </ButtonLoadable>
      </form>
    </Form>
  );
};

export default LoginForm;
