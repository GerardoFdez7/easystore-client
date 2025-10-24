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
import { TypeEnum } from '@graphql/generated';

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
                value={field.value || TypeEnum.Physical}
                required={true}
                onValueChange={(value) => {
                  field.onChange(value as TypeEnum);
                }}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={t('selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TypeEnum.Physical}>
                    {t('physical')}
                  </SelectItem>
                  <SelectItem value={TypeEnum.Digital}>
                    {t('digital')}
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
