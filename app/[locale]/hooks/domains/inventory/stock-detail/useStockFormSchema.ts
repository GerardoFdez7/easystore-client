'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    available: z
      .number()
      .int({ message: t('availableMustBeInteger') })
      .min(1, { message: t('availableMustBeGreaterThanZero') })
      .max(999999999, { message: t('availableExceedsMax') }),
    reserved: z
      .number()
      .int({ message: t('reservedMustBeInteger') })
      .min(0, { message: t('reservedCannotBeNegative') })
      .max(999999999, { message: t('reservedExceedsMax') }),
    productLocation: z
      .string()
      .trim()
      .min(10, { message: t('productLocationTooShort') })
      .max(200)
      .optional()
      .or(z.literal('')),
    lotNumber: z
      .string()
      .trim()
      .min(1, { message: t('lotNumberMustBeNonEmpty') })
      .max(50, { message: t('lotNumberExceedsMax') })
      .optional()
      .or(z.literal('')),
    replenishmentDate: z
      .date()
      .min(new Date(), { message: t('replenishmentDateMustBeFuture') })
      .nullable()
      .optional(),
    reason: z
      .string()
      .trim()
      .min(20, { message: t('reasonTooShort') })
      .max(2000)
      .optional()
      .or(z.literal('')),
    serialNumbers: z
      .array(
        z
          .string()
          .min(1, { message: t('serialNumberMustBeNonEmpty') })
          .max(100, { message: t('serialNumberExceedsMax') })
          .trim(),
      )
      .max(1000, { message: t('serialNumbersExceedsMax') })
      .optional(),
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
      serialNumbers: [],
    },
    mode: 'onChange',
  });

  return { form, t };
}
