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
import useMutation from '../../useMutation';

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
  const {
    mutate: updateStockInWarehouseMutation,
    data,
    errors,
    isLoading,
  } = useMutation<
    UpdateStockInWarehouseMutation,
    UpdateStockInWarehouseMutationVariables
  >(UpdateStockInWarehouseDocument, undefined, {
    onCompleted: (data) => {
      if (data?.updateStockInWarehouse) {
        toast.success(t('stockUpdatedSuccessfully'), {
          description: t('stockUpdatedDescription', {
            warehouseName: data.updateStockInWarehouse.name,
          }),
        });
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
          toast.error(t('stockOrWarehouseNotFound'), {
            description: t('stockOrWarehouseNotFoundDescription'),
          });
        } else if (
          graphQLError.message.includes('insufficient') ||
          graphQLError.message.includes('quantity')
        ) {
          toast.error(t('insufficientStock'), {
            description: t('insufficientStockDescription'),
          });
        } else if (graphQLError.message.includes('permission')) {
          toast.error(t('permissionDenied'), {
            description: t('permissionDeniedDescription'),
          });
        } else {
          toast.error(t('stockUpdateFailed'), {
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
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Stock update error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    updateStockInWarehouseFormSchema,
    data,
    errors,
  };
};

export default useUpdateStockInWarehouse;
