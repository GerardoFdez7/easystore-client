/* components/atoms/shared/InputCn.tsx */
'use client';

import React from 'react';
import { cn } from '@lib/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
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
          'tex-[16px] text-foreground focus:ring-primary border-primary h-[56px] w-full rounded-lg border-1 bg-transparent p-3 px-4 py-2 text-base placeholder-gray-400 2xl:text-xl',
          'focus:border-primary focus:ring-2 focus:outline-none',
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
