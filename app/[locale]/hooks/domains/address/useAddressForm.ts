import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { AddressTypeEnum } from '@graphql/generated';

// Create Zod schema factory that uses translations and matches backend value objects
const createAddressFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, { message: t('nameMinLength') })
      .max(100, { message: t('nameMaxLength') }),
    addressLine1: z
      .string()
      .min(1, { message: t('addressLine1MinLength') })
      .max(100, { message: t('addressLine1MaxLength') }),
    addressLine2: z
      .string()
      .min(1, { message: t('addressLine2MinLength') })
      .max(100, { message: t('addressLine2MaxLength') })
      .optional()
      .or(z.literal('')),
    city: z
      .string()
      .min(2, { message: t('cityMinLength') })
      .max(100, { message: t('cityMaxLength') }),
    postalCode: z
      .string()
      .regex(/^[a-zA-Z0-9\s-]{2,10}$/, { message: t('postalCodeInvalid') }),
    countryId: z.string().min(1, { message: t('countryRequired') }),
    stateId: z.string().min(1, { message: t('stateRequired') }),
    deliveryNum: z.string().regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message: t('deliveryNumberInvalid'),
    }),
    deliveryInstructions: z
      .string()
      .min(10, { message: t('deliveryInstructionsMinLength') })
      .max(200, { message: t('deliveryInstructionsMaxLength') })
      .optional()
      .or(z.literal('')),
  });

type AddressFormData = z.infer<ReturnType<typeof createAddressFormSchema>>;

interface UseAddressFormProps {
  onSuccess: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
  addressType?: AddressTypeEnum;
}

interface UseAddressFormReturn {
  form: ReturnType<typeof useForm<AddressFormData>>;
  handleSubmit: (data: AddressFormData) => Promise<void>;
  handleCancel: () => void;
  isValid: boolean;
}

export function useAddressForm({
  onSuccess,
  onCancel,
}: UseAddressFormProps): UseAddressFormReturn {
  const t = useTranslations('Inventory.WarehouseManagement');

  // Create schema with translations
  const addressFormSchema = createAddressFormSchema(t);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      countryId: '',
      stateId: '',
      deliveryNum: '',
      deliveryInstructions: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = useCallback(
    async (data: AddressFormData) => {
      await onSuccess(data);
    },
    [onSuccess],
  );

  const handleCancel = useCallback(() => {
    form.reset();
    onCancel();
  }, [form, onCancel]);

  return {
    form,
    handleSubmit,
    handleCancel,
    isValid: form.formState.isValid,
  };
}
