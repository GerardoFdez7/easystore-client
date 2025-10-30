'use client';

import { useState, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';

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
  addPlaceholder,
}: Props) {
  const t = useTranslations('StockDetail');
  const [draft, setDraft] = useState('');
  const computedPlaceholder = addPlaceholder ?? t('serialAddPlaceholder');

  const removeAt = (idx: number) => {
    if (!onChange || disabled) return;
    const next = serials.filter((_, i) => i !== idx);
    onChange(next);
  };

  const addSerial = (value: string) => {
    if (!onChange || disabled) return;
    const sn = value.trim();
    if (!sn) return;

    if (!/^\d+$/.test(sn)) {
      setDraft('');
      return;
    }

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
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
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
                    aria-label={t('removeSerialAria', { sn })}
                    title={t('remove')}
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

        {onChange && (
          <input
            type="text"
            className="bg-background ring-offset-background focus-visible:ring-ring h-8 rounded-md border px-2 text-sm outline-none focus-visible:ring-2 disabled:opacity-50"
            placeholder={computedPlaceholder}
            value={draft}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D+/g, '');
              setDraft(onlyDigits);
            }}
            onKeyDown={onKeyDown}
            onBlur={() => addSerial(draft)}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}
