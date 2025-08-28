import React from 'react';
import { Button } from '@shadcn/ui/button';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { cn } from '@lib/utils/cn';

interface ArrayItemBoxProps {
  index: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  children: React.ReactNode;
  className?: string;
  t: (key: string) => string;
}

export default function ArrayItemBox({
  index,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onDelete,
  children,
  className,
  t,
}: ArrayItemBoxProps) {
  return (
    <div
      className={cn(
        'border-border bg-card relative rounded-lg border p-4 shadow-sm',
        className,
      )}
    >
      {/* Index number */}
      <div className="bg-title text-primary-foreground absolute -top-3 -left-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
        {index + 1}
      </div>

      {/* Content */}
      <div className="mb-3">{children}</div>

      {/* Controls */}
      <div className="flex justify-end gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          aria-label={t('moveUp') ?? 'Move up'}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          aria-label={t('moveDown') ?? 'Move down'}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-error h-8 w-8 hover:text-red-700"
          onClick={onDelete}
          aria-label={t('delete') ?? 'Delete'}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
