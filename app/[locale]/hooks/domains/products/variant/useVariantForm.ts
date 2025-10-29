'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useVariantFromProducts } from '@lib/contexts/ProductsContext';
import { useProductCreation } from '@lib/contexts/ProductCreationContext';
import { useVariantManagement } from './useVariantManagement';
import { ConditionEnum, MediaTypeEnum, type Variant } from '@graphql/generated';

// Create Zod schema factory that uses translations
const createVariantFormSchema = (t: (key: string) => string) =>
  z.object({
    price: z.coerce.number().nonnegative({ message: t('priceNonNegative') }),
    condition: z.enum(['NEW', 'USED', 'REFURBISHED'], {
      errorMap: () => ({ message: t('conditionRequired') }),
    }),
    attributes: z.array(
      z.object({
        key: z.string().min(1, { message: t('attributeKeyRequired') }),
        value: z.string().min(1, { message: t('attributeValueRequired') }),
      }),
    ),
    dimensions: z.object({
      height: z
        .union([z.coerce.number().nonnegative(), z.literal(''), z.null()])
        .refine((val) => val === '' || val === null || val >= 0, {
          message: t('heightNonNegative'),
        }),
      width: z
        .union([z.coerce.number().nonnegative(), z.literal(''), z.null()])
        .refine((val) => val === '' || val === null || val >= 0, {
          message: t('widthNonNegative'),
        }),
      length: z
        .union([z.coerce.number().nonnegative(), z.literal(''), z.null()])
        .refine((val) => val === '' || val === null || val >= 0, {
          message: t('lengthNonNegative'),
        }),
    }),
    weight: z
      .union([z.coerce.number().nonnegative(), z.literal(''), z.null()])
      .refine((val) => val === '' || val === null || val >= 0, {
        message: t('weightNonNegative'),
      }),
    codes: z.object({
      sku: z
        .string()
        .optional()
        .nullable()
        .refine(
          (val) => !val || val.trim().length === 0 || val.trim().length >= 1,
          {
            message: t('skuRequired'),
          },
        ),
      upc: z
        .string()
        .optional()
        .nullable()
        .refine(
          (val) => !val || val.trim().length === 0 || /^\d{12}$/.test(val),
          {
            message: t('upcInvalid'),
          },
        ),
      ean: z
        .string()
        .optional()
        .nullable()
        .refine(
          (val) =>
            !val || val.trim().length === 0 || /^(\d{8}|\d{13})$/.test(val),
          {
            message: t('eanInvalid'),
          },
        ),
      isbn: z
        .string()
        .optional()
        .nullable()
        .refine(
          (val) =>
            !val ||
            val.trim().length === 0 ||
            /^(?:(?:\d{9}[\dX])|(?:(?:978|979)\d{10}))$/.test(val),
          {
            message: t('isbnInvalid'),
          },
        ),
      barcode: z
        .string()
        .optional()
        .nullable()
        .refine((val) => !val || val.trim().length === 0 || val.length >= 1, {
          message: t('barcodeInvalid'),
        }),
    }),
    personalizationOptions: z.array(
      z.string().min(1, { message: t('personalizationOptionRequired') }),
    ),
    installmentPayments: z.array(
      z.object({
        months: z.coerce
          .number()
          .int()
          .min(0, { message: t('monthsMinValue') }),
        interestRate: z.coerce
          .number()
          .min(0, { message: t('interestRateMinValue') }),
      }),
    ),
    warranties: z.array(
      z.object({
        months: z.coerce
          .number()
          .int()
          .min(0, { message: t('monthsMinValue') }),
        coverage: z
          .string()
          .min(20, { message: t('warrantyCoverageRequired') })
          .max(1000, { message: t('warrantyCoverageMaxLength') }),
        instructions: z
          .string()
          .min(20, { message: t('warrantyInstructionsRequired') })
          .max(1000, { message: t('warrantyInstructionsMaxLength') }),
      }),
    ),
    variantCover: z
      .string()
      .url({ message: t('variantCoverInvalidUrl') })
      .optional()
      .or(z.literal('')),
    variantMedia: z.array(z.string().url({ message: t('mediaUrlInvalid') })),
  });

type VariantFormData = z.infer<ReturnType<typeof createVariantFormSchema>>;

