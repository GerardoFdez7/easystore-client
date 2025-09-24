import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { type FindWarehousesQuery } from '@graphql/generated';
import { useWarehouseManagement } from './useWarehouseManagement';

// Warehouse type from query
type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

// Create Zod schema factory that uses translations
const createWarehouseFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, { message: t('warehouseNameMinLength') })
      .max(100, { message: t('warehouseNameMaxLength') }),
    addressId: z.string().uuid({ message: t('addressRequired') }),
  });

type WarehouseFormData = z.infer<ReturnType<typeof createWarehouseFormSchema>>;

interface UseWarehouseFormProps {
  warehouse?: WarehouseType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface UseWarehouseFormReturn {
  // Form instance
  form: ReturnType<typeof useForm<WarehouseFormData>>;

  // Form handlers
  handleSubmit: (data: WarehouseFormData) => Promise<void>;
  handleCancel: () => void;

  // Loading states
  isSubmitting: boolean;

  // Schema for external validation
  warehouseFormSchema: ReturnType<typeof createWarehouseFormSchema>;
}

export function useWarehouseForm({
  warehouse,
  onSuccess,
  onCancel,
}: UseWarehouseFormProps): UseWarehouseFormReturn {
  const t = useTranslations('Inventory.WarehouseManagement');
  const { createWarehouse, updateWarehouse, isCreating, isUpdating } =
    useWarehouseManagement();

  // Create schema with translations
  const warehouseFormSchema = createWarehouseFormSchema(t);

  // Initialize form
  const form = useForm<WarehouseFormData>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: {
      name: warehouse?.name || '',
      addressId: warehouse?.addressId || '',
    },
  });

  // Handle form submission
  const handleSubmit = useCallback(
    async (data: WarehouseFormData) => {
      try {
        const warehouseInput = {
          name: data.name,
          addressId: data.addressId,
        };

        let result;
        if (warehouse) {
          // Update existing warehouse
          result = await updateWarehouse(warehouse.id, warehouseInput);
        } else {
          // Create new warehouse
          result = await createWarehouse(warehouseInput);
        }

        if (result) {
          // Success toast is handled in the warehouse management hook
          onSuccess?.();
        }
      } catch (error) {
        console.error('Error submitting warehouse form:', error);
      }
    },
    [warehouse, createWarehouse, updateWarehouse, onSuccess],
  );

  // Handle form cancellation
  const handleCancel = useCallback(() => {
    form.reset();
    onCancel?.();
  }, [form, onCancel]);

  // Determine loading state
  const isSubmitting = isCreating || isUpdating;

  return {
    form,
    handleSubmit,
    handleCancel,
    isSubmitting,
    warehouseFormSchema,
  };
}
