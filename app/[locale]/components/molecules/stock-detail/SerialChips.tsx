'use client';

import { useState, KeyboardEvent } from 'react';

type Props = {
  serials: string[];
  emptyText?: string;
  onChange?: (next: string[]) => void;
  disabled?: boolean;
  allowDuplicates?: boolean;
  addPlaceholder?: string;
};

export default function SerialChips({
  serials,
  emptyText = '—',
  onChange,
  disabled = false,
  allowDuplicates = false,
  addPlaceholder = 'Agregar serial y Enter…',
}: Props) {
  const [draft, setDraft] = useState('');

  const removeAt = (idx: number) => {
    if (!onChange || disabled) return;
    const next = serials.filter((_, i) => i !== idx);
    onChange(next);
  };

  const addSerial = (value: string) => {
    if (!onChange || disabled) return;
    const sn = value.trim();
    if (!sn) return;

    if (
      !allowDuplicates &&
      serials.some((s) => s.trim().toLowerCase() === sn.toLowerCase())
    ) {
      setDraft('');
      return;
    }
    onChange([...serials, sn]);
    setDraft('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSerial(draft);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {serials?.length ? (
        serials.map((sn, i) =>
          sn ? (
            <span
              key={`${sn}-${i}`}
              className="bg-foreground text-accent inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
            >
              <span className="select-all">{sn}</span>
              {onChange && !disabled && (
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="rounded-full px-1 leading-none transition hover:opacity-75"
                  aria-label={`Eliminar serial ${sn}`}
                  title="Eliminar"
                >
                  ×
                </button>
              )}
            </span>
          ) : null,
        )
      ) : (
        <span className="text-muted-foreground text-sm">{emptyText}</span>
      )}

      {/* Input para agregar seriales solo si hay onChange */}
      {onChange && (
        <input
          type="text"
          className="bg-background ring-offset-background focus-visible:ring-ring h-8 rounded-md border px-2 text-sm outline-none focus-visible:ring-2 disabled:opacity-50"
          placeholder={addPlaceholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addSerial(draft)}
          disabled={disabled}
        />
      )}
    </div>
  );
}
