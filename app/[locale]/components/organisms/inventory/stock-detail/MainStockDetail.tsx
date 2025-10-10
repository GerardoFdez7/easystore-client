'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { useRouter } from 'next/navigation';

import StockHeader from '@molecules/stock-detail/StockHeader';
import SerialChips from '@molecules/stock-detail/SerialChips';
import UpdateReasonDialog from '@molecules/stock-detail/UpdateReasonDialog';
import CalendarPicker from '@molecules/stock-detail/CalendarPicker';

// ⬇️ usa el hook “todo en uno” (resuelve IDs por nombre/SKU y crea)
import { useCreateWarehouseStock as useCreateWarehouseStockByLookup } from '@hooks/domains/inventory/stock-detail/useCreateWarehouseStock';

type Props = { warehouseName?: string; sku?: string };

export default function MainStockDetail({ warehouseName, sku }: Props) {
  const t = useTranslations('StockDetail');
  warehouseName = warehouseName?.split('-').join(' ').trim().toLowerCase();
  const router = useRouter();

  // seriales controlados por esta vista
  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);

  // dialog de razón
  const [showUpdateReason, setShowUpdateReason] = useState(false);
  const [updateReason, setUpdateReason] = useState('');

  // helper int
  const toInt = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
  };

  const { form, handleSubmit, isSubmitting, selectedVariant } =
    useCreateWarehouseStockByLookup({
      warehouseName,
      variantSku: sku,
      getSerialNumbers: () => serialNumbers,
      reason: updateReason || undefined,
      onSuccess: () => {
        setUpdateReason('');
        setShowUpdateReason(false);
      },
    });

  const disabled = isSubmitting;
  const hasFormErrors = Boolean(
    form.formState.errors.reason || form.formState.errors.productLocation,
  );

  return (
    <Form {...form}>
      <form onSubmit={(e) => handleSubmit(e)} className="flex-1">
        {/* Campo oculto para que reason forme parte del form (sincronizado con el diálogo) */}
        <input type="hidden" {...form.register('reason')} />
        <div className="mx-auto max-w-5xl px-6 py-6">
          <StockHeader
            productName={selectedVariant?.productName ?? ''}
            sku={selectedVariant?.sku ?? ''}
            attributes={selectedVariant?.attributes ?? []}
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
                      disabled={disabled}
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
                rules={{ min: { value: 0, message: t('reservedPlaceholder') } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t('reserved')}
                    </FormLabel>
                    <Input
                      type="number"
                      className="mt-2 max-w-xs"
                      value={field.value ?? 0}
                      disabled={disabled}
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
                minLength: {
                  value: 10,
                  message: t('productLocationTooShort'),
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
                    disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
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
              <SerialChips
                serials={serialNumbers}
                onChange={setSerialNumbers}
              />
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                disabled={disabled || hasFormErrors}
                className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
              >
                {t('saveChanges')}
              </Button>
            </div>
            {/* Mostrar error del form (zod) para reason si existe */}
            {form.formState.errors.reason?.message ? (
              <div className="text-destructive mt-2 text-sm">
                {String(form.formState.errors.reason.message)}
              </div>
            ) : null}
          </div>
        </div>
      </form>

      <UpdateReasonDialog
        open={showUpdateReason}
        onOpenChange={setShowUpdateReason}
        value={updateReason}
        onChange={(v) => {
          setUpdateReason(v);
          form.setValue('reason', v, { shouldValidate: true });
        }}
        onConfirm={() => {
          // trigger validation when the dialog is confirmed/closed
          void form.trigger('reason');
          setShowUpdateReason(false);
        }}
        minLength={10}
      />
    </Form>
  );
}
