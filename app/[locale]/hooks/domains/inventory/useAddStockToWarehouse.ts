import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  AddStockToWarehouseDocument,
  AddStockToWarehouseMutation,
  AddStockToWarehouseMutationVariables,
} from '@graphql/generated';
import useMutation from '../../useMutation';

export const useAddStockToWarehouse = () => {
  // Schema validation based on backend AddStockToWarehouseInput
  const addStockFormSchema = z.object({
    warehouseId: z.string().min(1, { message: 'Warehouse ID is required' }),
    variantId: z.string().min(1, { message: 'Variant ID is required' }),
    qtyAvailable: z
      .number()
      .int()
      .min(0, { message: 'Available quantity must be a positive number' }),
    qtyReserved: z
      .number()
      .int()
      .min(0, { message: 'Reserved quantity must be a positive number' })
      .optional(),
    productLocation: z.string().optional(),
    estimatedReplenishmentDate: z.date().optional(),
    lotNumber: z.string().optional(),
    serialNumbers: z.array(z.string()).optional(),
    reason: z.string().optional(),
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
      estimatedReplenishmentDate: undefined,
      lotNumber: '',
      serialNumbers: [],
      reason: '',
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
        toast.success('Stock agregado exitosamente', {
          description: `Stock agregado al almacén ${data.addStockToWarehouse.name}`,
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
          toast.error('Almacén no encontrado', {
            description: 'El almacén especificado no existe',
          });
        } else if (graphQLError.message.includes('variant not found')) {
          toast.error('Variante no encontrada', {
            description: 'La variante del producto no existe',
          });
        } else if (graphQLError.message.includes('insufficient permissions')) {
          toast.error('Permisos insuficientes', {
            description: 'No tienes permisos para agregar stock a este almacén',
          });
        } else {
          toast.error('Error al agregar stock', {
            description: graphQLError.message,
          });
        }
      } else if (error.networkError) {
        toast.error('Error de conexión', {
          description: 'No se pudo conectar con el servidor',
        });
      } else {
        toast.error('Error inesperado', {
          description: 'Ocurrió un error inesperado al agregar el stock',
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
        estimatedReplenishmentDate:
          formData.estimatedReplenishmentDate || undefined,
        lotNumber: formData.lotNumber || undefined,
        serialNumbers: formData.serialNumbers?.length
          ? formData.serialNumbers
          : undefined,
        reason: formData.reason || undefined,
      };

      const variables: AddStockToWarehouseMutationVariables = {
        warehouseId: cleanedData.warehouseId,
        variantId: cleanedData.variantId,
        input: {
          qtyAvailable: cleanedData.qtyAvailable,
          qtyReserved: cleanedData.qtyReserved,
          productLocation: cleanedData.productLocation,
          estimatedReplenishmentDate: cleanedData.estimatedReplenishmentDate,
          lotNumber: cleanedData.lotNumber,
          serialNumbers: cleanedData.serialNumbers,
        },
        reason: cleanedData.reason,
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
