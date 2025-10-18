'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    available: z
      .number({ invalid_type_error: t('availablePlaceholder') })
      .min(0, { message: t('availablePlaceholder') }),
    reserved: z
      .number({ invalid_type_error: t('reservedPlaceholder') })
      .min(0, { message: t('reservedPlaceholder') }),
    productLocation: z
      .string()
      .trim()
      .max(100, { message: t('productLocationPlaceholder') })
      .optional()
      .or(z.literal(''))
      .refine(
        (v) => v === '' || (typeof v === 'string' && v.trim().length >= 10),
        { message: t('productLocationTooShort') },
      ),
    lotNumber: z.string().trim().max(50).optional().or(z.literal('')),
    replenishmentDate: z.date().nullable().optional(),
    reason: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine(
        (v) => v === '' || (typeof v === 'string' && v.trim().length >= 10),
        { message: t('updateReasonTooShort') },
      ),
  });
}

export type StockFormValues = z.infer<ReturnType<typeof buildSchema>>;

export function useStockForm() {
  const t = useTranslations('StockDetail');
  const schema = useMemo(() => buildSchema(t), [t]);

  const form = useForm<StockFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      available: 0,
      reserved: 0,
      productLocation: '',
      lotNumber: '',
      replenishmentDate: null,
    },
    mode: 'onChange',
  });

  return { form, t };
}
