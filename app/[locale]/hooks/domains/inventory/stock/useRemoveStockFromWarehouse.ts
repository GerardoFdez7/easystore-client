import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RemoveStockFromWarehouseDocument,
  RemoveStockFromWarehouseMutation,
  RemoveStockFromWarehouseMutationVariables,
} from '@graphql/generated';
import { useMutation } from '@apollo/client/react';

export const useRemoveStockFromWarehouse = () => {
  const t = useTranslations('Inventory');

  // Schema validation based on backend mutation parameters
  const removeStockFromWarehouseFormSchema = z.object({
    warehouseId: z.string().min(1, { message: t('warehouseIdRequired') }),
    stockId: z.string().min(1, { message: t('stockIdRequired') }),
    reason: z.string().optional(),
  });

  type RemoveStockFromWarehouseFormValues = z.infer<
    typeof removeStockFromWarehouseFormSchema
  >;

  const form = useForm<RemoveStockFromWarehouseFormValues>({
    resolver: zodResolver(removeStockFromWarehouseFormSchema),
    defaultValues: {
      warehouseId: '',
      stockId: '',
      reason: '',
    },
  });

  // Use the GraphQL mutation hook
  const { data, error, loading } = useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument, {
    onCompleted: (data) => {
      if (data?.removeStockFromWarehouse) {
        toast.success(t('stockRemovedSuccessfully'), {
          description: t('stockRemovedSuccessfullyDescription', {
            warehouseName: data.removeStockFromWarehouse.name,
          }),
        });
        // Reset form after successful removal
        form.reset();
      }
    },
  });

  const handleSubmit = async (formData: RemoveStockFromWarehouseFormValues) => {
    try {
      // Clean the input to only send non-empty values
      const cleanedInput: Partial<RemoveStockFromWarehouseFormValues> = {};

      // Always include required fields
      cleanedInput.warehouseId = formData.warehouseId;
      cleanedInput.stockId = formData.stockId;

      // Only include reason if it has a value
      if (formData.reason && formData.reason.trim() !== '') {
        cleanedInput.reason = formData.reason.trim();
      }

      const variables: RemoveStockFromWarehouseMutationVariables = {
        warehouseId: cleanedInput.warehouseId,
        stockId: cleanedInput.stockId,
        reason: cleanedInput.reason,
      };

      await removeStockFromWarehouseMutation({ variables });
    } catch (_error) {}
  };

  return {
    form,
    handleSubmit,
    loading,
    removeStockFromWarehouseFormSchema,
    data,
    error,
  };
};
