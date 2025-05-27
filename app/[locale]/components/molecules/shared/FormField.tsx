'use client';

import React from 'react';
import { cn } from '@lib/utils/cn';
import { Field, Label, Control, Message } from '@radix-ui/react-form';
import Input from '@components/atoms/shared/Input';

export interface FormFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  requiredMessage?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  requiredMessage,
  value,
  onChange,
}) => (
  <Field className="flex flex-col" name={name}>
    <div className="mb-1 flex items-baseline justify-between">
      <Label asChild>
        <label htmlFor={name} className="text-text font-medium text-gray-700">
          {label}
        </label>
      </Label>

      <Message className="text-destructive text-sm" match="valueMissing">
        {requiredMessage ?? `El campo ${label} es obligatorio`}
      </Message>
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
