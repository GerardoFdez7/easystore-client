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
import { formatAmount, isDecimalString } from '@lib/utils/money';

interface PriceConditionFormFieldProps {
  /** Currency of the product the variant belongs to. */
  currency?: string;
}

export default function PriceConditionFormField({
  currency,
}: PriceConditionFormFieldProps) {
  const { control } = useFormContext();
  const t = useTranslations('Variant');
  const [isFocused, setIsFocused] = useState(false);

  const onPriceChange = (value: string, onChange: (value: string) => void) => {
    // Keep only digits and a single decimal point; the amount stays an exact string
    const cleaned = value.replace(/,/g, '.').replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    const [integer = '', fraction] = parts;
    // At most 2 decimals, per the monetary contract
    onChange(
      fraction === undefined ? integer : `${integer}.${fraction.slice(0, 2)}`,
    );
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
                    !isFocused && currency && isDecimalString(field.value)
                      ? formatAmount(field.value, currency)
                      : (field.value ?? '')
                  }
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
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
                  aria-label={t('condition')}
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
