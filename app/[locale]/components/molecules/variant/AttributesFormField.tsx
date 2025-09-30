'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
import type { Attribute } from '@lib/types/variant';
import { useTranslations } from 'next-intl';

export default function AttributesCard() {
  const { control, watch, setValue } = useFormContext();
  const attributes: Attribute[] = watch('attributes') || [];
  const t = useTranslations('Variant');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const addAttribute = () => {
    if (newKey.trim() && newValue.trim()) {
      const newAttribute: Attribute = {
        key: newKey.trim(),
        value: newValue.trim(),
      };
      setValue('attributes', [...attributes, newAttribute]);
      setNewKey('');
      setNewValue('');
    }
  };

  const updateAttribute = (
    index: number,
    field: 'key' | 'value',
    val: string,
  ) => {
    const updatedAttributes = attributes.map((a, i) =>
      i === index ? { ...a, [field]: val } : a,
    );
    setValue('attributes', updatedAttributes);
  };

  const deleteAttribute = (index: number) => {
    const filteredAttributes = attributes.filter((_, i) => i !== index);
    setValue('attributes', filteredAttributes);
  };

  const moveAttribute = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= attributes.length) return;
    const copy = [...attributes];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setValue('attributes', copy);
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
                      required={true}
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
                      required={true}
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
                    onClick={addAttribute}
                    disabled={!newKey.trim() || !newValue.trim()}
                  >
                    <Plus className="h-4 w-4" /> {t('addAttribute')}
                  </Button>
                </div>
              </div>

              {/* Display existing attributes */}
              {attributes.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {attributes.map((attribute, index) => (
                      <ArrayItemBox
                        key={index}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < attributes.length - 1}
                        onMoveUp={() => moveAttribute(index, 'up')}
                        onMoveDown={() => moveAttribute(index, 'down')}
                        onDelete={() => deleteAttribute(index)}
                        t={t}
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FormLabel className="text-xs">
                              {t('attributeKey')}
                            </FormLabel>
                            <Input
                              placeholder={t('attributeKeyPlaceholder')}
                              value={attribute.key}
                              onChange={(e) =>
                                updateAttribute(index, 'key', e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">
                              {t('attributeValue')}
                            </FormLabel>
                            <Input
                              placeholder={t('attributeValuePlaceholder')}
                              value={attribute.value}
                              onChange={(e) =>
                                updateAttribute(index, 'value', e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </ArrayItemBox>
                    ))}
                  </div>
                </div>
              )}

              {attributes.length === 0 && (
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
