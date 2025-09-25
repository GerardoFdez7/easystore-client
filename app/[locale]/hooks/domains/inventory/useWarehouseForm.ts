import { useCallback, useMemo } from 'react';
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

  // Change detection
  hasChanges: boolean;
  changedFields: Partial<WarehouseFormData>;

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

  // Store original values for comparison
  const originalValues = useMemo(
    () => ({
      name: warehouse?.name || '',
      addressId: warehouse?.addressId || '',
    }),
    [warehouse?.name, warehouse?.addressId],
  );

  // Initialize form
  const form = useForm<WarehouseFormData>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: originalValues,
  });

  // Watch form values for change detection
  const watchedValues = form.watch();

  // Calculate changed fields and hasChanges
  const { hasChanges, changedFields } = useMemo(() => {
    if (!warehouse) {
      // In create mode, consider form dirty if any field has a value
      const hasAnyValue = Object.values(watchedValues).some(
        (value) => value !== null && value !== undefined && value !== '',
      );
      return {
        hasChanges: hasAnyValue,
        changedFields: hasAnyValue ? watchedValues : {},
      };
    }

    // In update mode, compare with original values
    const changes: Partial<WarehouseFormData> = {};
    let hasAnyChanges = false;

    (Object.keys(originalValues) as Array<keyof WarehouseFormData>).forEach(
      (key) => {
        if (watchedValues[key] !== originalValues[key]) {
          changes[key] = watchedValues[key];
          hasAnyChanges = true;
        }
      },
    );

    return {
      hasChanges: hasAnyChanges,
      changedFields: changes,
    };
  }, [watchedValues, originalValues, warehouse]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (data: WarehouseFormData) => {
      try {
        let result;
        if (warehouse) {
          // Update existing warehouse - only send changed fields
          if (Object.keys(changedFields).length === 0) {
            // No changes to submit
            onSuccess?.();
            return;
          }

          result = await updateWarehouse(warehouse.id, changedFields);
        } else {
          // Create new warehouse - send all data
          const warehouseInput = {
            name: data.name,
            addressId: data.addressId,
          };
          result = await createWarehouse(warehouseInput);
        }

        if (result) {
          // Success toast is handled in the warehouse management hook
          onSuccess?.();
        }
      } catch (_error) {}
    },
    [warehouse, createWarehouse, updateWarehouse, onSuccess, changedFields],
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
    hasChanges,
    changedFields,
    warehouseFormSchema,
  };
}
