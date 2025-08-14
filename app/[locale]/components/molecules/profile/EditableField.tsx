'use client';

import { useEffect, useRef, useState } from 'react';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Edit2, Save as SaveIcon, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

type Chip = { label: string; tone?: 'success' | 'neutral' };

export function EditableField({
  label,
  value,
  statusChip,
  iconEditable = false,
  actionLabel,
  onAction,
  onSave,
  saveLabel = 'Save',
}: {
  label: string;
  value: string;
  statusChip?: Chip;
  iconEditable?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onSave?: (nextValue: string) => void;
  saveLabel?: string;
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
    onSave?.(currentValue);
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
    <div className="mb-6 w-full">
      <div className="mb-2 flex items-center gap-2">
        <Label className="text-sm font-medium text-[#374151]">{label}</Label>
        {statusChip && (
          <span
            className={clsx(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs',
              statusChip.tone === 'success'
                ? 'text-secondary bg-emerald-50'
                : 'bg-gray-100 text-gray-700',
            )}
          >
            {statusChip.tone === 'success' && (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            {statusChip.label}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={currentValue}
          readOnly={!isEditing}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCurrentValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="h-10 rounded-md border-gray-200 bg-white text-sm shadow-sm"
        />

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
  );
}
