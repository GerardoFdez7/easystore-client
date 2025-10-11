'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useProductManagement } from './useProductManagement';
import { useGetProductById } from './useGetProductById';
import type { Media, TypeEnum, MediaTypeEnum } from '@lib/graphql/generated';

// Create Zod schema factory that uses translations
const createProductFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: t('nameTooShort') })
      .max(100, { message: t('nameTooLong') }),
    shortDescription: z
      .string()
      .trim()
      .min(10, { message: t('shortDescriptionTooShort') })
      .max(200, { message: t('shortDescriptionTooLong') }),
    longDescription: z
      .string()
      .trim()
      .nullable()
      .optional()
      .refine((val) => !val || val.length >= 20, {
        message: t('longDescriptionTooShort'),
      })
      .refine((val) => !val || val.length <= 2000, {
        message: t('longDescriptionTooLong'),
      }),
    brand: z
      .string()
      .trim()
      .nullable()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: t('brandTooShort'),
      })
      .refine((val) => !val || val.length <= 100, {
        message: t('brandTooLong'),
      }),
    manufacturer: z
      .string()
      .trim()
      .nullable()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: t('manufacturerTooShort'),
      })
      .refine((val) => !val || val.length <= 100, {
        message: t('manufacturerTooLong'),
      }),
    cover: z
      .string()
      .min(1, { message: t('coverRequired') })
      .url({ message: t('mediaUrlInvalid') }),
    productType: z.enum(['PHYSICAL', 'DIGITAL'], {
      errorMap: () => ({ message: t('productTypeRequired') }),
    }),
    tags: z
      .array(
        z
          .string()
          .min(1, { message: t('tagMustBeNonEmpty') })
          .max(50, { message: t('tagTooLong') }),
      )
      .max(15, { message: t('tooManyTags') })
      .nullable()
      .optional(),
    categories: z.array(
      z.object({
        categoryId: z.string(),
        categoryName: z.string().optional(),
      }),
    ),
    variants: z.array(z.any()).optional(), // Variants are managed separately, not validated here
    sustainabilities: z
      .array(
        z.object({
          certification: z
            .string()
            .min(1, { message: t('certificationRequired') }),
          recycledPercentage: z
            .number()
            .min(0, { message: t('recycledPercentageMin') })
            .max(100, { message: t('recycledPercentageMax') }),
        }),
      )
      .optional(),
    media: z.array(z.string().url({ message: t('mediaUrlInvalid') })),
  });

type ProductFormData = z.infer<ReturnType<typeof createProductFormSchema>>;

