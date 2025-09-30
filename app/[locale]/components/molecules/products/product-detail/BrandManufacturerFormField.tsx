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
import { useTranslations } from 'next-intl';

export default function BrandManufacturerFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* BRAND Field */}
      <FormField
        control={control}
        name="brand"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="brand" className="text-lg font-semibold">
              {t('brand')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="brand"
                placeholder={t('brandPlaceholder')}
                value={String(field.value ?? '')}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={!!fieldState.error}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* MANUFACTURER Field */}
      <FormField
        control={control}
        name="manufacturer"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="manufacturer" className="text-lg font-semibold">
              {t('manufacturer')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="manufacturer"
                placeholder={t('manufacturerPlaceholder')}
                value={String(field.value ?? '')}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={!!fieldState.error}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
