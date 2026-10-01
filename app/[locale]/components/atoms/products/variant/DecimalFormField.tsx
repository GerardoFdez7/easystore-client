'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import {
  handleDecimalInputBlur,
  handleDecimalInputChange,
} from '@lib/utils/input-formatters';

export interface DecimalFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  itemClassName?: string;
  labelClassName?: string;
  suffix?: React.ReactNode;
}

export default function DecimalFormField({
  name,
  label,
  placeholder,
  type,
  itemClassName,
  labelClassName = 'text-base font-normal',
  suffix,
}: DecimalFormFieldProps) {
  const { control } = useFormContext();

  const input = (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const decimalInput = (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            value={field.value || ''}
            aria-invalid={!!fieldState.error}
            onChange={(event) => {
              handleDecimalInputChange(event.target.value, field.onChange);
            }}
            onBlur={(event) => {
              handleDecimalInputBlur(event.target.value, field.onChange);
              field.onBlur();
            }}
          />
        );

        return (
          <FormItem className={itemClassName}>
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
            <FormControl>
              {suffix ? (
                <div className="relative">
                  {suffix}
                  {decimalInput}
                </div>
              ) : (
                decimalInput
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  return input;
}
