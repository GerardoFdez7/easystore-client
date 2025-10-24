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
import {
  handleDecimalInputChange,
  handleDecimalInputBlur,
  sanitizeNumericInput,
} from '@lib/utils/input-formatters';

export default function InstallmentPaymentFormField() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'installmentPayments',
  });
  const t = useTranslations('Variant');
  const [newMonths, setNewMonths] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');

  const addInstallmentPayment = () => {
    if (newMonths.trim() && newInterestRate.trim()) {
      append({
        months: parseFloat(newMonths.trim()),
        interestRate: parseFloat(newInterestRate.trim()),
      });
      setNewMonths('');
      setNewInterestRate('');
    }
  };

  const moveInstallmentPayment = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= fields.length) return;
    move(index, target);
  };

  return (
    <FormField
      control={control}
      name="installmentPayments"
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            {t('installmentPayments')}
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              {/* Persistent input fields for adding new installment payments */}
              <div className="border-border bg-muted/30 rounded-lg border p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <FormLabel htmlFor="months" className="text-md mb-1">
                        {t('months')}
                      </FormLabel>
                      <Input
                        id="months"
                        inputMode="numeric"
                        type="number"
                        placeholder={t('monthsPlaceholder')}
                        value={newMonths}
                        onChange={(e) => {
                          const value = sanitizeNumericInput(e.target.value);
                          setNewMonths(value);
                        }}
                      />
                    </div>
                    <div>
                      <FormLabel
                        htmlFor="interestRate"
                        className="text-md mb-1"
                      >
                        {t('interestRate')}
                      </FormLabel>
                      <div className="relative">
                        <span className="pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2 font-medium">
                          %
                        </span>
                        <Input
                          id="interestRate"
                          inputMode="decimal"
                          type="decimal"
                          placeholder={t('interestRatePlaceholder')}
                          value={newInterestRate}
                          onChange={(e) => {
                            handleDecimalInputChange(
                              e.target.value,
                              setNewInterestRate,
                            );
                          }}
                          onBlur={(e) => {
                            handleDecimalInputBlur(
                              e.target.value,
                              setNewInterestRate,
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={addInstallmentPayment}
                      disabled={!newMonths.trim() || !newInterestRate.trim()}
                    >
                      <Plus className="h-4 w-4" /> {t('addInstallmentPayment')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Display existing installment payments */}
              {fields.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <ArrayItemBox
                        key={field.id}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < fields.length - 1}
                        onMoveUp={() => moveInstallmentPayment(index, 'up')}
                        onMoveDown={() => moveInstallmentPayment(index, 'down')}
                        onDelete={() => remove(index)}
                        t={t}
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FormLabel className="text-md">
                              {t('months')}
                            </FormLabel>
                            <FormField
                              control={control}
                              name={`installmentPayments.${index}.months`}
                              render={({ field: fieldProps }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...fieldProps}
                                      inputMode="numeric"
                                      type="number"
                                      placeholder={t('monthsPlaceholder')}
                                      onChange={(e) => {
                                        const value = sanitizeNumericInput(
                                          e.target.value,
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
                          <div>
                            <FormLabel className="text-xs">
                              {t('interestRate')}
                            </FormLabel>
                            <div className="relative">
                              <span className="pointer-events-none absolute inset-y-0 right-3 my-1.5 flex items-center rounded-md border px-2 font-medium">
                                %
                              </span>
                              <FormField
                                control={control}
                                name={`installmentPayments.${index}.interestRate`}
                                render={({ field: fieldProps }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...fieldProps}
                                        inputMode="decimal"
                                        type="decimal"
                                        placeholder={t(
                                          'interestRatePlaceholder',
                                        )}
                                        onChange={(e) => {
                                          handleDecimalInputChange(
                                            e.target.value,
                                            (value) =>
                                              fieldProps.onChange(value),
                                          );
                                        }}
                                        onBlur={(e) => {
                                          handleDecimalInputBlur(
                                            e.target.value,
                                            (value) =>
                                              fieldProps.onChange(value),
                                          );
                                        }}
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
                  {t('noInstallmentPaymentsYet') ??
                    'No installment payments yet.'}
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
