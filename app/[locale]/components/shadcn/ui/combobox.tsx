'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shadcn/ui/command';
import { cn } from '@lib/utils/cn';

type Item = { label: string; value: string };

type ComboboxProps = {
  items: Item[];
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
};

export function Combobox({
  items,
  value,
  onValueChange,
  placeholder = 'Select an option',
  emptyMessage = 'No results.',
  className,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const selected = items.find((i) => i.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled} aria-label={placeholder}>
        <button
          type="button"
          className={cn(
            'flex h-12 w-full items-center justify-between rounded-md border bg-transparent px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none',
            'border-primary/60 hover:border-primary focus-visible:border-primary focus-visible:ring-primary/35 focus-visible:ring-[3px]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          <span
            className={cn(
              'line-clamp-1 text-left',
              !selected && 'text-muted-foreground',
            )}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            className="pointer-events-none size-4 opacity-70"
            aria-hidden
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[--radix-popover-trigger-width] p-0"
      >
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={`${item.label} ${item.value}`}
                  onSelect={() => {
                    onValueChange?.(item.value);
                    setOpen(false);
                  }}
                  className="gap-2"
                >
                  <Check
                    className={cn(
                      'size-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
