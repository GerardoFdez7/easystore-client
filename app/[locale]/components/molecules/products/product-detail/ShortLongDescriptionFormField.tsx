import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { Textarea } from '@shadcn/ui/textarea';
import { useTranslations } from 'next-intl';

export default function ShortLongDescriptionFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="space-y-6">
      {/* SHORT DESCRIPTION */}
      <FormField
        control={control}
        name="shortDescription"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel
              htmlFor="shortDescription"
              className="text-lg font-semibold"
            >
              {t('shortDescription')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                id="shortDescription"
                maxLength={200}
                placeholder={t('shortDescriptionPlaceholder')}
                value={String(field.value ?? '')}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                aria-invalid={!!fieldState.error}
                className="bg-card w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* LONG DESCRIPTION */}
      <FormField
        control={control}
        name="longDescription"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel
              htmlFor="longDescription"
              className="text-lg font-semibold"
            >
              {t('longDescription')}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                id="longDescription"
                maxLength={2000}
                placeholder={t('longDescriptionPlaceholder')}
                value={String(field.value ?? '')}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                aria-invalid={!!fieldState.error}
                className="bg-card w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
