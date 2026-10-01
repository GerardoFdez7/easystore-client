'use client';

import React, { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import Input from '@atoms/shared/OutsideInput';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/ui/form';

export interface AuthenticationFormFieldProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  revealable?: boolean;
}

export default function AuthenticationFormField({
  name,
  label,
  type,
  revealable = false,
}: AuthenticationFormFieldProps) {
  const { control } = useFormContext();
  const [showValue, setShowValue] = useState(false);
  const inputType = revealable && showValue ? 'text' : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {revealable ? (
              <div className="relative">
                <Input type={inputType} {...field} />
                <button
                  type="button"
                  onClick={() => setShowValue((value) => !value)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 hover:cursor-pointer"
                  aria-label={label}
                  aria-pressed={showValue}
                >
                  {showValue ? (
                    <Eye
                      className="text-secondary h-7 w-7"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeClosed
                      className="text-secondary h-7 w-7"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            ) : (
              <Input type={inputType} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
