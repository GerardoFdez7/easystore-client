import React, { useState, useCallback } from 'react';
import { Button } from '@shadcn/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@shadcn/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shadcn/ui/tooltip';
import { Check, ChevronsUpDown, FunnelX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCategoryCombobox } from '@hooks/domains/category';
import { cn } from 'utils';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';

type MultiSelectComboboxCategoryProps = {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function MultiSelectComboboxCategory({
  value = [],
  onValueChange,
  className,
  disabled,
  placeholder,
}: MultiSelectComboboxCategoryProps) {
  const t = useTranslations('Products');
  const [open, setOpen] = useState(false);

  const { options, updateSearchTerm, isLoadingMore, hasMore, loadMore } =
    useCategoryCombobox();

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      void loadMore();
    }
  };

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const newValue = value.includes(selectedValue)
        ? value.filter((v) => v !== selectedValue)
        : [...value, selectedValue];
      onValueChange?.(newValue);
    },
    [value, onValueChange],
  );

  const handleClear = useCallback(() => {
    onValueChange?.([]);
  }, [onValueChange]);

  return (
    <div className={cn('flex items-center', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'w-full justify-between text-left font-normal sm:w-auto',
              !value.length && 'text-muted-foreground',
            )}
            disabled={disabled}
          >
            {value.length === 0
              ? placeholder || t('selectCategories')
              : `${value.length} ${value.length === 1 ? t('category') : t('categories')} ${t('selected')}`}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={t('search')}
              onValueChange={updateSearchTerm}
            />
            <CommandList>
              <CommandEmpty>{t('noCategoryFound')}</CommandEmpty>
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
                        value.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              {hasMore && (
                <LoadMoreButton
                  onClick={handleLoadMore}
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

      {/* Clear Filters Button */}
      {value.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleClear}
                disabled={disabled}
              >
                <FunnelX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('clearFilters')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
