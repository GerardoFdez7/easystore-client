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
import useMutation from '../../useMutation';

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
  const {
    mutate: removeStockFromWarehouseMutation,
    data,
    errors,
    isLoading,
  } = useMutation<
    RemoveStockFromWarehouseMutation,
    RemoveStockFromWarehouseMutationVariables
  >(RemoveStockFromWarehouseDocument, undefined, {
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
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (
          graphQLError.message.includes('not found') ||
          graphQLError.message.includes('does not exist')
        ) {
          toast.warning(t('stockOrWarehouseNotFound'), {
            description: t('stockOrWarehouseNotFoundDescription'),
          });
        } else if (
          graphQLError.message.includes('insufficient') ||
          graphQLError.message.includes('quantity')
        ) {
          toast.warning(t('insufficientStock'), {
            description: t('insufficientStockDescription'),
          });
        } else {
          toast.error(t('stockRemovalFailed'), {
            description: graphQLError.message,
          });
        }
      } else if (error.networkError) {
        toast.error(t('networkError'), {
          description: t('networkErrorDescription'),
        });
      } else {
        toast.error(t('unexpectedError'), {
          description: t('unexpectedErrorDescription'),
        });
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
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Remove stock from warehouse error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    removeStockFromWarehouseFormSchema,
    data,
    errors,
  };
};
