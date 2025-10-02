'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';

import StockHeader from '@molecules/stock-detail/StockHeader';
import SerialChips from '@molecules/stock-detail/SerialChips';
import UpdateReasonDialog from '@molecules/stock-detail/UpdateReasonDialog';
import CalendarPicker from '@molecules/stock-detail/CalendarPicker';

type Props = { warehouseName?: string; sku?: string };

type StockDetailForm = {
  available: number;
  reserved: number;
  productLocation: string;
  lotNumber: string;
  replenishmentDate: Date | null;
};

export default function MainStockDetail({ warehouseName, sku }: Props) {
  const t = useTranslations('StockDetail');

  // ---------------- form (sin zod) ----------------
  const form = useForm<StockDetailForm>({
    mode: 'onChange',
    defaultValues: {
      available: 0,
      reserved: 0,
      productLocation: '',
      lotNumber: '',
      replenishmentDate: null,
    },
  });

  // ---------------- mock data (remplaza con fetch real) -------------
  const [productName, setProductName] = useState('');
  const [_variantKey, setVariantKey] = useState('');
  const [variantValue, setVariantValue] = useState('');
  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);

  useEffect(() => {
    if (!warehouseName || !sku) return;
    setProductName('Nike t-shirts');
    setVariantKey('color');
    setVariantValue('red');
    setSerialNumbers([
      'SN-9FKZ-23J7-BUQ2',
      'SN-4NZB-7FST-H6R5',
      'SN-8YZL-50AN-ZT7Y',
    ]);
    form.reset({
      available: 6,
      reserved: 2,
      productLocation: 'A 12-3',
      lotNumber: 'LOT ABC-99',
      replenishmentDate: new Date(),
    });
  }, [warehouseName, sku, form]);

  // ---------------- update reason dialog ----------------
  const [showUpdateReason, setShowUpdateReason] = useState(false);
  const [updateReason, setUpdateReason] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void (async () => {
      const isValid = await form.trigger();
      if (!isValid) return;

      const values = form.getValues();
      console.log(values);
      // TODO: persist(values)
    })();
  };

  const handleConfirmUpdateAvailable = () => {
    if (!updateReason.trim()) return;
    // TODO: patch con razón
    setShowUpdateReason(false);
    setUpdateReason('');
  };

  // ---------------- helpers ----------------
  const toInt = (v: string) => {
    // Permite vacío -> 0, y evita NaN
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <StockHeader
            colorValue={variantValue}
            productName={productName}
            warehouseName={warehouseName}
          />

          <div className="mt-8 grid grid-cols-1 gap-6">
            {/* Available / Reserved */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="available"
                rules={{
                  min: { value: 0, message: t('availablePlaceholder') },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('available')}
                    </FormLabel>
                    <Input
                      type="number"
                      className="mt-2 max-w-xs"
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(toInt(e.target.value))}
                      onBlur={() => setShowUpdateReason(true)}
                      placeholder={t('availablePlaceholder')}
                      inputMode="numeric"
                      min={0}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reserved"
                rules={{
                  min: { value: 0, message: t('reservedPlaceholder') },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('reserved')}
                    </FormLabel>
                    <Input
                      type="number"
                      className="mt-2 max-w-xs"
                      value={field.value ?? 0}
                      onChange={(e) => field.onChange(toInt(e.target.value))}
                      placeholder={t('reservedPlaceholder')}
                      inputMode="numeric"
                      min={0}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Product Location */}
            <FormField
              control={form.control}
              name="productLocation"
              rules={{
                maxLength: {
                  value: 100,
                  message: t('productLocationPlaceholder'),
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {t('productLocation')}
                  </FormLabel>
                  <Input
                    className="mt-2 max-w-xl"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={t('productLocationPlaceholder')}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date / Lot */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="replenishmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('replenishmentDate')}
                    </FormLabel>
                    <CalendarPicker
                      id="replenishment-date"
                      className="mt-2 max-w-xs"
                      value={field.value ?? null}
                      onChange={field.onChange}
                      placeholder={t('replenishmentDatePlaceholder')}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lotNumber"
                rules={{
                  maxLength: { value: 50, message: t('lotNumberPlaceholder') },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('lotNumber')}
                    </FormLabel>
                    <Input
                      className="mt-2 max-w-xs"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder={t('lotNumberPlaceholder')}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Serials */}
            <div>
              <Label className="text-sm font-medium">
                {t('serialNumbers')}
              </Label>
              <SerialChips serials={serialNumbers} />
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="w-full sm:w-auto"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
              >
                {t('saveChanges')}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <UpdateReasonDialog
        open={showUpdateReason}
        onOpenChange={setShowUpdateReason}
        value={updateReason}
        onChange={setUpdateReason}
        onConfirm={handleConfirmUpdateAvailable}
      />
    </Form>
  );
}