interface UseProductFormProps {
  productId: string;
  isNew: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface UseProductFormReturn {
  // Form instance
  form: ReturnType<typeof useForm<ProductFormData>>;

  // Form handlers
  handleSubmit: (data: ProductFormData) => Promise<void>;
  handleCancel: () => void;

  // Loading states
  isSubmitting: boolean;
  loading: boolean;

  // Change detection
  hasChanges: boolean;
  changedFields: Partial<ProductFormData>;

  // Schema for external validation
  productFormSchema: ReturnType<typeof createProductFormSchema>;

  // Product data
  product: ReturnType<typeof useGetProductById>['product'];
}

export function useProductForm({
  productId,
  isNew,
  onSuccess,
  onCancel,
}: UseProductFormProps): UseProductFormReturn {
  const t = useTranslations('Products');
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProductManagement();

  // Get product data from context only when editing (not creating new)
  const { product, loading: contextLoading } = useGetProductById(
    isNew ? '' : productId || '',
  );

  const productFormSchema = createProductFormSchema(t);

  const originalValues = useMemo<ProductFormData>(() => {
    // Mode is 'create' or product data is not yet available
    if (isNew || !product) {
      return {
        name: '',
        shortDescription: '',
        longDescription: null,
        brand: null,
        manufacturer: null,
        cover: '',
        productType: 'PHYSICAL',
        tags: [],
        categories: [],
        variants: [],
        sustainabilities: [],
        media: [],
      };
    }

    // Mode is 'update' and product data is available
    return {
      name: product.name || '',
      shortDescription: product.shortDescription || '',
      longDescription: product.longDescription || null,
      brand: product.brand || null,
      manufacturer: product.manufacturer || null,
      cover: product.cover || '',
      productType:
        (product.productType as 'PHYSICAL' | 'DIGITAL') || 'PHYSICAL',
      tags: product.tags?.filter((tag): tag is string => Boolean(tag)) || [],
      categories:
        product.categories?.map((cat) => ({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName || '',
        })) || [],
      variants: product.variants || [],
      sustainabilities: product.sustainabilities || [],
      media: product.media?.map((mediaItem: Media) => mediaItem.url) || [],
    };
  }, [product, isNew]);

  // Initialize form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: originalValues,
    mode: 'onChange',
  });

  // Reset form when product data loads or changes (only in edit mode)
  useEffect(() => {
    if (product && !isNew) {
      form.reset(originalValues);
    }
  }, [product, isNew, originalValues, form]);

  const watchedValues = form.watch();

  // Calculate changed fields and hasChanges
  const { hasChanges, changedFields } = useMemo(() => {
    if (isNew) {
      // In create mode - check if required fields are filled
      const hasRequiredValues =
        watchedValues.name.trim().length >= 2 &&
        watchedValues.shortDescription.trim().length >= 10 &&
        watchedValues.cover.trim().length > 0;

      return {
        hasChanges: hasRequiredValues,
        changedFields: hasRequiredValues ? watchedValues : {},
      };
    }

    // In update mode, compare with original values
    const changes: Partial<ProductFormData> = {};
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

    (Object.keys(originalValues) as Array<keyof ProductFormData>).forEach(
      (key) => {
        if (key === 'variants') {
          return;
        }
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
    async (data: ProductFormData) => {
      try {
        if (isNew) {
          // Create new product
          const input = {
            name: data.name,
            shortDescription: data.shortDescription,
            longDescription: data.longDescription || null,
            brand: data.brand || null,
            manufacturer: data.manufacturer || null,
            cover: data.cover,
            productType: data.productType as TypeEnum,
            tags: data.tags || null,
            categories: data.categories?.map((cat) => ({
              categoryId: cat.categoryId,
            })),
            sustainabilities: data.sustainabilities?.map((sus) => ({
              certification: sus.certification,
              recycledPercentage: sus.recycledPercentage,
            })),
            media: data.media?.map((url, index) => ({
              url,
              position: index,
              mediaType: (url.includes('.mp4')
                ? 'VIDEO'
                : 'IMAGE') as MediaTypeEnum,
            })),
            variants: [], // Required field for product creation
          };

          const result = await createProduct(input);

          if (result) {
            form.reset(data);
            onSuccess?.();
          }
          return;
        }

        // Update existing product
        if (!productId) {
          throw new Error('Product ID is required for update');
        }

        // Update existing product - only send changed fields
        if (Object.keys(changedFields).length === 0) {
          // No changes to submit
          return;
        }

        // Prepare changed fields for update
        const fieldsToUpdate: Record<string, unknown> = {};

        Object.keys(changedFields).forEach((key) => {
          const fieldKey = key as keyof ProductFormData;
          const value = data[fieldKey];

          switch (fieldKey) {
            case 'name':
              fieldsToUpdate.name = value;
              break;
            case 'shortDescription':
              fieldsToUpdate.shortDescription = value;
              break;
            case 'longDescription':
              fieldsToUpdate.longDescription = value || null;
              break;
            case 'brand':
              fieldsToUpdate.brand = value || null;
              break;
            case 'manufacturer':
              fieldsToUpdate.manufacturer = value || null;
              break;
            case 'cover':
              fieldsToUpdate.cover = value;
              break;
            case 'productType':
              fieldsToUpdate.productType = value as TypeEnum;
              break;
            case 'tags':
              fieldsToUpdate.tags = value || null;
              break;
            case 'categories':
              fieldsToUpdate.categories = (
                value as Array<{ categoryId: string; categoryName?: string }>
              )?.map((cat) => ({
                categoryId: cat.categoryId,
              }));
              break;
            case 'sustainabilities':
              fieldsToUpdate.sustainabilities = (
                value as Array<{
                  certification: string;
                  recycledPercentage: number;
                }>
              )?.map((sus) => ({
                certification: sus.certification,
                recycledPercentage: sus.recycledPercentage,
              }));
              break;
            case 'media':
              fieldsToUpdate.media = (value as string[])?.map((url, index) => ({
                url,
                position: index,
                mediaType: (url.includes('.mp4')
                  ? 'VIDEO'
                  : 'IMAGE') as MediaTypeEnum,
              }));
              break;
          }
        });

        const result = await updateProduct(productId, fieldsToUpdate);

        if (result) {
          form.reset(data);
          onSuccess?.();
        }
      } catch (_error) {}
    },
    [
      isNew,
      productId,
      createProduct,
      updateProduct,
      onSuccess,
      changedFields,
      form,
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
    isSubmitting: isNew ? isCreating : isUpdating,
    loading: contextLoading,
    hasChanges,
    changedFields,
    productFormSchema,
    product,
  };
}

export type { ProductFormData };
