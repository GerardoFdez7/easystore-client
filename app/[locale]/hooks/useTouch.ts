// @hooks/get-in-touch/useTouch.ts
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const phoneRegex = /^[+\d().\-\s]{6,20}$/;

export const annualRevenueEnum = z.enum([
  '0-100k',
  '100k-500k',
  '500k-1m',
  '1m+',
] as const);
export const agencyEnum = z.enum(['yes', 'no'] as const);

export const buildTouchFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    fullName: z
      .string()
      .min(2, {
        message: t('fullNameTooShort', { default: 'Full name is too short' }),
      })
      .max(255, {
        message: t('fullNameTooLong', { default: 'Full name is too long' }),
      })
      .regex(/^\S+\s+\S+.*$/, {
        message: t('fullNameRequiresTwoWords', {
          default: 'Please enter at least first and last name',
        }),
      }),
    businessEmail: z.string().email({
      message: t('invalidEmailFormat', { default: 'Invalid email format' }),
    }),
    businessPhone: z.string().regex(phoneRegex, {
      message: t('invalidPhone', { default: 'Invalid phone number' }),
    }),
    company: z
      .string()
      .min(2, {
        message: t('companyTooShort', { default: 'Company is required' }),
      })
      .max(255, {
        message: t('companyTooLong', { default: 'Company name is too long' }),
      }),
    websiteUrl: z
      .string()
      .url({ message: t('invalidUrl', { default: 'Invalid URL' }) })
      .optional()
      .or(z.literal('')),
    country: z.string().min(1, {
      message: t('countryRequired', { default: 'Country is required' }),
    }),
    annualRevenue: annualRevenueEnum.refine(Boolean, {
      message: t('annualRevenueRequired', {
        default: 'Annual revenue is required',
      }),
    }),
    isAgency: agencyEnum,
  });

export type TouchFormValues = z.infer<ReturnType<typeof buildTouchFormSchema>>;

export const useTouch = () => {
  const t = useTranslations('GetInTouch');
  const [isLoading, setIsLoading] = useState(false);

  const touchFormSchema = buildTouchFormSchema(t);

  const form = useForm<TouchFormValues>({
    resolver: zodResolver(touchFormSchema),
    defaultValues: {
      fullName: '',
      businessEmail: '',
      businessPhone: '',
      company: '',
      websiteUrl: '',
      country: '',
      annualRevenue: undefined as unknown as TouchFormValues['annualRevenue'],
      isAgency: 'no',
    },
  });

  const handleSubmit = async (_data: TouchFormValues): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock GraphQL request simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 1500 + Math.random() * 1000),
      );

      // Random success/failure simulation (80% success rate)
      const isSuccess = Math.random() > 0.2;

      if (!isSuccess) {
        throw new Error('Mock error: Request failed');
      }

      toast.success(t('submittedTitle', { default: 'Request sent 🎉' }), {
        description: t('submittedDescription', {
          default: 'We will contact you shortly.',
        }),
      });
      form.reset();
    } catch (err: unknown) {
      const msg =
        err instanceof Error && err.message
          ? err.message
          : t('unknownError', { default: 'Unknown error' });

      toast.error(t('submitErrorTitle', { default: 'Something went wrong' }), {
        description:
          msg ||
          t('submitErrorDescription', {
            default: 'Please try again later.',
          }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { form, handleSubmit, isLoading, touchFormSchema };
};

export default useTouch;
