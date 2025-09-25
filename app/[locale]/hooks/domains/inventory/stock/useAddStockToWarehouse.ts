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
import { useMutation } from '@apollo/client/react';

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
  const { data, error, loading } = useMutation<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >(AddStockToWarehouseDocument, {
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
    } catch (_error) {}
  };

  return {
    form,
    handleSubmit,
    loading,
    addStockFormSchema,
    data,
    error,
  };
};

export default useAddStockToWarehouse;
