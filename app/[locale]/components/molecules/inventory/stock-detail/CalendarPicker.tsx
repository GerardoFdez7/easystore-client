'use client';

import { useState, useEffect } from 'react';
import { parseDate } from 'chrono-node';
import { CalendarIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Calendar } from '@shadcn/ui/calendar';
import { Input } from '@shadcn/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/ui/popover';
import { es as dfEs, enUS as dfEnUS } from 'date-fns/locale';

type Props = {
  id?: string;
  value: Date | null | undefined;
  onChange: (d: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  disablePast?: boolean;
};

function formatDateByLocale(date?: Date | null, locale: string = 'es') {
  if (!date) return '';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function CalendarPicker({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  inputClassName,
  disablePast = false,
}: Props) {
  const locale = useLocale();
  const dayPickerLocale = locale.startsWith('es') ? dfEs : dfEnUS;
  const startYear = new Date().getFullYear();
  const endYear = new Date().getFullYear() + 10;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>(formatDateByLocale(value, locale));
  const [month, setMonth] = useState<Date | undefined>(value ?? undefined);

  useEffect(() => {
    setText(formatDateByLocale(value, locale));
    if (value && value.getFullYear() < startYear) {
      setMonth(new Date(startYear, 0, 1));
    } else {
      setMonth(value ?? undefined);
    }
  }, [value, locale, startYear]);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Input
              id={id}
              disabled={disabled}
              value={text}
              placeholder={placeholder}
              className={`bg-background cursor-pointer pr-10 ${inputClassName ?? ''}`}
              onChange={(e) => {
                const v = e.target.value;
                setText(v);
                const parsed = parseDate(v) || null;
                if (parsed && parsed.getFullYear() >= startYear) {
                  onChange(parsed);
                  setMonth(parsed);
                }
              }}
              onBlur={() => {
                if (!text) onChange(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
              readOnly
            />
            <CalendarIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="overflow-hidden p-0" align="center">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            captionLayout="dropdown"
            startMonth={new Date(startYear, 0, 1)}
            endMonth={new Date(endYear, 11, 31)}
            month={month}
            onMonthChange={setMonth}
            locale={dayPickerLocale}
            disabled={
              disablePast
                ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0))
                : undefined
            }
            onSelect={(d) => {
              onChange(d ?? null);
              setText(formatDateByLocale(d, locale));
              setOpen(false);
            }}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
