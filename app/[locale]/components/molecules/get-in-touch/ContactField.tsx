'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import InputCn from '@atoms/shared/OutsideInput';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@shadcn/ui/select';
import { RadioGroup, RadioGroupItem } from '@shadcn/ui/radio-group';
import { Combobox } from '@shadcn/ui/combobox';
import { COUNTRIES } from '@lib/consts/countries';

export const ContactFields: React.FC = () => {
  const t = useTranslations('GetInTouch');
  const { control } = useFormContext();

  return (
    <>
      {/* Full Name */}
      <FormField
        control={control}
        name="fullName"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t('fullName')}</FormLabel>
            <FormControl>
              <InputCn
                {...field}
                placeholder={t('fullName')}
                aria-invalid={!!fieldState.error}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="businessEmail"
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('businessEmail')}</FormLabel>
              <FormControl>
                <InputCn
                  type="email"
                  {...field}
                  placeholder={t('businessEmail')}
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="businessPhone"
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t('businessPhone')}</FormLabel>
              <FormControl>
                <InputCn
                  type="tel"
                  {...field}
                  placeholder={t('businessPhone')}
                  aria-invalid={!!fieldState.error}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Company */}
      <FormField
        control={control}
        name="company"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t('company')}</FormLabel>
            <FormControl>
              <InputCn
                {...field}
                placeholder={t('company')}
                aria-invalid={!!fieldState.error}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Website */}
      <FormField
        control={control}
        name="websiteUrl"
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t('websiteUrl')}</FormLabel>
            <FormControl>
              <InputCn
                type="url"
                {...field}
                placeholder={t('websiteUrl')}
                aria-invalid={!!fieldState.error}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country & Revenue */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="country"
          rules={{ required: true }}
          render={({ field /*, _fieldState*/ }) => (
            <FormItem>
              <FormLabel>{t('country')}</FormLabel>
              <FormControl>
                <Combobox
                  items={COUNTRIES.map((c) => ({
                    value: c.code,
                    label: c.name,
                  }))}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder={t('country')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Annual Revenue */}
        <FormField
          control={control}
          name="annualRevenue"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('annualRevenue')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue placeholder={t('annualRevenue')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100k">$0 – $100k</SelectItem>
                    <SelectItem value="100k-500k">$100k – $500k</SelectItem>
                    <SelectItem value="500k-1m">$500k – $1M</SelectItem>
                    <SelectItem value="1m+">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Agency? */}
      <FormField
        control={control}
        name="isAgency"
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('isAgency')}</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <label htmlFor="yes">{t('yes')}</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="no" />
                  <label htmlFor="no">{t('no')}</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactFields;
