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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@shadcn/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { normalizeWarehouseName } from '@lib/utils';
import type { StockFormValues } from '@hooks/domains/inventory/stock-detail/useStockFormSchema';
import StockHeader from '@molecules/stock-detail/StockHeader';
import SerialChips from '@molecules/stock-detail/SerialChips';
import UpdateReasonDialog from '@molecules/stock-detail/UpdateReasonDialog';
import CalendarPicker from '@molecules/stock-detail/CalendarPicker';
import { useCreateWarehouseStock as useCreateWarehouseStockByLookup } from '@hooks/domains/inventory/stock-detail/useCreateWarehouseStock';
import { usePrefillExistingStock } from '@hooks/domains/inventory/stock-detail/usePrefillExistingStock';
import { useResolveWarehouseId } from '@hooks/domains/inventory/stock-detail/useResolveWarehouseId';
import { useUpdateWarehouseStock } from '@hooks/domains/inventory/stock-detail/useUpdateWarehouseStock';
import { useDeleteWarehouseStock } from '@hooks/domains/inventory/stock-detail/useDeleteWarehouseStock';

type Props = { warehouseName?: string; sku?: string };

export default function MainStockDetail({ warehouseName, sku }: Props) {
  const t = useTranslations('StockDetail');
  warehouseName = normalizeWarehouseName(warehouseName);
  const router = useRouter();

  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);

  const [showUpdateReason, setShowUpdateReason] = useState(false);
  const [updateReason, setUpdateReason] = useState('');

  // helper int
  const toInt = (v: string) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
  };

  const {
    form,
    handleSubmit: handleCreateSubmit,
    isSubmitting: isCreating,
    selectedVariant,
  } = useCreateWarehouseStockByLookup({
    warehouseName,
    variantSku: sku,
    getSerialNumbers: () => serialNumbers,
    reason: updateReason || undefined,
    onSuccess: () => {
      setUpdateReason('');
      setShowUpdateReason(false);
    },
  });

  const { update, state: updateState } = useUpdateWarehouseStock();
  const { deleteStock, loading: isDeleting } = useDeleteWarehouseStock({
    onSuccess: () => {
      router.back();
    },
  });
  const [editingIds, setEditingIds] = useState<{
    warehouseId: string;
    stockId: string;
  } | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Prefill when editing an existing stock (warehouse + sku already exist)
  const resolveWarehouseId = useResolveWarehouseId(warehouseName);
  usePrefillExistingStock({
    form,
    warehouseName,
    variantSku: sku,
    setSerialNumbers: setSerialNumbers,
    resolveWarehouseId,
    onFound: (ctx) => setEditingIds(ctx),
  });

  const disabled = isCreating || updateState.loading || isDeleting;
  const hasFormErrors = Boolean(
    form.formState.errors.reason || form.formState.errors.productLocation,
  );

  const handleDelete = async () => {
    if (!editingIds) return;
    const ok = await deleteStock(
      editingIds.warehouseId,
      editingIds.stockId,
      updateReason || undefined,
    );
    if (ok) {
      setShowDeleteConfirm(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const v = form.getValues();
    // Show reason dialog only when qty changed and reason is missing/too short
    const dv = (form.formState.defaultValues as Partial<StockFormValues>) ?? {};
    const changedQty =
      (v.available ?? 0) !== (dv.available ?? 0) ||
      (v.reserved ?? 0) !== (dv.reserved ?? 0);
    const reasonOk = (updateReason || '').trim().length >= 10;
    if (changedQty && !reasonOk) {
      setShowUpdateReason(true);
      form.setError('reason', {
        type: 'minLength',
        message: t('updateReasonTooShort'),
      });
      return;
    }
    if (editingIds) {
      const ok = await update(
        editingIds.warehouseId,
        editingIds.stockId,
        v,
        updateReason || undefined,
      );
      if (ok) {
        setUpdateReason('');
        setShowUpdateReason(false);
      }
      return;
    }
    handleCreateSubmit(e);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className="flex-1">
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
                      className="mt-2 w-72 md:w-80"
                      inputClassName="h-10 text-sm md:text-base"
                      buttonClassName="size-8"
                      value={field.value ?? null}
                      disabled={disabled}
                      disablePast
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
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
              <div className="flex gap-3">
                {editingIds && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={disabled}
                    className="w-full sm:w-auto"
                  >
                    {t('deleteStock')}
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={disabled}
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
          void form.trigger('reason').then(() => {
            const ok = (updateReason || '').trim().length >= 10;
            setShowUpdateReason(false);
            if (ok) {
              void handleSubmit();
            }
          });
        }}
        minLength={10}
      />

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteStockTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('deleteStockDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t('deleteStock')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}
