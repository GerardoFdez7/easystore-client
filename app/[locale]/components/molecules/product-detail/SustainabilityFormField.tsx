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
import type { Sustainability } from '@lib/utils/types/product';
import { useTranslations } from 'next-intl';

interface SustainabilityProps {
  sustainabilities: Sustainability[];
}

export default function SustainabilityFormField({
  sustainabilities,
}: SustainabilityProps) {
  const { control, setValue } = useFormContext();
  const [newCertification, setNewCertification] = useState('');
  const [newRecycledPercentage, setNewRecycledPercentage] = useState('');
  const t = useTranslations('Variant');
  const addAttribute = () => {
    if (newCertification.trim() && newRecycledPercentage.trim()) {
      const newSustainability: Sustainability = {
        certification: newCertification.trim(),
        recycledPercentage: Number(newRecycledPercentage.trim()),
      };
      setValue('sustainabilities', [...sustainabilities, newSustainability]);
      setNewCertification('');
      setNewRecycledPercentage('');
    }
  };

  const updateAttribute = (
    index: number,
    field: 'certification' | 'recycledPercentage',
    val: string,
  ) => {
    const updatedSustainability = sustainabilities.map((a, i) =>
      i === index ? { ...a, [field]: val } : a,
    );
    setValue('sustainabilities', updatedSustainability);
  };

  const deleteAttribute = (index: number) => {
    const filteredSustainability = sustainabilities.filter(
      (_, i) => i !== index,
    );
    setValue('sustainabilities', filteredSustainability);
  };

  const moveAttribute = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sustainabilities.length) return;
    const copy = [...sustainabilities];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setValue('sustainabilities', copy);
  };

  return (
    <FormField
      control={control}
      name="sustainabilities"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            Sustainability
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              {/* Persistent input fields for adding new sustainability */}
              <div className="border-border bg-muted/30 rounded-lg border p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <FormLabel htmlFor="attributeKey" className="mb-1">
                      Certification
                    </FormLabel>
                    <Input
                      id="certification"
                      type="text"
                      required={true}
                      placeholder="Fair Trade"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel className="mb-1">Recycled Percentage</FormLabel>
                    <Input
                      type="number"
                      required={true}
                      placeholder="50%"
                      value={newRecycledPercentage}
                      onChange={(e) => setNewRecycledPercentage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAttribute}
                    disabled={
                      !newCertification.trim() || !newRecycledPercentage.trim()
                    }
                  >
                    <Plus className="h-4 w-4" /> Add Sustainability
                  </Button>
                </div>
              </div>

              {/* Display existing sustainability */}
              {sustainabilities.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {sustainabilities.map((sustainability, index) => (
                      <ArrayItemBox
                        key={index}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < sustainabilities.length - 1}
                        onMoveUp={() => moveAttribute(index, 'up')}
                        onMoveDown={() => moveAttribute(index, 'down')}
                        onDelete={() => deleteAttribute(index)}
                        t={t}
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FormLabel className="text-xs">
                              Certification
                            </FormLabel>
                            <Input
                              placeholder="Fair Trade"
                              value={sustainability.certification}
                              onChange={(e) =>
                                updateAttribute(
                                  index,
                                  'certification',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <FormLabel className="text-xs">
                              Recycled Percentage
                            </FormLabel>
                            <Input
                              type="number"
                              placeholder="50%"
                              value={sustainability.recycledPercentage}
                              onChange={(e) =>
                                updateAttribute(
                                  index,
                                  'recycledPercentage',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </ArrayItemBox>
                    ))}
                  </div>
                </div>
              )}

              {sustainabilities.length === 0 && (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No Sustainability yet
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
