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
import type { Sustainability } from '@lib/types/product';
import { useTranslations } from 'next-intl';

export default function SustainabilityFormField() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'sustainabilities',
  });
  const [newCertification, setNewCertification] = useState('');
  const [newRecycledPercentage, setNewRecycledPercentage] = useState('');
  const [localErrors, setLocalErrors] = useState<{
    certification?: string;
    recycledPercentage?: string;
  }>({});
  const t = useTranslations('Products');

  const addAttribute = () => {
    // Validate inputs before adding
    const validationErrors: {
      certification?: string;
      recycledPercentage?: string;
    } = {};

    if (!newCertification.trim()) {
      validationErrors.certification = t('certificationRequired');
    }

    const percentage = Number(newRecycledPercentage.trim());
    if (!newRecycledPercentage.trim()) {
      validationErrors.recycledPercentage = t('recycledPercentageMin');
    } else if (isNaN(percentage) || percentage < 0) {
      validationErrors.recycledPercentage = t('recycledPercentageMin');
    } else if (percentage > 100) {
      validationErrors.recycledPercentage = t('recycledPercentageMax');
    }

    if (Object.keys(validationErrors).length > 0) {
      setLocalErrors(validationErrors);
      return;
    }

    // Clear errors and add sustainability
    setLocalErrors({});
    const newSustainability: Sustainability = {
      certification: newCertification.trim(),
      recycledPercentage: percentage,
    };
    append(newSustainability);
    setNewCertification('');
    setNewRecycledPercentage('');
  };

  const deleteAttribute = (index: number) => {
    remove(index);
  };

  const moveAttribute = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= fields.length) {
      return;
    }
    move(index, target);
  };

  return (
    <FormItem>
      <FormLabel className="text-lg font-semibold">
        {t('sustainabilities')}
      </FormLabel>
      <FormControl>
        <div className="space-y-4">
          {/* Persistent input fields for adding new sustainability */}
          <div className="border-border bg-muted/30 rounded-lg border p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <FormLabel htmlFor="certification" className="mb-1">
                  {t('certification')}
                </FormLabel>
                <Input
                  id="certification"
                  type="text"
                  placeholder={t('certificationPlaceholder')}
                  value={newCertification}
                  onChange={(e) => {
                    setNewCertification(e.target.value);
                    if (localErrors.certification) {
                      setLocalErrors((prev) => ({
                        ...prev,
                        certification: undefined,
                      }));
                    }
                  }}
                  className={
                    localErrors.certification ? 'border-destructive' : ''
                  }
                />
                {localErrors.certification && (
                  <p className="text-destructive mt-1 text-sm">
                    {localErrors.certification}
                  </p>
                )}
              </div>
              <div>
                <FormLabel htmlFor="recycledPercentage" className="mb-1">
                  {t('recycledPercentage')}
                </FormLabel>
                <Input
                  id="recycledPercentage"
                  placeholder="99"
                  value={newRecycledPercentage}
                  onChange={(e) => {
                    setNewRecycledPercentage(e.target.value);
                    if (localErrors.recycledPercentage) {
                      setLocalErrors((prev) => ({
                        ...prev,
                        recycledPercentage: undefined,
                      }));
                    }
                  }}
                  className={
                    localErrors.recycledPercentage ? 'border-destructive' : ''
                  }
                />
                {localErrors.recycledPercentage && (
                  <p className="text-destructive mt-1 text-sm">
                    {localErrors.recycledPercentage}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={addAttribute}
              >
                <Plus className="h-4 w-4" /> {t('addSustainability')}
              </Button>
            </div>
          </div>

          {/* Display existing sustainability */}
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
                    onDelete={() => deleteAttribute(index)}
                    t={t}
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <FormField
                        control={control}
                        name={`sustainabilities.${index}.certification`}
                        render={({ field: certField }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              {t('certification')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('certificationPlaceholder')}
                                {...certField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`sustainabilities.${index}.recycledPercentage`}
                        render={({ field: percentField }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              {t('recycledPercentage')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0-100"
                                {...percentField}
                                onChange={(e) =>
                                  percentField.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </ArrayItemBox>
                ))}
              </div>
            </div>
          )}

          {fields.length === 0 && (
            <p className="text-muted-foreground py-8 text-center text-sm">
              {t('noSustainabilityAdded')}
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
