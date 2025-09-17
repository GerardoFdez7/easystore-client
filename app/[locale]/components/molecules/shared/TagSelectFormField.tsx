'use client';

import React from 'react';
import { Button } from '@shadcn/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Trash2 } from 'lucide-react';

interface TagSelectFormFieldProps<T> {
  name: string;
  label: string;
  placeholder: string;
  emptyStateText: string;
  deleteAriaLabel?: string;
  availableOptions: T[];
  getOptionId: (option: T) => string;
  getOptionLabel: (option: T) => string;
  containerClassName?: string;
  tagClassName?: string;
}

export default function TagSelectFormField<T>({
  name,
  label,
  placeholder,
  emptyStateText,
  deleteAriaLabel = 'Delete',
  availableOptions,
  getOptionId,
  getOptionLabel,
  containerClassName = 'space-y-3',
  tagClassName = 'bg-muted/50 flex items-center gap-1 rounded-md border px-3 py-1',
}: TagSelectFormFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedItems: T[] = field.value || [];

        const addItem = (optionId: string) => {
          if (
            optionId &&
            !selectedItems.find((item) => getOptionId(item) === optionId)
          ) {
            const selectedOption = availableOptions.find(
              (option) => getOptionId(option) === optionId,
            );
            if (selectedOption) {
              field.onChange([...selectedItems, selectedOption]);
            }
          }
        };

        const removeItem = (index: number) => {
          const newItems = selectedItems.filter((_, i) => i !== index);
          field.onChange(newItems);
        };

        return (
          <FormItem>
            <FormLabel className="text-lg font-semibold">{label}</FormLabel>
            <FormControl>
              <div className={containerClassName}>
                {/* Select Dropdown */}
                <Select value="" onValueChange={addItem}>
                  <SelectTrigger className="bg-card w-full">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableOptions
                        .filter(
                          (option) =>
                            !selectedItems.find(
                              (selected) =>
                                getOptionId(selected) === getOptionId(option),
                            ),
                        )
                        .map((option) => (
                          <SelectItem
                            key={getOptionId(option)}
                            value={getOptionId(option)}
                          >
                            {getOptionLabel(option)}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Empty State */}
                {selectedItems.length === 0 && (
                  <p className="text-muted-foreground text-xs">
                    {emptyStateText}
                  </p>
                )}

                {/* Selected Items Display */}
                {selectedItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map((item, index) => (
                      <div key={getOptionId(item)} className={tagClassName}>
                        <span className="text-sm">{getOptionLabel(item)}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-error hover:bg-hover h-5 w-5 hover:text-red-700"
                          onClick={() => removeItem(index)}
                          aria-label={`${deleteAriaLabel} ${getOptionLabel(item)}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
