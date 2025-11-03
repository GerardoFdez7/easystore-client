'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { normalizeWarehouseName } from '@lib/utils';
import { useCreateWarehouseStock as useCreateWarehouseStockByLookup } from '@hooks/domains/inventory/stock-detail/useCreateWarehouseStock';
import { usePrefillExistingStock } from '@hooks/domains/inventory/stock-detail/usePrefillExistingStock';
import { useResolveWarehouseId } from '@hooks/domains/inventory/stock-detail/useResolveWarehouseId';
import { useUpdateWarehouseStock } from '@hooks/domains/inventory/stock-detail/useUpdateWarehouseStock';
import { useDeleteWarehouseStock } from '@hooks/domains/inventory/stock-detail/useDeleteWarehouseStock';
import type { StockFormValues } from '@hooks/domains/inventory/stock-detail/useStockFormSchema';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { FormProvider } from 'react-hook-form';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import StockHeader from '@molecules/inventory/stock-detail/StockHeader';
import UpdateReasonDialog from '@molecules/inventory/stock-detail/UpdateReasonDialog';
import CalendarPicker from '@molecules/inventory/stock-detail/CalendarPicker';
import Options from '@molecules/shared/Options';
import BackButton from '@atoms/shared/BackButton';
import SaveButton from '@atoms/shared/SaveButton';
import TagInputFormField from '@molecules/shared/TagInputFormField';

type Props = { warehouseName?: string; sku?: string };

export default function MainStockDetail({ warehouseName, sku }: Props) {
  const t = useTranslations('StockDetail');
  warehouseName = normalizeWarehouseName(warehouseName);
  const router = useRouter();

  const [showUpdateReason, setShowUpdateReason] = useState(false);

  const toInt = (v: string) => {
    const sanitized = v.replace(/[^\d]/g, '');
    const n = Number(sanitized);
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
    getSerialNumbers: () => form.getValues('serialNumbers') || [],
    onSuccess: () => {
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

  // Prefill when editing an existing stock (warehouse + sku already exist)
  const resolveWarehouseId = useResolveWarehouseId(warehouseName);
  usePrefillExistingStock({
    form,
    warehouseName,
    variantSku: sku,
    setSerialNumbers: (serials: string[]) =>
      form.setValue('serialNumbers', serials),
    resolveWarehouseId,
    onFound: (ctx) => setEditingIds(ctx),
  });

  const disabled = isCreating || updateState.loading || isDeleting;

  const handleDelete = async () => {
    if (!editingIds) return;
    await deleteStock(editingIds.warehouseId, editingIds.stockId);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const v = form.getValues();
    // Show reason dialog only when available qty changed and reason is missing/too short
    const dv = (form.formState.defaultValues as Partial<StockFormValues>) ?? {};
    const availableQtyChanged = (v.available ?? 0) !== (dv.available ?? 0);
    const reasonOk = (v.reason || '').trim().length >= 20;
    if (editingIds && availableQtyChanged && !reasonOk) {
      setShowUpdateReason(true);
      return;
    }
    if (editingIds) {
      const ok = await update(
        editingIds.warehouseId,
        editingIds.stockId,
        v,
        v.reason || undefined,
      );
      if (ok) {
        setShowUpdateReason(false);
        form.reset({ ...form.getValues(), reason: '' });
      }
      return;
    }
    handleCreateSubmit(e);
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(e);
  };

  return (
    <>
      <BackButton />
      <Options
        showDelete
        onDelete={handleDelete}
        deleteTitle={t('deleteStockTitle')}
        deleteDescription={t('deleteStockDescription')}
        deleteButtonText={t('deleteStock')}
        disabled={editingIds === null || disabled}
      />
      <div className="mx-4 flex max-w-3xl flex-col justify-center space-y-6 lg:mx-auto lg:w-full">
        <StockHeader
          productName={selectedVariant?.productName ?? ''}
          sku={selectedVariant?.sku ?? ''}
          attributes={selectedVariant?.attributes ?? []}
          warehouseName={warehouseName}
        />
        <main>
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={onFormSubmit} className="w-full space-y-6">
                <input type="hidden" {...form.register('reason')} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Available */}
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          {t('available')}
                        </FormLabel>
                        <Input
                          className="w-full"
                          value={field.value || ''}
                          disabled={disabled}
                          onChange={(e) =>
                            field.onChange(toInt(e.target.value))
                          }
                          placeholder={'400'}
                          inputMode="numeric"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Reserved */}
                  <FormField
                    control={form.control}
                    name="reserved"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          {t('reserved')}
                        </FormLabel>
                        <Input
                          className="w-full"
                          value={field.value || ''}
                          disabled={disabled}
                          onChange={(e) =>
                            field.onChange(toInt(e.target.value))
                          }
                          placeholder={'15'}
                          inputMode="numeric"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Replenishment Date */}
                  <FormField
                    control={form.control}
                    name="replenishmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          {t('replenishmentDate')}
                        </FormLabel>
                        <CalendarPicker
                          id="replenishment-date"
                          className="w-full"
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

                  {/* Lot Number */}
                  <FormField
                    control={form.control}
                    name="lotNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          {t('lotNumber')}
                        </FormLabel>
                        <Input
                          className="w-full"
                          value={field.value ?? ''}
                          disabled={disabled}
                          onChange={field.onChange}
                          placeholder={t('lotNumberPlaceholder')}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Serials*/}
                  <div className="col-span-1 sm:col-span-2">
                    <TagInputFormField
                      name="serialNumbers"
                      label={t('serialNumbers')}
                      placeholder={t('serialNumbersPlaceholder')}
                      addButtonText={t('addSerial')}
                      emptyStateText={t('noSerials')}
                      deleteAriaLabel={t('deleteSerial')}
                    />
                  </div>
                </div>

                {/* Product Location*/}
                <div className="col-span-1 sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="productLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          {t('productLocation')}
                        </FormLabel>
                        <Textarea
                          className="w-full"
                          maxLength={200}
                          value={field.value ?? ''}
                          disabled={disabled}
                          onChange={field.onChange}
                          placeholder={t('productLocationPlaceholder')}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <SaveButton
                    type="submit"
                    disabled={
                      disabled ||
                      (editingIds !== null && !form.formState.isDirty)
                    }
                    size="lg"
                  />
                </div>
              </form>

              <UpdateReasonDialog
                open={showUpdateReason}
                onOpenChange={setShowUpdateReason}
                onConfirm={() => {
                  void form.trigger('reason').then(() => {
                    const reasonValue = form.getValues('reason') || '';
                    const ok = reasonValue.trim().length >= 20;
                    setShowUpdateReason(false);
                    if (ok) {
                      void handleSubmit();
                    }
                  });
                }}
              />
            </Form>
          </FormProvider>
        </main>
      </div>
    </>
  );
}
