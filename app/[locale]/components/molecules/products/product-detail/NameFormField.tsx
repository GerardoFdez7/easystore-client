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

export default function NameFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="name" className="text-lg font-semibold">
              {t('name')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="name"
                placeholder={t('namePlaceholder')}
                value={String(field.value ?? '')}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={!!fieldState.error}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
