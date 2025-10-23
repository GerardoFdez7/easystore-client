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
import {
  handleDecimalInputChange,
  handleDecimalInputBlur,
} from '@lib/utils/input-formatters';

export default function WeightFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section>
      <FormField
        control={control}
        name="weight"
        render={({ field, fieldState }) => (
          <FormItem className="sm:mx-auto sm:w-1/2">
            <FormLabel htmlFor="weight" className="text-lg font-semibold">
              {t('weight')}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="text-foreground pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2">
                  kg
                </span>
                <Input
                  {...field}
                  id="weight"
                  placeholder="2"
                  value={field.value || ''}
                  aria-invalid={!!fieldState.error}
                  onChange={(e) => {
                    handleDecimalInputChange(e.target.value, field.onChange);
                  }}
                  onBlur={(e) => {
                    handleDecimalInputBlur(e.target.value, field.onChange);
                    field.onBlur();
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
