'use client';

import React, { useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

interface TagInputFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  addButtonText: string;
  emptyStateText: string;
  deleteAriaLabel?: string;
  inputClassName?: string;
  tagClassName?: string;
  containerClassName?: string;
}

export default function TagInputFormField({
  name,
  label,
  placeholder,
  addButtonText,
  emptyStateText,
  deleteAriaLabel = 'Delete',
  inputClassName = 'sm:w-60',
  tagClassName = 'bg-muted/50 flex items-center gap-1 rounded-md border px-3 py-1',
  containerClassName = 'space-y-3',
}: TagInputFormFieldProps) {
  const { control } = useFormContext();
  const [newTag, setNewTag] = useState('');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const tags = field.value || [];

        const addTag = () => {
          if (newTag.trim()) {
            field.onChange([...tags, newTag.trim()]);
            setNewTag('');
          }
        };

        const deleteTag = (index: number) => {
          const newTags = tags.filter((_: string, i: number) => i !== index);
          field.onChange(newTags);
        };

        return (
          <FormItem>
            <FormLabel htmlFor={name} className="text-lg font-semibold">
              {label}
            </FormLabel>
            <FormControl>
              <div className={containerClassName}>
                {/* Input and Add Button */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <Input
                    id={name}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder={placeholder}
                    className={inputClassName}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    disabled={!newTag.trim()}
                  >
                    <Plus className="h-4 w-4" />
                    {addButtonText}
                  </Button>
                </div>

                {/* Tags Display */}
                {tags.length === 0 && (
                  <p className="text-muted-foreground text-xs">
                    {emptyStateText}
                  </p>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((val: string, i: number) => (
                      <div key={i} className={tagClassName}>
                        <span className="text-sm">{val}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-error hover:bg-hover h-5 w-5 hover:text-red-700"
                          onClick={() => deleteTag(i)}
                          aria-label={deleteAriaLabel}
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
