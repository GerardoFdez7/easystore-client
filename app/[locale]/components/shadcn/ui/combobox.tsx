'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from 'utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  className?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  width?: string | number;
  serverSide?: boolean;
  onSearchChange?: (search: string) => void;
}

function Combobox({
  options = [],
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  className,
  disabled = false,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  width = 200,
  serverSide = false,
  onSearchChange,
}: ComboboxProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      const newValue = selectedValue === value ? '' : selectedValue;
      onValueChange?.(newValue);
      setOpen(false);
      if (serverSide) setSearch('');
    },
    [value, onValueChange, setOpen, serverSide],
  );

  const triggerWidth = typeof width === 'number' ? `${width}px` : width;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'justify-between',
            !selectedOption && 'text-muted-foreground',
            className,
          )}
          style={{ width: triggerWidth }}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: triggerWidth }}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <Command shouldFilter={!serverSide}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={serverSide ? search : undefined}
            onValueChange={
              serverSide
                ? (v) => {
                    setSearch(v);
                    onSearchChange?.(v);
                  }
                : undefined
            }
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  disabled={option.disabled}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Combobox.displayName = 'Combobox';

export { Combobox };
