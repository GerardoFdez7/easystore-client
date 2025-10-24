'use client';

import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Plus } from 'lucide-react';
import ArrayItemBox from '@atoms/shared/ArrayItemBox';
import { useTranslations } from 'next-intl';

export default function AttributesCard() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'attributes',
  });
  const t = useTranslations('Variant');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const addAttribute = () => {
    if (newKey.trim() && newValue.trim()) {
      append({
        key: newKey.trim(),
        value: newValue.trim(),
      });
      setNewKey('');
      setNewValue('');
    }
  };

  const moveAttribute = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= fields.length) return;
    move(index, target);
  };

  return (
    <FormField
      control={control}
      name="attributes"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            {t('attributes')}
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              {/* Persistent input fields for adding new attributes */}
              <div className="border-border bg-muted/30 rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <FormLabel htmlFor="attributeKey" className="mb-1">
                      {t('attributeKey')}
                    </FormLabel>
                    <Input
                      id="attributeKey"
                      type="text"
                      placeholder={t('attributeKeyPlaceholder')}
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel className="mb-1">
                      {t('attributeValue')}
                    </FormLabel>
                    <Input
                      placeholder={t('attributeValuePlaceholder')}
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={addAttribute}
                    disabled={!newKey.trim() || !newValue.trim()}
                  >
                    <Plus className="h-4 w-4" /> {t('addAttribute')}
                  </Button>
                </div>
              </div>

              {/* Display existing attributes */}
              {fields.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <ArrayItemBox
                        key={field.id}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < fields.length - 1}
                        onMoveUp={() => moveAttribute(index, 'up')}
                        onMoveDown={() => moveAttribute(index, 'down')}
                        onDelete={() => remove(index)}
                        t={t}
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FormLabel className="text-xs">
                              {t('attributeKey')}
                            </FormLabel>
                            <FormField
                              control={control}
                              name={`attributes.${index}.key`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder={t('attributeKeyPlaceholder')}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">
                              {t('attributeValue')}
                            </FormLabel>
                            <FormField
                              control={control}
                              name={`attributes.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder={t(
                                        'attributeValuePlaceholder',
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </ArrayItemBox>
                    ))}
                  </div>
                </div>
              )}

              {fields.length === 0 && (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  {t('noAttributesYet') ?? 'No attributes yet.'}
                </p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
