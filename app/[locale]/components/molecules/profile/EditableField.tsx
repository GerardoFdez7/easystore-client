'use client';

import { useEffect, useRef, useState } from 'react';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Edit2, Save as SaveIcon, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@lib/utils/cn';

type Chip = { label: string; tone?: 'success' | 'neutral' | 'denied' };

export function EditableField({
  label,
  value,
  statusChip,
  iconEditable = false,
  actionLabel,
  onAction,
  onSave,
  saveLabel = 'Save',
  placeholder,
  className,
}: {
  label?: string;
  value: string;
  statusChip?: Chip;
  iconEditable?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onSave?: (nextValue: string) => void | Promise<unknown>;
  saveLabel?: string;
  placeholder?: string;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setCurrentValue(value), [value]);

  const startEditing = () => {
    setIsEditing(true);
    onAction?.();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const save = () => {
    setIsEditing(false);
    void onSave?.(currentValue);
  };

  const cancel = () => {
    setIsEditing(false);
    setCurrentValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <div className={cn('mb-6 w-full', className)}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-title font-bold">{label}</Label>

          {statusChip && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
                statusChip.tone === 'success' &&
                  'text-secondary bg-emerald-50 dark:bg-emerald-900',
                statusChip.tone === 'denied' &&
                  'text-error bg-red-50 dark:bg-red-900 dark:text-red-300',
                (!statusChip.tone || statusChip.tone === 'neutral') &&
                  'text-title bg-gray-100',
              )}
            >
              {statusChip.tone === 'success' && (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              {statusChip.tone === 'denied' && (
                <XCircle className="h-3.5 w-3.5" />
              )}
              {statusChip.label}
            </span>
          )}
        </div>

        {/* Mobile: Show button next to label */}
        <div className="flex md:hidden">
          {actionLabel ? (
            isEditing ? (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2 underline-offset-2 hover:underline"
                onClick={save}
              >
                {saveLabel}
              </Button>
            ) : (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2 underline-offset-2 hover:underline"
                onClick={startEditing}
              >
                {actionLabel}
              </Button>
            )
          ) : (
            iconEditable && (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2"
                onClick={isEditing ? save : startEditing}
                aria-label={isEditing ? 'Save' : 'Edit'}
              >
                {isEditing ? (
                  <SaveIcon className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            )
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={inputRef}
          value={currentValue}
          readOnly={!isEditing}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'h-10 min-w-0 flex-1 rounded-md border-gray-200 bg-white shadow-sm',
            className,
          )}
        />

        {/* Desktop: Show button next to input */}
        <div className="hidden w-auto md:flex">
          {actionLabel ? (
            isEditing ? (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2 underline-offset-2 hover:underline"
                onClick={save}
              >
                {saveLabel}
              </Button>
            ) : (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2 underline-offset-2 hover:underline"
                onClick={startEditing}
              >
                {actionLabel}
              </Button>
            )
          ) : (
            iconEditable && (
              <Button
                type="button"
                variant="link"
                className="text-secondary h-9 px-2"
                onClick={isEditing ? save : startEditing}
                aria-label={isEditing ? 'Save' : 'Edit'}
              >
                {isEditing ? (
                  <SaveIcon className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
