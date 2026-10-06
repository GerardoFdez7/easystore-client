'use client';

import { useId } from 'react';
import { Label } from '@shadcn/ui/label';
import { Badge } from '@shadcn/ui/badge';
import { Input } from '@shadcn/ui/input';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@lib/utils/cn';

type Chip = { label: string; tone?: 'success' | 'neutral' | 'denied' };

const chipVariant = {
  success: 'secondary',
  denied: 'destructive',
  neutral: 'outline',
} as const;

/**
 * A labeled text field. Controlled when `onChange` is provided; otherwise it is
 * read-only. Saving is handled by the page, not by the field.
 */
export function EditableField({
  id,
  label,
  value,
  onChange,
  statusChip,
  placeholder,
  className,
  inputClassName,
}: {
  id?: string;
  label?: string;
  value: string;
  onChange?: (nextValue: string) => void;
  statusChip?: Chip;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const chipTone = statusChip?.tone ?? 'neutral';

  return (
    <div className={cn('gap-control flex w-full flex-col', className)}>
      {(label || statusChip) && (
        <div className="gap-control flex flex-wrap items-center">
          {label && (
            <Label htmlFor={inputId} className="text-title">
              {label}
            </Label>
          )}
          {statusChip && (
            <Badge variant={chipVariant[chipTone]}>
              {chipTone === 'success' && <CheckCircle2 />}
              {chipTone === 'denied' && <XCircle />}
              {statusChip.label}
            </Badge>
          )}
        </div>
      )}

      <Input
        id={inputId}
        value={value}
        readOnly={!onChange}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
        className={cn(
          'read-only:bg-muted/50 read-only:shadow-none',
          inputClassName,
        )}
      />
    </div>
  );
}
