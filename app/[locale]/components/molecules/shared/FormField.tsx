'use client';

import React from 'react';
import { cn } from '@lib/utils/cn';
import { Field, Label, Control } from '@radix-ui/react-form';
import Input from '@atoms/shared/Input';

export interface FormFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}) => (
  <Field className="flex flex-col" name={name}>
    <div className="mb-1 flex items-baseline justify-between">
      <Label asChild>
        <label
          htmlFor={name}
          className="text-text text-lg font-medium text-gray-700"
        >
          {label}
        </label>
      </Label>
    </div>

    <Control asChild>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={cn('mb-2')}
      />
    </Control>
  </Field>
);
