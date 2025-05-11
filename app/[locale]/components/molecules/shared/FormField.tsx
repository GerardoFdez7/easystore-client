'use client';

import React from 'react';
import { cn } from 'app/[locale]/lib/utils/cn';
import { Form } from '@components/atoms/shared/Form';
import Input from '@components/atoms/shared/Input';

export interface FormFieldProps {
  label: string;
  name: string;
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
}) => (
  <Form.Field className="flex flex-col" name={name}>
    <div className="mb-1 flex items-baseline justify-between">
      <Form.Label asChild>
        <label htmlFor={name} className="text-text font-medium text-gray-700">
          {label}
        </label>
      </Form.Label>

      <Form.Message className="text-destructive text-sm" match="valueMissing">
        {requiredMessage ?? `El campo ${label} es obligatorio`}
      </Form.Message>
    </div>

    <Form.Control asChild>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className={cn('mb-2')}
      />
    </Form.Control>
  </Form.Field>
);
