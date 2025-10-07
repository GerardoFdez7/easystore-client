'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type {
  CreateWarehouseMutationVariables,
  UpdateWarehouseMutationVariables,
  FindWarehousesQuery,
  CreateAddressMutationVariables,
} from '@graphql/generated';
import { useAddressManagement } from '@hooks/domains/address';
import { useWarehouseForm } from '@hooks/domains/inventory';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@shadcn/ui/separator';
import { Tooltip, TooltipTrigger, TooltipContent } from '@shadcn/ui/tooltip';
import { Button } from '@shadcn/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@shadcn/ui/alert-dialog';
import AddressForm from '@molecules/inventory/AddressForm';
import AddressCombobox from '@molecules/inventory/AddressCombobox';
import FormActions from '@molecules/shared/FormActions';

type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

interface WarehouseFormProps {
  warehouse?: WarehouseType;
  onSubmit?: (
    data:
      | CreateWarehouseMutationVariables['input']
      | UpdateWarehouseMutationVariables['input'],
  ) => Promise<void>;
  onCancel?: () => void;
  onDelete?: (warehouseId: string) => Promise<boolean>;
  isSubmitting?: boolean;
  isDeleting?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  standalone?: boolean; // When true, renders without dialog wrapper
}

export default function WarehouseForm({
  warehouse,
  onSubmit,
  onCancel,
  onDelete,
  isSubmitting = false,
  isDeleting = false,
  open = false,
  onOpenChange,
  standalone = false,
}: WarehouseFormProps) {
  const t = useTranslations('Inventory.WarehouseManagement');
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { refetchAddresses, createAddress, isCreatingAddress } =
    useAddressManagement();

  const { form, handleSubmit, handleCancel, hasChanges } = useWarehouseForm({
    warehouse,
    onSuccess: onCancel || (() => {}),
    onCancel: onCancel || (() => {}),
  });

  // Use external onSubmit if provided, otherwise use the hook's handleSubmit
  const finalHandleSubmit = onSubmit || handleSubmit;

  const handleCreateAddress = async (
    addressInput: CreateAddressMutationVariables['input'],
  ) => {
    const newAddress = await createAddress(addressInput);
    if (newAddress) {
      form.setValue('addressId', newAddress.id);
      setIsAddressDialogOpen(false);
      await refetchAddresses();
    }
  };

  const handleDelete = async () => {
    if (!warehouse?.id || !onDelete) return;

    const result = await onDelete(warehouse.id);
    if (result) {
      onCancel?.();
    }
  };

  // Render the form content
  const formContent = (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(finalHandleSubmit)(e)}
        className="space-y-6"
      >
        {/* Warehouse Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('warehouseName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('warehouseNamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Selection */}
        <FormField
          control={form.control}
          name="addressId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('address')}</FormLabel>
              <div className="flex space-x-2">
                <AddressCombobox
                  value={field.value}
                  onChange={field.onChange}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsAddressDialogOpen(true)}
                  title={t('createNewAddress')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4">
          {/* Delete button (only show when editing) */}
          {warehouse && onDelete ? (
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="danger"
                      size="icon"
                      disabled={isSubmitting || isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {t('deleteWarehouse')}
                </TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t('deleteWarehouseTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('deleteWarehouseDescription', {
                      name: warehouse.name,
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => void handleDelete()}
                    variant="danger"
                    disabled={isDeleting}
                  >
                    {isDeleting ? t('deleting') : t('delete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <div />
          )}

          {/* Cancel and Submit buttons */}
          <FormActions
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            disabled={warehouse && !hasChanges}
          />
        </div>
      </form>
    </Form>
  );

  return (
    <>
      {standalone ? (
        // Standalone mode: render form directly without dialog wrapper
        formContent
      ) : (
        // Dialog mode: render form within dialog
        <>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {warehouse ? t('editWarehouse') : t('createWarehouse')}
                </DialogTitle>
                <DialogDescription>
                  {warehouse
                    ? t('editWarehouseDescription')
                    : t('createWarehouseDescription')}
                </DialogDescription>
                <Separator />
              </DialogHeader>
              {formContent}
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* Address Creation Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('createNewAddress')}</DialogTitle>
            <DialogDescription>
              {t('createNewAddressDescription')}
            </DialogDescription>
            <Separator />
          </DialogHeader>
          <AddressForm
            onSubmit={handleCreateAddress}
            onCancel={() => setIsAddressDialogOpen(false)}
            isSubmitting={isCreatingAddress}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
