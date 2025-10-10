'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useVariantFromProducts } from '@lib/contexts/ProductsContext';
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
        .min(1, { message: t('skuRequired') })
        .nullable(),
      upc: z
        .string()
        .regex(/^\d{12}$/, { message: t('upcInvalid') })
        .nullable()
        .optional(),
      ean: z
        .string()
        .regex(/^(\d{8}|\d{13})$/, { message: t('eanInvalid') })
        .nullable()
        .optional(),
      isbn: z
        .string()
        .regex(/^(97[89])?\d{9}[\dX]$/, { message: t('isbnInvalid') })
        .nullable()
        .optional(),
      barcode: z
        .string()
        .regex(/^(?:(?:\d{9}[\dX])|(?:(?:978|979)\d{10}))$/, {
          message: t('barcodeInvalid'),
        })
        .nullable()
        .optional(),
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
  onSuccess,
  onCancel,
}: UseVariantFormProps): UseVariantFormReturn {
  const t = useTranslations('Products');
  const { addVariant, updateVariant, isAdding, isUpdating } =
    useVariantManagement();

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

  // Reset form when variant data loads or changes (only in edit mode)
  useEffect(() => {
    if (variant && !isNew) {
      form.reset(originalValues);
    }
  }, [variant, isNew, originalValues, form]);

  const watchedValues = form.watch();

  // Calculate changed fields and hasChanges
  const { hasChanges, changedFields } = useMemo(() => {
    if (isNew) {
      // In create mode
      const hasRequiredValues =
        typeof watchedValues.price === 'number' &&
        watchedValues.price > 0 &&
        watchedValues.codes.sku !== null &&
        watchedValues.codes.sku !== '';
      return {
        hasChanges: hasRequiredValues,
        changedFields: hasRequiredValues ? watchedValues : {},
      };
    }

    // In update mode, compare with original values
    const changes: Partial<VariantFormData> = {};
    let hasAnyChanges = false;

    // Helper to deep compare values
    const isEqual = (a: unknown, b: unknown): boolean => {
      if (a === b) {
        return true;
      }
      if (a === null || b === null) {
        return false;
      }
      if (a === undefined || b === undefined) {
        return false;
      }
      if (typeof a !== typeof b) {
        return false;
      }

      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }
        return a.every((item, index) => isEqual(item, b[index]));
      }

      if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a as object);
        const keysB = Object.keys(b as object);
        if (keysA.length !== keysB.length) {
          return false;
        }
        return keysA.every((key) =>
          isEqual(
            (a as Record<string, unknown>)[key],
            (b as Record<string, unknown>)[key],
          ),
        );
      }

      return false;
    };

    (Object.keys(originalValues) as Array<keyof VariantFormData>).forEach(
      (key) => {
        if (!isEqual(watchedValues[key], originalValues[key])) {
          (changes as Record<string, unknown>)[key] = watchedValues[key];
          hasAnyChanges = true;
        }
      },
    );

    return {
      hasChanges: hasAnyChanges,
      changedFields: changes,
    };
  }, [watchedValues, originalValues, isNew]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (data: VariantFormData) => {
      try {
        if (isNew) {
          // Create new variant
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
                    : undefined,
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
            sku: data.codes.sku || null,
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
              position: index,
            })),
          };

          const result = await addVariant(input);
          if (result) {
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

        // Prepare changed fields for update
        const fieldsToUpdate: Record<string, unknown> = {};

        Object.keys(changedFields).forEach((key) => {
          const fieldKey = key as keyof VariantFormData;
          const value = data[fieldKey];

          // Transform price to number
          if (fieldKey === 'price') {
            const priceValue = value as number | string;
            fieldsToUpdate.price =
              typeof priceValue === 'string'
                ? parseFloat(priceValue)
                : priceValue;
            return;
          }

          // Transform weight to number or null
          if (fieldKey === 'weight') {
            const weightValue = value as number | string | null;
            if (weightValue === '' || weightValue === null) {
              fieldsToUpdate.weight = null;
            } else {
              fieldsToUpdate.weight =
                typeof weightValue === 'string'
                  ? parseFloat(weightValue)
                  : weightValue;
            }
            return;
          }

          // Transform dimensions to backend format (singular 'dimension' with Float types)
          if (fieldKey === 'dimensions') {
            const dims = value as VariantFormData['dimensions'];
            fieldsToUpdate.dimension = {
              height:
                dims.height === '' || dims.height === null
                  ? null
                  : typeof dims.height === 'string'
                    ? parseFloat(dims.height)
                    : dims.height,
              width:
                dims.width === '' || dims.width === null
                  ? null
                  : typeof dims.width === 'string'
                    ? parseFloat(dims.width)
                    : dims.width,
              length:
                dims.length === '' || dims.length === null
                  ? null
                  : typeof dims.length === 'string'
                    ? parseFloat(dims.length)
                    : dims.length,
            };
            return;
          }

          // Flatten codes object (backend expects flat structure)
          if (fieldKey === 'codes') {
            const codes = value as VariantFormData['codes'];
            Object.assign(fieldsToUpdate, {
              sku: codes.sku || null,
              upc: codes.upc || null,
              ean: codes.ean || null,
              isbn: codes.isbn || null,
              barcode: codes.barcode || null,
            });
            return;
          }

          // Handle empty variantCover
          if (fieldKey === 'variantCover' && value === '') {
            fieldsToUpdate.variantCover = null;
            return;
          }

          // Default: use value as-is
          fieldsToUpdate[fieldKey] = value;
        });

        const result = await updateVariant(
          variantId,
          productId,
          fieldsToUpdate,
        );

        if (result) {
          onSuccess?.();
        }
      } catch (_error) {}
    },
    [
      isNew,
      variantId,
      productId,
      addVariant,
      updateVariant,
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