interface UseVariantFormProps {
  productId: string;
  variantId?: string;
  isNew: boolean;
  isNewProduct?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface UseVariantFormReturn {
  // Form instance
  form: ReturnType<typeof useForm<VariantFormData>>;

  // Form handlers
  handleSubmit: (data: VariantFormData) => Promise<void>;
  handleCancel: () => void;

  // Loading states
  isSubmitting: boolean;
  loading: boolean;

  // Change detection
  hasChanges: boolean;
  changedFields: Partial<VariantFormData>;

  // Schema for external validation
  variantFormSchema: ReturnType<typeof createVariantFormSchema>;

  // Variant data
  variant: Variant | null;
}

export function useVariantForm({
  productId,
  variantId,
  isNew,
  isNewProduct = false,
  onSuccess,
  onCancel,
}: UseVariantFormProps): UseVariantFormReturn {
  const t = useTranslations('Products');
  const router = useRouter();
  const { addVariant, updateVariant, isAdding, isUpdating } =
    useVariantManagement();
  const { addVariantDraft } = useProductCreation();

  // Get variant data from context only when editing (not creating new)
  const { variant, loading: contextLoading } = useVariantFromProducts(
    isNew ? '' : variantId || '',
  );

  const variantFormSchema = createVariantFormSchema(t);

  const originalValues = useMemo<VariantFormData>(() => {
    // Mode is 'create' or variant data is not yet available
    if (isNew || !variant) {
      return {
        price: 0,
        condition: 'NEW',
        attributes: [],
        dimensions: {
          height: '',
          width: '',
          length: '',
        },
        weight: '',
        codes: {
          sku: null,
          upc: null,
          ean: null,
          isbn: null,
          barcode: null,
        },
        personalizationOptions: [],
        installmentPayments: [],
        warranties: [],
        variantCover: '',
        variantMedia: [],
      };
    }
    // Mode is 'update' and variant data is available
    return {
      price: variant.price || 0,
      condition: (variant.condition as 'NEW' | 'USED' | 'REFURBISHED') || 'NEW',
      attributes:
        variant.attributes?.map((attr) => ({
          key: attr.key,
          value: attr.value,
        })) || [],
      dimensions: {
        height: variant.dimension?.height || '',
        width: variant.dimension?.width || '',
        length: variant.dimension?.length || '',
      },
      weight: variant.weight || '',
      codes: {
        sku: variant.sku || null,
        upc: variant.upc || null,
        ean: variant.ean || null,
        isbn: variant.isbn || null,
        barcode: variant.barcode || null,
      },
      personalizationOptions: variant.personalizationOptions || [],
      installmentPayments:
        variant.installmentPayments?.map((payment) => ({
          months: payment.months,
          interestRate: payment.interestRate,
        })) || [],
      warranties:
        variant.warranties?.map((warranty) => ({
          months: warranty.months,
          coverage: warranty.coverage,
          instructions: warranty.instructions,
        })) || [],
      variantCover: variant.variantCover || '',
      variantMedia: variant.variantMedia?.map((media) => media.url) || [],
    };
  }, [variant, isNew]);

  // Initialize form
  const form = useForm<VariantFormData>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: originalValues,
    mode: 'onChange',
  });

  // Use formState to track isDirty
  const { isDirty } = useFormState({ control: form.control });

  // Reset form when variant data loads or changes (only in edit mode)
  useEffect(() => {
    if (variant && !isNew) {
      form.reset(originalValues);
    }
  }, [variant, isNew, originalValues, form]);

  // Calculate hasChanges using isDirty from React Hook Form
  const hasChanges = useMemo(() => {
    if (isNew) {
      // In create mode - check if required fields are filled
      const currentValues = form.getValues();
      return (
        typeof currentValues.price === 'number' &&
        currentValues.price > 0 &&
        currentValues.codes.sku !== null &&
        currentValues.codes.sku !== ''
      );
    }

    // In update mode, use React Hook Form's built-in isDirty flag
    return isDirty;
  }, [isNew, isDirty, form]);

  // Calculate changed fields for update mutations
  const changedFields = useMemo(() => {
    if (isNew) {
      // In create mode - return all current values if required fields are filled
      return hasChanges ? form.getValues() : {};
    }

    // In update mode, use React Hook Form's dirtyFields to identify changes
    const dirtyFields = form.formState.dirtyFields;
    const currentValues = form.getValues();
    const changes: Partial<VariantFormData> = {};

    // Only include fields that are marked as dirty
    (Object.keys(dirtyFields) as Array<keyof VariantFormData>).forEach(
      (key) => {
        (changes as Record<string, unknown>)[key] = currentValues[key];
      },
    );

    return changes;
  }, [isNew, hasChanges, form]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (data: VariantFormData) => {
      try {
        // If we're adding a variant to a new (not yet created) product, save to draft
        if (isNew && isNewProduct) {
          addVariantDraft(data);
          router.back();
          onSuccess?.();
          return;
        }

        if (isNew) {
          // Create new variant for existing product
          const hasDimensions =
            (data.dimensions.height !== '' &&
              data.dimensions.height !== null) ||
            (data.dimensions.width !== '' && data.dimensions.width !== null) ||
            (data.dimensions.length !== '' && data.dimensions.length !== null);

          const input = {
            productId,
            price:
              typeof data.price === 'string'
                ? parseFloat(data.price)
                : data.price,
            condition:
              data.condition === 'NEW'
                ? ConditionEnum.New
                : data.condition === 'USED'
                  ? ConditionEnum.Used
                  : data.condition === 'REFURBISHED'
                    ? ConditionEnum.Refurbished
                    : ConditionEnum.New,
            attributes: data.attributes.map((attr) => ({
              key: attr.key,
              value: attr.value,
            })),
            ...(hasDimensions && {
              dimension: {
                height:
                  data.dimensions.height === '' ||
                  data.dimensions.height === null
                    ? 0
                    : typeof data.dimensions.height === 'string'
                      ? parseFloat(data.dimensions.height)
                      : data.dimensions.height,
                width:
                  data.dimensions.width === '' || data.dimensions.width === null
                    ? 0
                    : typeof data.dimensions.width === 'string'
                      ? parseFloat(data.dimensions.width)
                      : data.dimensions.width,
                length:
                  data.dimensions.length === '' ||
                  data.dimensions.length === null
                    ? 0
                    : typeof data.dimensions.length === 'string'
                      ? parseFloat(data.dimensions.length)
                      : data.dimensions.length,
              },
            }),
            weight:
              data.weight === '' || data.weight === null
                ? null
                : typeof data.weight === 'string'
                  ? parseFloat(data.weight)
                  : data.weight,
            sku: data.codes.sku || '',
            upc: data.codes.upc || null,
            ean: data.codes.ean || null,
            isbn: data.codes.isbn || null,
            barcode: data.codes.barcode || null,
            personalizationOptions: data.personalizationOptions,
            installmentPayments: data.installmentPayments.map((payment) => ({
              months: payment.months,
              interestRate: payment.interestRate,
            })),
            warranties: data.warranties.map((warranty) => ({
              months: warranty.months,
              coverage: warranty.coverage,
              instructions: warranty.instructions,
            })),
            variantCover: data.variantCover || undefined,
            variantMedia: data.variantMedia.map((url, index) => ({
              url,
              mediaType: MediaTypeEnum.Image,
              position: index + 1,
            })),
          };

          const result = await addVariant(productId, input);
          if (result) {
            router.push(`/products/${productId}`);
            onSuccess?.();
          }
          return;
        }

        // Update existing variant
        if (!variantId) {
          throw new Error('Variant ID is required for update');
        }

        // Update existing variant - only send changed fields
        if (Object.keys(changedFields).length === 0) {
          onSuccess?.();
          return;
        }

        // For variant updates, we need to send the complete variant data
        // since the backend expects a full variant object in the variants array
        const hasDimensions =
          (data.dimensions.height !== '' && data.dimensions.height !== null) ||
          (data.dimensions.width !== '' && data.dimensions.width !== null) ||
          (data.dimensions.length !== '' && data.dimensions.length !== null);

        const variantInput = {
          price:
            typeof data.price === 'string'
              ? parseFloat(data.price)
              : data.price,
          condition:
            data.condition === 'NEW'
              ? ConditionEnum.New
              : data.condition === 'USED'
                ? ConditionEnum.Used
                : data.condition === 'REFURBISHED'
                  ? ConditionEnum.Refurbished
                  : ConditionEnum.New,
          attributes: data.attributes.map((attr) => ({
            key: attr.key,
            value: attr.value,
          })),
          ...(hasDimensions && {
            dimension: {
              height:
                data.dimensions.height === '' || data.dimensions.height === null
                  ? 0
                  : typeof data.dimensions.height === 'string'
                    ? parseFloat(data.dimensions.height)
                    : data.dimensions.height,
              width:
                data.dimensions.width === '' || data.dimensions.width === null
                  ? 0
                  : typeof data.dimensions.width === 'string'
                    ? parseFloat(data.dimensions.width)
                    : data.dimensions.width,
              length:
                data.dimensions.length === '' || data.dimensions.length === null
                  ? 0
                  : typeof data.dimensions.length === 'string'
                    ? parseFloat(data.dimensions.length)
                    : data.dimensions.length,
            },
          }),
          weight:
            data.weight === '' || data.weight === null
              ? null
              : typeof data.weight === 'string'
                ? parseFloat(data.weight)
                : data.weight,
          sku: data.codes.sku || '',
          upc: data.codes.upc || null,
          ean: data.codes.ean || null,
          isbn: data.codes.isbn || null,
          barcode: data.codes.barcode || null,
          personalizationOptions: data.personalizationOptions,
          installmentPayments: data.installmentPayments.map((payment) => ({
            months: payment.months,
            interestRate: payment.interestRate,
          })),
          warranties: data.warranties.map((warranty) => ({
            months: warranty.months,
            coverage: warranty.coverage,
            instructions: warranty.instructions,
          })),
          variantCover: data.variantCover || undefined,
          variantMedia: data.variantMedia.map((url, index) => ({
            url,
            mediaType: MediaTypeEnum.Image,
            position: index + 1,
          })),
        };

        const result = await updateVariant(productId, [variantInput]);

        if (result) {
          onSuccess?.();
        }
      } catch (_error) {}
    },
    [
      isNew,
      isNewProduct,
      variantId,
      productId,
      addVariant,
      updateVariant,
      addVariantDraft,
      router,
      onSuccess,
      changedFields,
    ],
  );

  // Handle form cancellation
  const handleCancel = useCallback(() => {
    form.reset(originalValues);
    onCancel?.();
  }, [form, originalValues, onCancel]);

  return {
    form,
    handleSubmit,
    handleCancel,
    isSubmitting: isNew ? isAdding : isUpdating,
    loading: contextLoading,
    hasChanges,
    changedFields,
    variantFormSchema,
    variant,
  };
}

export type { VariantFormData };
