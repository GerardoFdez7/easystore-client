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

const fields = ['sku', 'barcode', 'upc', 'ean', 'isbn'] as const;

export default function CodesListFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Variant');

  return (
    <section>
      <FormLabel htmlFor="codes" className="text-lg font-semibold">
        {t('codes')}
      </FormLabel>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field, index) => (
          <FormField
            key={field}
            control={control}
            name={`codes.${field}`}
            render={({ field: formField, fieldState }) => (
              <FormItem
                className={`${
                  index === fields.length - 1 && fields.length % 2 !== 0
                    ? 'sm:col-span-2 sm:mx-auto sm:w-1/2'
                    : ''
                }`}
              >
                <FormLabel htmlFor={field} className="text-md font-normal">
                  {t(field)}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    id={field}
                    name={field}
                    placeholder={t(`${field}Placeholder`)}
                    value={formField.value || ''}
                    onChange={(e) => {
                      if (['barcode', 'upc', 'ean'].includes(field)) {
                        const value = e.target.value;
                        const re = /^[0-9\b]+$/;
                        if (value === '' || re.test(value)) {
                          formField.onChange(value);
                        }
                      } else {
                        formField.onChange(e.target.value);
                      }
                    }}
                    aria-invalid={!!fieldState.error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </section>
  );
}
