// @hooks/get-in-touch/useTouch.ts
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const phoneRegex = /^[+\d().\-\s]{6,20}$/;

type ContactResponse =
  | { ok: true }
  | { ok: false; message?: string; error?: string; detail?: string };

function pickMessage(body: unknown): string | undefined {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    for (const key of ['message', 'error', 'detail']) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v;
    }
  }
  return undefined;
}

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
      .url({ message: t('invalidUrl', { default: 'Invalid URL' }) }),
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

  const handleSubmit = async (data: TouchFormValues): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let body: unknown;
        try {
          body = await res.json();
        } catch {
          /* ignore non-JSON bodies */
        }
        const msg = pickMessage(body) ?? `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const payload = (await res.json().catch(() => undefined)) as
        | ContactResponse
        | undefined;
      if (payload && 'ok' in payload && payload.ok === false) {
        throw new Error(pickMessage(payload) ?? 'Request failed');
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
