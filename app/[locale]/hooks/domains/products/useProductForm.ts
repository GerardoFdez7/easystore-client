'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useProductManagement } from './useProductManagement';
import { useGetProductById } from './useGetProductById';
import { useProductCreation } from '@lib/contexts/ProductCreationContext';
import type {
  Media,
  TypeEnum,
  MediaTypeEnum,
  ConditionEnum,
} from '@lib/graphql/generated';

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
    variants: z.array(z.any()).optional(),
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

  const productFormSchema = createProductFormSchema(t);

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
          (productDraft?.productType as 'PHYSICAL' | 'DIGITAL') || 'PHYSICAL',
        tags: productDraft?.tags || [],
        categories: productDraft?.categories || [],
        variants: productDraft?.variants || [],
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
  }, [product, isNew, productDraft]);

  // Initialize form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: originalValues,
    mode: 'onChange',
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
      return (
        currentValues.name.trim().length >= 2 &&
        currentValues.shortDescription.trim().length >= 10 &&
        currentValues.cover.trim().length > 0
      );
    }

    // isDirty automatically tracks if form values differ from defaultValues
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
    const changes: Partial<ProductFormData> = {};

    // Only include fields that are marked as dirty and exclude variants
    (Object.keys(dirtyFields) as Array<keyof ProductFormData>).forEach(
      (key) => {
        if (key !== 'variants') {
          (changes as Record<string, unknown>)[key] = currentValues[key];
        }
      },
    );

    return changes;
  }, [isNew, hasChanges, form]);

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
              position: index + 1,
              mediaType: (url.includes('.mp4')
                ? 'VIDEO'
                : 'IMAGE') as MediaTypeEnum,
            })),
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
              sku: variant.codes.sku,
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
              variantCover: variant.variantCover || undefined,
              variantMedia: variant.variantMedia?.map((url, index) => ({
                url,
                position: index + 1,
                mediaType: (url.includes('.mp4')
                  ? 'VIDEO'
                  : 'IMAGE') as MediaTypeEnum,
              })),
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
                position: index + 1,
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
      variantsDraft,
      clearAllDrafts,
      router,
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
