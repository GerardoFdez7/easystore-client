'use client';

import { useEffect, useMemo, useCallback, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useProductManagement, useGetProductById } from './';
import { useProductCreation } from '@contexts/ProductCreationContext';
import {
  Media,
  TypeEnum,
  MediaTypeEnum,
  ConditionEnum,
} from '@graphql/generated';

// Create Zod schema factory that uses translations
const createProductFormSchema = (
  t: (key: string) => string,
  isNew: boolean = false,
  variantsDraftLength: number = 0,
) =>
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
    cover: z.union([
      z
        .string()
        .min(1, { message: t('coverRequired') })
        .url({ message: t('mediaUrlInvalid') }),
      z.object({
        url: z.string().url({ message: t('mediaUrlInvalid') }),
        mediaType: z.string(),
        position: z.number(),
      }),
    ]),
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
        categoryDescription: z.string().optional(),
        categoryCover: z.string().optional(),
      }),
    ),
    variants: z
      .array(z.any())
      .refine(
        (variants) => {
          // For new products, check variantsDraft length instead of form variants
          if (isNew) {
            return variantsDraftLength >= 1;
          }
          // For existing products, check form variants
          return variants.length >= 1;
        },
        { message: t('variantsRequired') },
      )
      .refine(
        (variants) => {
          // For new products, check variantsDraft length instead of form variants
          if (isNew) {
            return variantsDraftLength <= 20;
          }
          // For existing products, check form variants
          return variants.length <= 20;
        },
        { message: t('variantLimitReached') },
      ),
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
    media: z.array(
      z.union([
        z.string().url({ message: t('mediaUrlInvalid') }),
        z.object({
          url: z.string().url({ message: t('mediaUrlInvalid') }),
          mediaType: z.string(),
          position: z.number(),
        }),
      ]),
    ),
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
  markUserInteraction: () => void;
  // Loading states
  isSubmitting: boolean;
  loading: boolean;
  // Change tracking
  hasChanges: boolean;
  changedFields: Partial<ProductFormData>;
  // Schema and data
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
  const router = useRouter();
  const { createProduct, updateProduct, isCreating, isUpdating } =
    useProductManagement();

  // Get product creation context for new products
  const { productDraft, setProductDraft, variantsDraft, clearAllDrafts } =
    useProductCreation();

  // Get product data from context only when editing (not creating new)
  const { product, loading: contextLoading } = useGetProductById(
    isNew ? '' : productId || '',
  );

  // Track if user has interacted with the form to avoid immediate validation
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const productFormSchema = useMemo(
    () => createProductFormSchema(t, isNew, variantsDraft.length),
    [t, isNew, variantsDraft.length],
  );

  const originalValues = useMemo<ProductFormData>(() => {
    // Mode is 'create' - use draft data if available
    if (isNew) {
      return {
        name: productDraft?.name || '',
        shortDescription: productDraft?.shortDescription || '',
        longDescription: productDraft?.longDescription || null,
        brand: productDraft?.brand || null,
        manufacturer: productDraft?.manufacturer || null,
        cover: productDraft?.cover || '',
        productType:
          (productDraft?.productType as TypeEnum.Physical | TypeEnum.Digital) ||
          TypeEnum.Physical,
        tags: productDraft?.tags || [],
        categories: productDraft?.categories || [],
        variants: variantsDraft || [],
        sustainabilities: productDraft?.sustainabilities || [],
        media: productDraft?.media || [],
      };
    }

    // Mode is 'update' - product data not yet available
    if (!product) {
      return {
        name: '',
        shortDescription: '',
        longDescription: null,
        brand: null,
        manufacturer: null,
        cover: '',
        productType: TypeEnum.Physical,
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
        (product.productType as TypeEnum.Physical | TypeEnum.Digital) ||
        TypeEnum.Physical,
      tags: product.tags?.filter((tag): tag is string => Boolean(tag)) || [],
      categories:
        product.categories?.map((cat) => {
          const categoryItem = {
            categoryId: cat.categoryId || '',
            categoryName: cat.categoryName || '',
            categoryDescription: cat.categoryDescription || '',
            categoryCover: cat.categoryCover || '',
          };
          return categoryItem;
        }) || [],
      variants: product.variants || [],
      sustainabilities: product.sustainabilities || [],
      media:
        product.media?.map((mediaItem: Media) => ({
          url: mediaItem.url,
          mediaType: mediaItem.mediaType,
          position: mediaItem.position,
        })) || [],
    };
  }, [product, isNew, productDraft, variantsDraft]);

  // Initialize form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: originalValues,
    mode: 'onBlur', // Validate when user leaves a field, not immediately
    reValidateMode: 'onChange', // Re-validate on change after first validation
  });

  // Use formState to track isDirty - this causes re-renders when form changes
  const { isDirty } = useFormState({ control: form.control });

  // Reset form when product data loads or changes (only in edit mode)
  useEffect(() => {
    if (product && !isNew) {
      form.reset(originalValues);
    }
  }, [product, isNew, originalValues, form]);

  // Save draft on form change (only in create mode)
  useEffect(() => {
    if (!isNew) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    // Subscribe to form changes without causing component re-renders
    const subscription = form.watch((values) => {
      // Clear previous timeout
      clearTimeout(timeoutId);

      // Debounce: save draft after 500ms of inactivity
      timeoutId = setTimeout(() => {
        setProductDraft(values as Partial<ProductFormData>);
      }, 500);
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [isNew, form, setProductDraft]);

  // Calculate hasChanges using isDirty from React Hook Form
  const hasChanges = useMemo(() => {
    if (isNew) {
      // In create mode - check if required fields are filled
      const currentValues = form.getValues();
      const coverUrl =
        typeof currentValues.cover === 'string'
          ? currentValues.cover
          : currentValues.cover?.url || '';
      return (
        currentValues.name.trim().length >= 2 &&
        currentValues.shortDescription.trim().length >= 10 &&
        coverUrl.trim().length > 0
      );
    }

    // isDirty automatically tracks if form values differ from defaultValues
    return isDirty;
  }, [isNew, isDirty, form]);

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
            cover: typeof data.cover === 'string' ? data.cover : data.cover.url,
            productType: data.productType as TypeEnum,
            tags: data.tags || null,
            categories: data.categories?.map((cat) => ({
              categoryId: cat.categoryId,
            })),
            sustainabilities: data.sustainabilities?.map((sus) => ({
              certification: sus.certification,
              recycledPercentage: sus.recycledPercentage,
            })),
            media: data.media?.map(
              (
                item:
                  | string
                  | { url: string; mediaType: string; position: number },
                index: number,
              ) => {
                // Handle both old format (string) and new format (object with mediaType)
                if (typeof item === 'string') {
                  // Legacy format: detect type from URL extension
                  return {
                    url: item,
                    position: index + 1,
                    mediaType: (item.includes('.mp4') ||
                    item.includes('.webm') ||
                    item.includes('.avi') ||
                    item.includes('.mov')
                      ? 'VIDEO'
                      : 'IMAGE') as MediaTypeEnum,
                  };
                }
                // New format: use provided mediaType
                return {
                  url: item.url,
                  position: index + 1,
                  mediaType: item.mediaType as MediaTypeEnum,
                };
              },
            ),
            variants: variantsDraft.map((variant) => ({
              price: variant.price,
              condition: variant.condition as ConditionEnum,
              attributes: variant.attributes?.map((attr) => ({
                key: attr.key,
                value: attr.value,
              })),
              dimension:
                variant.dimensions?.height &&
                variant.dimensions?.width &&
                variant.dimensions?.length
                  ? {
                      height: variant.dimensions.height,
                      width: variant.dimensions.width,
                      length: variant.dimensions.length,
                    }
                  : undefined,
              weight: variant.weight || undefined,
              sku: variant.codes.sku || '',
              upc: variant.codes.upc,
              ean: variant.codes.ean,
              isbn: variant.codes.isbn,
              barcode: variant.codes.barcode,
              personalizationOptions: variant.personalizationOptions,
              installmentPayments: variant.installmentPayments?.map(
                (payment) => ({
                  months: payment.months,
                  interestRate: payment.interestRate,
                }),
              ),
              warranties: variant.warranties?.map((warranty) => ({
                months: warranty.months,
                coverage: warranty.coverage,
                instructions: warranty.instructions,
              })),
              variantCover: !variant.variantCover
                ? undefined
                : typeof variant.variantCover === 'string'
                  ? variant.variantCover || undefined
                  : variant.variantCover.url || undefined,
              variantMedia: variant.variantMedia?.map(
                (
                  item:
                    | string
                    | { url: string; mediaType: string; position: number },
                  index: number,
                ) => {
                  // Handle both old format (string) and new format (object with mediaType)
                  if (typeof item === 'string') {
                    // Legacy format: detect type from URL extension
                    return {
                      url: item,
                      position: index + 1,
                      mediaType: (item.includes('.mp4') ||
                      item.includes('.webm') ||
                      item.includes('.avi') ||
                      item.includes('.mov')
                        ? 'VIDEO'
                        : 'IMAGE') as MediaTypeEnum,
                    };
                  }
                  // New format: use provided mediaType
                  return {
                    url: item.url,
                    position: index + 1,
                    mediaType: item.mediaType as MediaTypeEnum,
                  };
                },
              ),
            })),
          };

          const result = await createProduct(input);

          if (result) {
            form.reset(data);
            clearAllDrafts();
            router.push('/products');
            onSuccess?.();
          }
          return;
        }

        // Update existing product
        if (!productId) {
          throw new Error('Product ID is required for update');
        }

        // Calculate changed fields at submission time
        const dirtyFields = form.formState.dirtyFields;
        const changedFields: Partial<ProductFormData> = {};

        // Only include fields that are marked as dirty and exclude variants
        (Object.keys(dirtyFields) as Array<keyof ProductFormData>).forEach(
          (key) => {
            if (key !== 'variants') {
              (changedFields as Record<string, unknown>)[key] = data[key];
            }
          },
        );

        // Update existing product - only send changed fields
        if (Object.keys(changedFields).length === 0) {
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
              fieldsToUpdate.cover =
                typeof value === 'string'
                  ? value
                  : (value as { url: string })?.url || '';
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
              fieldsToUpdate.media = (
                value as Array<
                  string | { url: string; mediaType: string; position: number }
                >
              )?.map(
                (
                  item:
                    | string
                    | { url: string; mediaType: string; position: number },
                  index: number,
                ) => {
                  // Handle both old format (string) and new format (object with mediaType)
                  if (typeof item === 'string') {
                    // Legacy format: detect type from URL extension
                    return {
                      url: item,
                      position: index + 1,
                      mediaType: (item.includes('.mp4') ||
                      item.includes('.webm') ||
                      item.includes('.avi') ||
                      item.includes('.mov')
                        ? 'VIDEO'
                        : 'IMAGE') as MediaTypeEnum,
                    };
                  }
                  // New format: use provided mediaType
                  return {
                    url: item.url,
                    position: index + 1,
                    mediaType: item.mediaType as MediaTypeEnum,
                  };
                },
              );
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
      form,
      variantsDraft,
      clearAllDrafts,
      router,
    ],
  );

  // Calculate changed fields for debugging/logging purposes
  const changedFields = useMemo(() => {
    if (isNew) {
      return hasChanges ? form.getValues() : {};
    }

    const dirtyFields = form.formState.dirtyFields;
    const currentValues = form.getValues();
    const changes: Partial<ProductFormData> = {};

    (Object.keys(dirtyFields) as Array<keyof ProductFormData>).forEach(
      (key) => {
        if (key !== 'variants') {
          (changes as Record<string, unknown>)[key] = currentValues[key];
        }
      },
    );

    return changes;
    // We need isDirty to force recalculation when form changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, hasChanges, isDirty, form]);

  // Handle form cancellation
  const handleCancel = useCallback(() => {
    form.reset(originalValues);
    onCancel?.();
  }, [form, originalValues, onCancel]);

  // Mark that user has interacted with the form
  const markUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  }, [hasUserInteracted]);

  return {
    form,
    handleSubmit,
    handleCancel,
    markUserInteraction,
    isSubmitting: isNew ? isCreating : isUpdating,
    loading: contextLoading,
    hasChanges,
    changedFields,
    productFormSchema,
    product,
  };
}

export type { ProductFormData };
