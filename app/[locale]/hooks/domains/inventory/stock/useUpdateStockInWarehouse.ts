import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateStockInWarehouseDocument,
  UpdateStockInWarehouseMutation,
  UpdateStockInWarehouseMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

interface UseUpdateStockInWarehouseProps {
  stockId: string;
  warehouseId: string;
  reason?: string;
}

export const useUpdateStockInWarehouse = ({
  stockId,
  warehouseId,
  reason,
}: UseUpdateStockInWarehouseProps) => {
  const t = useTranslations('Stock');

  // Schema validation based on backend UpdateStockInWarehouseInput
  const updateStockInWarehouseFormSchema = z.object({
    qtyAvailable: z
      .number()
      .int({ message: t('qtyAvailableMustBeInteger') })
      .min(0, { message: t('qtyAvailableMustBePositive') })
      .optional(),
    qtyReserved: z
      .number()
      .int({ message: t('qtyReservedMustBeInteger') })
      .min(0, { message: t('qtyReservedMustBePositive') })
      .optional(),
    productLocation: z
      .string()
      .max(255, { message: t('productLocationTooLong') })
      .optional(),
    estimatedReplenishmentDate: z
      .date({ message: t('invalidDate') })
      .optional(),
    lotNumber: z
      .string()
      .max(100, { message: t('lotNumberTooLong') })
      .optional(),
    serialNumbers: z
      .array(z.string().max(100, { message: t('serialNumberTooLong') }))
      .optional(),
  });

  type UpdateStockInWarehouseFormValues = z.infer<
    typeof updateStockInWarehouseFormSchema
  >;

  const form = useForm<UpdateStockInWarehouseFormValues>({
    resolver: zodResolver(updateStockInWarehouseFormSchema),
    defaultValues: {
      qtyAvailable: undefined,
      qtyReserved: undefined,
      productLocation: '',
      estimatedReplenishmentDate: undefined,
      lotNumber: '',
      serialNumbers: [],
    },
  });

  // Use the GraphQL mutation hook
  const { data, error, loading } = useMutation<
    UpdateStockInWarehouseMutation,
    UpdateStockInWarehouseMutationVariables
  >(UpdateStockInWarehouseDocument, {
    onCompleted: (data) => {
      if (data?.updateStockInWarehouse) {
        toast.success(t('stockUpdatedSuccessfully'), {
          description: t('stockUpdatedDescription', {
            warehouseName: data.updateStockInWarehouse.name,
          }),
        });
      }
    },
  });

  const handleSubmit = async (formData: UpdateStockInWarehouseFormValues) => {
    try {
      // Filter out undefined values to avoid sending them to the backend
      const cleanedInput: Partial<UpdateStockInWarehouseFormValues> = {};

      if (formData.qtyAvailable !== undefined) {
        cleanedInput.qtyAvailable = formData.qtyAvailable;
      }
      if (formData.qtyReserved !== undefined) {
        cleanedInput.qtyReserved = formData.qtyReserved;
      }
      if (formData.productLocation && formData.productLocation.trim()) {
        cleanedInput.productLocation = formData.productLocation.trim();
      }
      if (formData.estimatedReplenishmentDate) {
        cleanedInput.estimatedReplenishmentDate =
          formData.estimatedReplenishmentDate;
      }
      if (formData.lotNumber && formData.lotNumber.trim()) {
        cleanedInput.lotNumber = formData.lotNumber.trim();
      }
      if (formData.serialNumbers && formData.serialNumbers.length > 0) {
        cleanedInput.serialNumbers = formData.serialNumbers.filter((serial) =>
          serial.trim(),
        );
      }

      const variables: UpdateStockInWarehouseMutationVariables = {
        stockId,
        warehouseId,
        input: cleanedInput,
        reason: reason || undefined,
      };

      await updateStockInWarehouseMutation({ variables });
    } catch (_error) {}
  };

  return {
    form,
    handleSubmit,
    loading,
    updateStockInWarehouseFormSchema,
    data,
    error,
  };
};

export default useUpdateStockInWarehouse;
