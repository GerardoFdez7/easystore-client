'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import UnsavedChangesToast from '@molecules/shared/UnsavedChangesToast';

interface UseUnsavedChangesToastOptions {
  /** Whether there are pending changes. The toast is shown while true. */
  isDirty: boolean;
  message: string;
  saveLabel: string;
  cancelLabel: string;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  /** Distinguishes toasts when several pages could show one. */
  id?: string;
}

/**
 * Shows a persistent Save / Cancel toast at the top of the screen while
 * `isDirty` is true, and removes it when the changes are saved or discarded
 * (or the component unmounts).
 */
export function useUnsavedChangesToast({
  isDirty,
  message,
  saveLabel,
  cancelLabel,
  onSave,
  onCancel,
  isSaving = false,
  id = 'unsaved-changes',
}: UseUnsavedChangesToastOptions) {
  // Always call the latest handlers without re-creating the toast.
  const handlersRef = useRef({ onSave, onCancel });
  useEffect(() => {
    handlersRef.current = { onSave, onCancel };
  }, [onSave, onCancel]);

  useEffect(() => {
    if (!isDirty) {
      toast.dismiss(id);
      return;
    }
    toast.custom(
      () => (
        <UnsavedChangesToast
          message={message}
          saveLabel={saveLabel}
          cancelLabel={cancelLabel}
          isSaving={isSaving}
          onSave={() => handlersRef.current.onSave()}
          onCancel={() => handlersRef.current.onCancel()}
        />
      ),
      { id, duration: Infinity, position: 'top-center' },
    );
  }, [isDirty, message, saveLabel, cancelLabel, isSaving, id]);

  useEffect(() => () => void toast.dismiss(id), [id]);
}
