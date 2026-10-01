'use client';

import { useEffect, useRef, useState } from 'react';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Edit2, Save as SaveIcon, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@lib/utils/cn';

type Chip = { label: string; tone?: 'success' | 'neutral' | 'denied' };

interface EditActionProps {
  actionLabel?: string;
  iconEditable: boolean;
  isEditing: boolean;
  saveLabel: string;
  onEdit: () => void;
  onSave: () => void;
}

function EditAction({
  actionLabel,
  iconEditable,
  isEditing,
  saveLabel,
  onEdit,
  onSave,
}: EditActionProps) {
  if (actionLabel) {
    return (
      <Button
        type="button"
        variant="link"
        className="text-secondary h-9 px-2 underline-offset-2 hover:underline"
        onClick={isEditing ? onSave : onEdit}
      >
        {isEditing ? saveLabel : actionLabel}
      </Button>
    );
  }

  if (!iconEditable) return null;

  const ActionIcon = isEditing ? SaveIcon : Edit2;

  return (
    <Button
      type="button"
      variant="link"
      className="text-secondary h-9 px-2"
      onClick={isEditing ? onSave : onEdit}
      aria-label={isEditing ? 'Save' : 'Edit'}
    >
      <ActionIcon className="h-4 w-4" />
    </Button>
  );
}

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

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

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
                  'text-secondary bg-secondary/10 dark:bg-secondary/20',
                statusChip.tone === 'denied' &&
                  'text-error bg-error/10 dark:bg-error/20 dark:text-error',
                (!statusChip.tone || statusChip.tone === 'neutral') &&
                  'text-title bg-accent',
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
          <EditAction
            actionLabel={actionLabel}
            iconEditable={iconEditable}
            isEditing={isEditing}
            saveLabel={saveLabel}
            onEdit={startEditing}
            onSave={save}
          />
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
            'border-border h-10 min-w-0 flex-1 rounded-md bg-white shadow-sm',
            className,
          )}
        />

        {/* Desktop: Show button next to input */}
        <div className="hidden w-auto md:flex">
          <EditAction
            actionLabel={actionLabel}
            iconEditable={iconEditable}
            isEditing={isEditing}
            saveLabel={saveLabel}
            onEdit={startEditing}
            onSave={save}
          />
        </div>
      </div>
    </div>
  );
}
