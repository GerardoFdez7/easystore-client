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
import {
  ConditionEnum,
  MediaTypeEnum,
  TypeEnum,
  type Variant,
} from '@graphql/generated';

// Create Zod schema factory that uses translations
const createVariantFormSchema = (
  t: (key: string) => string,
  isPhysical: boolean = false,
) =>
  z.object({
    price: z.number().nonnegative({ message: t('priceNonNegative') }), // Unnused
    condition: z.enum(['NEW', 'USED', 'REFURBISHED'], {
      errorMap: () => ({ message: t('conditionRequired') }),
    }),
    attributes: z
      .array(
        z.object({
          key: z.string().min(1, { message: t('attributeKeyRequired') }),
          value: z.string().min(1, { message: t('attributeValueRequired') }),
        }),
      )
      .min(1, { message: t('attributesRequired') })
      .max(30, { message: t('attributeLimitReached') }),
    dimensions: z.object({
      height: isPhysical
        ? z.coerce.number().positive({ message: t('heightRequired') })
        : z.coerce
            .number()
            .nonnegative({ message: t('heightNonNegative') })
            .optional(),
      width: isPhysical
        ? z.coerce.number().positive({ message: t('widthRequired') })
        : z.coerce
            .number()
            .nonnegative({ message: t('widthNonNegative') })
            .optional(),
      length: isPhysical
        ? z.coerce.number().positive({ message: t('lengthRequired') })
        : z.coerce
            .number()
            .nonnegative({ message: t('lengthNonNegative') })
            .optional(),
    }),
    weight: isPhysical
      ? z.coerce.number().positive({ message: t('weightRequired') })
      : z.coerce
          .number()
          .nonnegative({ message: t('weightNonNegative') })
          .optional(),
    codes: z.object({
      sku: z
        .string()
        .trim()
        .min(2, { message: t('skuRequired') }),
      upc: z
        .string()
        .trim()
        .refine((val) => !val || /^\d{12}$/.test(val), {
          message: t('upcInvalid'),
        })
        .nullable()
        .optional(),
      ean: z
        .string()
        .trim()
        .refine((val) => !val || /^(\\d{8}|\\d{13})$/.test(val), {
          message: t('eanInvalid'),
        })
        .nullable()
        .optional(),
      isbn: z
        .string()
        .trim()
        .refine(
          (val) =>
            !val || /^(?:(?:\\d{9}[\\dX])|(?:(?:978|979)\\d{10}))$/.test(val),
          {
            message: t('isbnInvalid'),
          },
        )
        .nullable()
        .optional(),
      barcode: z.string().trim().nullable().optional(),
    }),
    personalizationOptions: z.array(z.string()),
    installmentPayments: z.array(
      z.object({
        months: z
          .number()
          .int()
          .min(1, { message: t('monthsMinValue') }),
        interestRate: z.number().min(0, { message: t('interestRateMinValue') }),
      }),
    ),
    warranties: z.array(
      z.object({
        months: z
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
  const { addVariantDraft, productDraft } = useProductCreation();

  // Get variant data from context only when editing (not creating new)
  const {
    variant,
    product,
    loading: contextLoading,
  } = useVariantFromProducts(isNew ? '' : variantId || '');

  // Determine if product is physical
  const isPhysical = useMemo(() => {
    if (isNewProduct && productDraft) {
      return productDraft.productType === TypeEnum.Physical;
    }
    if (product) {
      return product.productType === TypeEnum.Physical;
    }
    return true; // Default to true (Physical) for new products
  }, [isNewProduct, productDraft, product]);

  const variantFormSchema = createVariantFormSchema(t, isPhysical);

  const originalValues = useMemo<VariantFormData>(() => {
    // Mode is 'create' or variant data is not yet available
    if (isNew || !variant) {
      return {
        price: 0,
        condition: 'NEW',
        attributes: [],
        dimensions: {
          height: isPhysical ? 0 : undefined,
          width: isPhysical ? 0 : undefined,
          length: isPhysical ? 0 : undefined,
        },
        weight: isPhysical ? 0 : undefined,
        codes: {
          sku: '',
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
        height: variant.dimension?.height || 0,
        width: variant.dimension?.width || 0,
        length: variant.dimension?.length || 0,
      },
      weight: variant.weight || 0,
      codes: {
        sku: variant.sku,
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
  }, [variant, isNew, isPhysical]);

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
            (data.dimensions.height !== undefined &&
              data.dimensions.height > 0) ||
            (data.dimensions.width !== undefined &&
              data.dimensions.width > 0) ||
            (data.dimensions.length !== undefined &&
              data.dimensions.length > 0);

          const input = {
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
                height: data.dimensions.height ?? 0,
                width: data.dimensions.width ?? 0,
                length: data.dimensions.length ?? 0,
              },
            }),
            weight:
              data.weight === 0 || data.weight === null
                ? null
                : typeof data.weight === 'string'
                  ? parseFloat(data.weight)
                  : data.weight,
            sku: data.codes.sku,
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
          (data.dimensions.height !== undefined &&
            data.dimensions.height > 0) ||
          (data.dimensions.width !== undefined && data.dimensions.width > 0) ||
          (data.dimensions.length !== undefined && data.dimensions.length > 0);

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
              height: data.dimensions.height ?? 0,
              width: data.dimensions.width ?? 0,
              length: data.dimensions.length ?? 0,
            },
          }),
          weight: data.weight ?? null,
          sku: data.codes.sku,
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
