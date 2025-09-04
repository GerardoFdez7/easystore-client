'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  GetInTouchDocument,
  GetInTouchMutation,
  GetInTouchMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client';

const phoneRegex = /^[+\d().-\s]{6,20}$/;

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const [getInTouchMutation] = useMutation<
    GetInTouchMutation,
    GetInTouchMutationVariables
  >(GetInTouchDocument, {
    onCompleted: () => {
      toast.success(t('submittedTitle'), {
        description: t('submittedDescription'),
      });
      form.reset();
      router.push('/');
      setLoading(false);
    },
  });

  const handleSubmit = async (formData: TouchFormValues) => {
    try {
      setLoading(true);
      const variables: GetInTouchMutationVariables = {
        fullName: formData.fullName,
        businessEmail: formData.businessEmail,
        businessPhone: formData.businessPhone,
        company: formData.company,
        websiteUrl: formData.websiteUrl || '',
        country: formData.country,
        annualRevenue: formData.annualRevenue,
        isAgency: formData.isAgency,
      };

      await getInTouchMutation({ variables });
    } catch (error) {
      console.error('Get in touch error:', error);
      setLoading(false);
    }
  };

  return { form, handleSubmit, loading, touchFormSchema };
};

export default useTouch;
