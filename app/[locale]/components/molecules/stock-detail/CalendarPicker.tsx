'use client';

import * as React from 'react';
import { parseDate } from 'chrono-node';
import { CalendarIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from '@shadcn/ui/button';
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
  buttonClassName?: string;
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
  buttonClassName,
  disablePast = false,
}: Props) {
  const locale = useLocale();
  const dayPickerLocale = locale.startsWith('es') ? dfEs : dfEnUS;
  const startYear = 2025;
  const endYear = new Date().getFullYear() + 10;

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState<string>(
    formatDateByLocale(value, locale),
  );
  const [month, setMonth] = React.useState<Date | undefined>(
    value ?? undefined,
  );

  React.useEffect(() => {
    setText(formatDateByLocale(value, locale));
    if (value && value.getFullYear() < startYear) {
      setMonth(new Date(startYear, 0, 1));
    } else {
      setMonth(value ?? undefined);
    }
  }, [value, locale]);

  return (
    <div className={className}>
      <div className="relative flex gap-2">
        <Input
          id={id}
          disabled={disabled}
          value={text}
          placeholder={placeholder}
          className={`bg-background pr-10 ${inputClassName ?? ''}`}
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
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className={`absolute top-1/2 right-2 size-6 -translate-y-1/2 ${buttonClassName ?? ''}`}
              disabled={disabled}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={value ?? undefined}
              captionLayout="dropdown"
              fromYear={startYear}
              fromDate={new Date(startYear, 0, 1)}
              toYear={endYear}
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
              className="**:data-[selected-single=true]:bg-title! **:data-[selected-single=true]:text-accent!"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
