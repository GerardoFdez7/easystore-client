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
import { Textarea } from '@shadcn/ui/textarea';
import { Plus } from 'lucide-react';
import ArrayItemBox from '@atoms/shared/ArrayItemBox';
import { useTranslations } from 'next-intl';

export default function WarrantyFormField() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'warranties',
  });
  const t = useTranslations('Variant');
  const [newMonths, setNewMonths] = useState('');
  const [newCoverage, setNewCoverage] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const addWarranty = () => {
    if (newMonths.trim() && newCoverage.trim() && newInstructions.trim()) {
      append({
        months: parseFloat(newMonths.trim()),
        coverage: newCoverage.trim(),
        instructions: newInstructions.trim(),
      });
      setNewMonths('');
      setNewCoverage('');
      setNewInstructions('');
    }
  };

  const moveWarranty = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= fields.length) return;
    move(index, target);
  };

  return (
    <FormField
      control={control}
      name="warranties"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            {t('warranties')}
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              {/* Persistent input fields for adding new warranties */}
              <div className="border-border bg-muted/30 rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <FormLabel
                        htmlFor="warrantyMonths"
                        className="text-md mb-1"
                      >
                        {t('warrantyMonths')}
                      </FormLabel>
                      <Input
                        id="warrantyMonths"
                        inputMode="numeric"
                        className="sm:w-60"
                        placeholder={t('warrantyMonthsPlaceholder')}
                        value={newMonths}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setNewMonths(value);
                        }}
                      />
                    </div>
                    <div className="hidden sm:block">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addWarranty}
                        disabled={
                          !newMonths.trim() ||
                          !newCoverage.trim() ||
                          !newInstructions.trim()
                        }
                      >
                        <Plus className="h-4 w-4" /> {t('addWarranty')}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <FormLabel
                        htmlFor="warrantyCoverage"
                        className="text-md mb-1"
                      >
                        {t('warrantyCoverage')}
                      </FormLabel>
                      <Textarea
                        id="warrantyCoverage"
                        maxLength={1000}
                        placeholder={t('warrantyCoveragePlaceholder')}
                        value={newCoverage}
                        onChange={(e) => setNewCoverage(e.target.value)}
                      />
                    </div>
                    <div>
                      <FormLabel className="text-md mb-1">
                        {t('warrantyInstructions')}
                      </FormLabel>
                      <Textarea
                        maxLength={1000}
                        placeholder={t('warrantyInstructionsPlaceholder')}
                        value={newInstructions}
                        onChange={(e) => setNewInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Mobile add warranty button */}
                <div className="mt-2 block sm:hidden">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={addWarranty}
                    disabled={
                      !newMonths.trim() ||
                      !newCoverage.trim() ||
                      !newInstructions.trim()
                    }
                  >
                    <Plus className="h-4 w-4" /> {t('addWarranty')}
                  </Button>
                </div>
              </div>

              {/* Display existing warranties */}
              {fields.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <ArrayItemBox
                        key={field.id}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < fields.length - 1}
                        onMoveUp={() => moveWarranty(index, 'up')}
                        onMoveDown={() => moveWarranty(index, 'down')}
                        onDelete={() => remove(index)}
                        t={t}
                      >
                        <div className="space-y-3">
                          <div>
                            <FormLabel className="text-xs">
                              {t('warrantyMonths')}
                            </FormLabel>
                            <FormField
                              control={control}
                              name={`warranties.${index}.months`}
                              render={({ field: fieldProps }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...fieldProps}
                                      inputMode="numeric"
                                      type="number"
                                      placeholder={t(
                                        'warrantyMonthsPlaceholder',
                                      )}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(
                                          /\D/g,
                                          '',
                                        );
                                        fieldProps.onChange(value);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <FormLabel className="text-xs">
                                {t('warrantyCoverage')}
                              </FormLabel>
                              <FormField
                                control={control}
                                name={`warranties.${index}.coverage`}
                                render={({ field: fieldProps }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Textarea
                                        {...fieldProps}
                                        maxLength={1000}
                                        placeholder={t(
                                          'warrantyCoveragePlaceholder',
                                        )}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div>
                              <FormLabel className="text-xs">
                                {t('warrantyInstructions')}
                              </FormLabel>
                              <FormField
                                control={control}
                                name={`warranties.${index}.instructions`}
                                render={({ field: fieldProps }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Textarea
                                        {...fieldProps}
                                        maxLength={1000}
                                        placeholder={t(
                                          'warrantyInstructionsPlaceholder',
                                        )}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </ArrayItemBox>
                    ))}
                  </div>
                </div>
              )}

              {fields.length === 0 && (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  {t('noWarrantiesYet') ?? 'No warranties yet.'}
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
