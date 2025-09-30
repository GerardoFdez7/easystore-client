import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { useTranslations } from 'next-intl';

type ProductType = 'PHYSICAL' | 'DIGITAL';

export default function TypeProductFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="productType"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="productType" className="text-lg font-semibold">
              {t('productType')}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value || 'PHYSICAL'} // Use the form value directly
                onValueChange={(value) => {
                  field.onChange(value as ProductType);
                }}
              >
                <SelectTrigger
                  className="w-full sm:w-[300px]"
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={t('selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PHYSICAL">{t('physical')}</SelectItem>
                  <SelectItem value="DIGITAL">{t('digital')}</SelectItem>
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
