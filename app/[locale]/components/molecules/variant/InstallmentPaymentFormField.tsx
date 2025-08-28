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
import { useTranslations } from 'next-intl';
import {
  handleDecimalInputChange,
  handleDecimalInputBlur,
  sanitizeNumericInput,
} from '@lib/utils/input-formatters';

interface InstallmentPayment {
  months: string;
  interestRate: string;
}

export default function InstallmentPaymentFormField() {
  const { control, watch, setValue } = useFormContext();
  const installmentPayments: InstallmentPayment[] =
    watch('installmentPayments') || [];
  const t = useTranslations('Variant');
  const [newMonths, setNewMonths] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');

  const addInstallmentPayment = () => {
    if (newMonths.trim() && newInterestRate.trim()) {
      const newInstallment: InstallmentPayment = {
        months: newMonths.trim(),
        interestRate: newInterestRate.trim(),
      };
      setValue('installmentPayments', [...installmentPayments, newInstallment]);
      setNewMonths('');
      setNewInterestRate('');
    }
  };

  const updateInstallmentPayment = (
    index: number,
    field: 'months' | 'interestRate',
    val: string,
  ) => {
    const updatedInstallments = installmentPayments.map((ip, i) =>
      i === index ? { ...ip, [field]: val } : ip,
    );
    setValue('installmentPayments', updatedInstallments);
  };

  const deleteInstallmentPayment = (index: number) => {
    const filteredInstallments = installmentPayments.filter(
      (_, i) => i !== index,
    );
    setValue('installmentPayments', filteredInstallments);
  };

  const moveInstallmentPayment = (index: number, dir: 'up' | 'down') => {
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= installmentPayments.length) return;
    const copy = [...installmentPayments];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setValue('installmentPayments', copy);
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
                      onClick={addInstallmentPayment}
                      disabled={!newMonths.trim() || !newInterestRate.trim()}
                    >
                      <Plus className="h-4 w-4" /> {t('addInstallmentPayment')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Display existing installment payments */}
              {installmentPayments.length > 0 && (
                <div className="border-border bg-muted/10 rounded-lg border p-8">
                  <div className="space-y-3">
                    {installmentPayments.map((installment, index) => (
                      <ArrayItemBox
                        key={index}
                        index={index}
                        canMoveUp={index > 0}
                        canMoveDown={index < installmentPayments.length - 1}
                        onMoveUp={() => moveInstallmentPayment(index, 'up')}
                        onMoveDown={() => moveInstallmentPayment(index, 'down')}
                        onDelete={() => deleteInstallmentPayment(index)}
                        t={t}
                      >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <FormLabel className="text-md">
                              {t('months')}
                            </FormLabel>
                            <Input
                              inputMode="numeric"
                              type="number"
                              placeholder={t('monthsPlaceholder')}
                              value={installment.months}
                              onChange={(e) => {
                                const value = sanitizeNumericInput(
                                  e.target.value,
                                );
                                updateInstallmentPayment(
                                  index,
                                  'months',
                                  value,
                                );
                              }}
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
                              <Input
                                inputMode="decimal"
                                type="decimal"
                                placeholder={t('interestRatePlaceholder')}
                                value={installment.interestRate}
                                onChange={(e) => {
                                  handleDecimalInputChange(
                                    e.target.value,
                                    (value) =>
                                      updateInstallmentPayment(
                                        index,
                                        'interestRate',
                                        value,
                                      ),
                                  );
                                }}
                                onBlur={(e) => {
                                  handleDecimalInputBlur(
                                    e.target.value,
                                    (value) =>
                                      updateInstallmentPayment(
                                        index,
                                        'interestRate',
                                        value,
                                      ),
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </ArrayItemBox>
                    ))}
                  </div>
                </div>
              )}

              {installmentPayments.length === 0 && (
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
