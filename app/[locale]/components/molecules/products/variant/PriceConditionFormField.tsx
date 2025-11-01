import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
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
import type { Condition } from '@lib/types/variant';
import { useTranslations } from 'next-intl';
import { formatPriceWithCommasAndDots } from '@lib/utils/input-formatters';

interface PriceConditionFormFieldProps {
  currency?: string;
}

export default function PriceConditionFormField({
  currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY,
}: PriceConditionFormFieldProps) {
  const { control } = useFormContext();
  const t = useTranslations('Variant');
  const [isFocused, setIsFocused] = useState(false);

  const onPriceChange = (value: string, onChange: (value: number) => void) => {
    // Remove all non-numeric characters except the decimal point
    const cleaned = value.replace(/,/g, '.').replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    const normalized =
      parts.length <= 2 ? cleaned : `${parts[0]}.${parts.slice(1).join('')}`;

    // Convert to number for storage
    const numValue = normalized === '' ? 0 : Number(normalized);
    if (!Number.isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const onPriceBlur = (value: number) => {
    setIsFocused(false);
    // Value stays as number in the form, display formatting happens in input rendering
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return;
    }
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
                  required={true}
                  className="sm:w-60"
                  placeholder={t('pricePlaceholder')}
                  value={
                    !isFocused &&
                    typeof field.value === 'number' &&
                    !Number.isNaN(field.value)
                      ? formatPriceWithCommasAndDots(field.value)
                      : field.value || ''
                  }
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    onPriceBlur(field.value);
                    field.onBlur();
                  }}
                  onChange={(e) =>
                    onPriceChange(e.target.value, field.onChange)
                  }
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
                required={true}
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
