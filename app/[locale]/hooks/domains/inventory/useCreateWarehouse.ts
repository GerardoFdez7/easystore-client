import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateWarehouseDocument,
  CreateWarehouseMutation,
  CreateWarehouseMutationVariables,
} from '@graphql/generated';
import useMutation from '../../useMutation';

export const useCreateWarehouse = () => {
  const t = useTranslations('Warehouse');

  // Schema validation based on backend CreateWarehouseInput
  const createWarehouseFormSchema = z.object({
    name: z
      .string()
      .min(1, { message: t('nameRequired') })
      .max(255, { message: t('nameTooLong') }),
    addressId: z
      .string()
      .min(1, { message: t('addressRequired') })
      .uuid({ message: t('invalidAddressId') }),
  });

  type CreateWarehouseFormValues = z.infer<typeof createWarehouseFormSchema>;

  const form = useForm<CreateWarehouseFormValues>({
    resolver: zodResolver(createWarehouseFormSchema),
    defaultValues: {
      name: '',
      addressId: '',
    },
  });

  // Use the GraphQL mutation hook
  const {
    mutate: createWarehouseMutation,
    data,
    errors,
    isLoading,
  } = useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(
    CreateWarehouseDocument,
    undefined,
    {
      onCompleted: (data) => {
        if (data?.createWarehouse) {
          toast.success(t('warehouseCreatedSuccessfully'), {
            description: t('warehouseCreatedDescription', {
              name: data.createWarehouse.name,
            }),
          });
          // Optionally redirect to warehouse list or detail page
          // router.push('/warehouses');
        }
      },
      onError: (error) => {
        // Handle GraphQL errors
        if (error.graphQLErrors?.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          if (
            graphQLError.message.includes('already exists') ||
            graphQLError.message.includes('duplicate')
          ) {
            toast.warning(t('warehouseAlreadyExists'), {
              description: t('warehouseAlreadyExistsDescription'),
            });
          } else if (graphQLError.message.includes('address')) {
            toast.error(t('invalidAddress'), {
              description: t('invalidAddressDescription'),
            });
          } else {
            toast.error(t('warehouseCreationFailed'), {
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
    },
  );

  const handleSubmit = async (formData: CreateWarehouseFormValues) => {
    try {
      const variables: CreateWarehouseMutationVariables = {
        input: {
          name: formData.name,
          addressId: formData.addressId,
        },
      };

      await createWarehouseMutation({ variables });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Warehouse creation error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    createWarehouseFormSchema,
    data,
    errors,
  };
};
