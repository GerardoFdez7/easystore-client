/* components/atoms/shared/InputCn.tsx */
'use client';

import React from 'react';
import { cn } from 'app/[locale]/lib/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Texto de la etiqueta opcional */
  label?: string;
  /** Mensaje de error opcional */
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base placeholder-gray-400',
          'focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-destructive focus:ring-destructive' : '',
        )}
        {...props}
      />
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
