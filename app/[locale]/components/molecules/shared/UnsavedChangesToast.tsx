import { Button } from '@shadcn/ui/button';
import SpinLoader from '@atoms/shared/SpinLoader';
import { cn } from '@lib/utils/cn';

interface UnsavedChangesToastProps {
  message: string;
  saveLabel: string;
  cancelLabel: string;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  className?: string;
}

/**
 * Bar shown while a page has pending edits. Render it through
 * `useUnsavedChangesToast`, which pins it to the top of the screen.
 */
export default function UnsavedChangesToast({
  message,
  saveLabel,
  cancelLabel,
  onSave,
  onCancel,
  isSaving = false,
  className,
}: UnsavedChangesToastProps) {
  return (
    <div
      data-slot="unsaved-changes-toast"
      role="status"
      aria-live="polite"
      className={cn(
        'bg-card text-card-foreground border-border gap-card pointer-events-auto flex w-full items-center justify-between rounded-xl border p-4 shadow-sm',
        className,
      )}
    >
      <p className="text-title text-base leading-snug font-semibold">
        {message}
      </p>
      <div className="gap-control flex shrink-0 items-center">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onCancel}
          disabled={isSaving}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant="title"
          size="lg"
          onClick={onSave}
          disabled={isSaving}
          aria-busy={isSaving}
          className="relative disabled:opacity-100"
        >
          <span className={cn(isSaving && 'opacity-0')}>{saveLabel}</span>
          {isSaving && (
            <SpinLoader
              size="sm"
              variant="inverse"
              className="absolute inset-0 min-h-0"
            />
          )}
        </Button>
      </div>
    </div>
  );
}
