'use client';

import React from 'react';
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
import LoadMoreButton from '@atoms/shared/LoadMoreButton';

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
  // Load More functionality
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  loadMoreText?: string;
  loadingText?: string;
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
  width,
  serverSide = false,
  onSearchChange,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
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

  const triggerWidth = width
    ? typeof width === 'number'
      ? `${width}px`
      : width
    : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-fit justify-between',
            !selectedOption && 'text-muted-foreground',
            className,
          )}
          style={triggerWidth ? { width: triggerWidth } : undefined}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={triggerWidth ? { width: triggerWidth } : undefined}
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
                      'h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {hasMore && onLoadMore && (
              <LoadMoreButton
                onClick={onLoadMore}
                isLoading={isLoadingMore}
                size="sm"
                iconSize="sm"
                containerClassName="p-2"
                className="text-xs"
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Combobox.displayName = 'Combobox';

export { Combobox };
