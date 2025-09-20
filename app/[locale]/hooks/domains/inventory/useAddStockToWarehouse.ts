import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  AddStockToWarehouseDocument,
  AddStockToWarehouseMutation,
  AddStockToWarehouseMutationVariables,
} from '@graphql/generated';
import useMutation from '../../useMutation';

export const useAddStockToWarehouse = () => {
  const t = useTranslations();

  // Schema validation based on backend AddStockToWarehouseInput
  const addStockFormSchema = z.object({
    warehouseId: z.string().min(1, { message: t('Stock.warehouseIdRequired') }),
    variantId: z.string().min(1, { message: t('Stock.variantIdRequired') }),
    qtyAvailable: z
      .number()
      .int()
      .min(0, { message: t('Stock.qtyAvailableMustBePositive') }),
    qtyReserved: z
      .number()
      .int()
      .min(0, { message: t('Stock.qtyReservedMustBePositive') })
      .optional(),
    productLocation: z.string().optional(),
    replenishmentDate: z.date().optional(),
    lotNumber: z.string().optional(),
    serialNumber: z.string().optional(),
  });

  type AddStockFormValues = z.infer<typeof addStockFormSchema>;

  const form = useForm<AddStockFormValues>({
    resolver: zodResolver(addStockFormSchema),
    defaultValues: {
      warehouseId: '',
      variantId: '',
      qtyAvailable: 0,
      qtyReserved: 0,
      productLocation: '',
      replenishmentDate: undefined,
      lotNumber: '',
      serialNumber: '',
    },
  });

  // Use the GraphQL mutation hook
  const {
    mutate: addStockMutation,
    data,
    errors,
    isLoading,
  } = useMutation<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >(AddStockToWarehouseDocument, undefined, {
    onCompleted: (data) => {
      if (data?.addStockToWarehouse) {
        toast.success(t('Stock.stockAddedSuccessfully'), {
          description: t('Stock.stockAddedDescription', {
            warehouseName: data.addStockToWarehouse.name,
          }),
        });

        // Reset form after successful submission
        form.reset();
      }
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (graphQLError.message.includes('warehouse not found')) {
          toast.error(t('Stock.warehouseNotFound'), {
            description: t('Stock.warehouseNotFoundDescription'),
          });
        } else if (graphQLError.message.includes('variant not found')) {
          toast.error(t('Stock.variantNotFound'), {
            description: t('Stock.variantNotFoundDescription'),
          });
        } else if (graphQLError.message.includes('insufficient permissions')) {
          toast.error(t('Stock.insufficientPermissions'), {
            description: t('Stock.insufficientPermissionsDescription'),
          });
        } else {
          toast.error(t('Stock.addStockFailed'), {
            description: graphQLError.message,
          });
        }
      } else if (error.networkError) {
        toast.error(t('Stock.networkError'), {
          description: t('Stock.networkErrorDescription'),
        });
      } else {
        toast.error(t('Stock.unexpectedError'), {
          description: t('Stock.unexpectedErrorDescription'),
        });
      }
    },
  });

  const handleSubmit = async (formData: AddStockFormValues) => {
    try {
      // Clean and prepare the data
      const cleanedData = {
        ...formData,
        qtyReserved: formData.qtyReserved || undefined,
        productLocation: formData.productLocation || undefined,
        replenishmentDate: formData.replenishmentDate || undefined,
        lotNumber: formData.lotNumber || undefined,
        serialNumber: formData.serialNumber || undefined,
      };

      const variables = {
        warehouseId: cleanedData.warehouseId,
        variantId: cleanedData.variantId,
        input: {
          qtyAvailable: cleanedData.qtyAvailable,
          qtyReserved: cleanedData.qtyReserved,
          productLocation: cleanedData.productLocation,
          replenishmentDate: cleanedData.replenishmentDate,
          lotNumber: cleanedData.lotNumber,
          serialNumber: cleanedData.serialNumber,
        },
      };

      await addStockMutation({ variables });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Add stock error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    addStockFormSchema,
    data,
    errors,
  };
};

export default useAddStockToWarehouse;
