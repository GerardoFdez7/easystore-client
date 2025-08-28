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

export default function DimensionsRowFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Variant');

  return (
    <section>
      <FormLabel className="text-lg font-semibold">{t('dimension')}</FormLabel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField
          control={control}
          name="dimensions.height"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                htmlFor="dimensions.height"
                className="text-md font-normal"
              >
                {t('height')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="dimensions.height"
                  placeholder={t('heightPlaceholder')}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dimensions.width"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                htmlFor="dimensions.width"
                className="text-md font-normal"
              >
                {t('width')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="dimensions.width"
                  type="number"
                  placeholder={t('widthPlaceholder')}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dimensions.length"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                htmlFor="dimensions.length"
                className="text-md font-normal"
              >
                {t('length')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="dimensions.length"
                  type="number"
                  placeholder={t('lengthPlaceholder')}
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
