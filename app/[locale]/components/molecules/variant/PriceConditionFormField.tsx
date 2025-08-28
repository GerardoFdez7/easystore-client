import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import type { Condition } from '@lib/utils/types/variant';
import { useTranslations } from 'next-intl';

interface PriceConditionFormFieldProps {
  currency?: string;
}

export default function PriceConditionFormField({
  currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q',
}: PriceConditionFormFieldProps) {
  const { control } = useFormContext();
  const t = useTranslations('Variant');

  const onPriceChange = (value: string, onChange: (value: string) => void) => {
    const cleaned = value.replace(/,/g, '.').replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    const normalized =
      parts.length <= 2 ? cleaned : `${parts[0]}.${parts.slice(1).join('')}`;
    onChange(normalized);
  };

  const onPriceBlur = (value: string, onChange: (value: string) => void) => {
    if (value === '' || value === null || value === undefined) return;
    const n = Number(value);
    if (!Number.isNaN(n)) onChange(n.toFixed(2));
  };

  return (
    <section className="flex flex-col items-center gap-y-4 sm:!mx-20 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
      {/* PRICE */}
      <FormField
        control={control}
        name="price"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="price" className="text-lg font-semibold">
              {t('price')}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2 font-medium">
                  {currency}
                </span>
                <Input
                  {...field}
                  id="price"
                  inputMode="decimal"
                  className="sm:w-60"
                  placeholder={t('pricePlaceholder')}
                  value={String(field.value ?? '')}
                  onChange={(e) =>
                    onPriceChange(e.target.value, field.onChange)
                  }
                  onBlur={() => {
                    onPriceBlur(field.value, field.onChange);
                    field.onBlur();
                  }}
                  aria-invalid={!!fieldState.error}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* CONDITION */}
      <FormField
        control={control}
        name="condition"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="condition" className="text-lg font-semibold">
              {t('condition')}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value || 'NEW'}
                onValueChange={(value) => field.onChange(value as Condition)}
              >
                <SelectTrigger
                  className="sm:w-60"
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={t('selectCondition')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">{t('conditionNew')}</SelectItem>
                  <SelectItem value="USED">{t('conditionUsed')}</SelectItem>
                  <SelectItem value="REFURBISHED">
                    {t('conditionRefurbished')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
