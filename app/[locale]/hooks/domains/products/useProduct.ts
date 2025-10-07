import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProduct, useGetProductById } from '@hooks/domains/products';
import { useProductMedia } from '@hooks/useMultipleMediaPersistence';
import type {
  Sustainability,
  Category,
  Variant,
} from '@lib/utils/types/product';
import type { Media } from '@lib/graphql/generated';

interface UseProductProps {
  productId: string;
  isNew: boolean;
}

type ProductFormData = {
  name: string;
  brand: string | null;
  cover: string;
  longDescription: string | null;
  shortDescription: string;
  manufacturer: string | null;
  productType: string;
  tags: string[];
  categories: Category[];
  variants: Variant[];
  sustainabilities: Sustainability[];
  media: string[];
};

export function useProduct({ productId, isNew }: UseProductProps) {
  // Get product data and update actions
  const { actions } = useUpdateProduct(productId);
  const { product } = useGetProductById(productId);

  // Local state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastResetProductRef = useRef<string | null>(null);

  // Media handling
  const { initialMedia, handleMediaProcessed } = useProductMedia({
    product,
    actions,
  });

  // Form setup with default values
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      brand: '',
      cover: '',
      longDescription: '',
      shortDescription: '',
      manufacturer: '',
      productType: product?.productType ?? '',
      tags: [],
      categories: [],
      variants: [],
      sustainabilities: [],
      media: [],
    },
  });

  // Get dirty fields to determine if Save button should be enabled
  const { dirtyFields, isDirty } = form.formState;

  // Helper function to get only changed fields
  const getChangedFields = (formData: ProductFormData) => {
    const changedFields: Record<string, unknown> = {};

    Object.keys(dirtyFields).forEach((key) => {
      const fieldKey = key as keyof ProductFormData;
      if (dirtyFields[fieldKey]) {
        changedFields[fieldKey] = formData[fieldKey];
      }
    });

    return changedFields;
  };

  // Form submission handler
  const handleSubmit = async (formData: ProductFormData) => {
    if (!isDirty) return;

    setIsSubmitting(true);

    try {
      form.clearErrors();
      const changedFields = getChangedFields(formData);

      const setFieldError = (name: string, error: { message: string }) => {
        form.setError(name as keyof ProductFormData, error);
      };

      const result = await actions.updateMultipleFields(
        changedFields,
        setFieldError,
      );

      if (result.success) {
        form.reset(formData);
      }
    } catch (_error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when product data is loaded
  useEffect(() => {
    if (!isNew && product && product.id) {
      if (lastResetProductRef.current !== product.id) {
        const formData: ProductFormData = {
          name: product.name || '',
          brand: product.brand ?? '',
          cover: product.cover || '',
          manufacturer: product.manufacturer ?? '',
          shortDescription: product.shortDescription || '',
          longDescription: product.longDescription ?? '',
          productType: product.productType ?? '',
          tags:
            product.tags?.filter((tag): tag is string => Boolean(tag)) || [],
          categories:
            product.categories?.map((cat) => ({
              categoryId: cat.categoryId,
              categoryName: cat.categoryName || '',
            })) || [],
          variants:
            product.variants?.map((variant) => ({
              id: variant.id,
              price: variant.price,
              attributes: Array.isArray(variant.attributes)
                ? variant.attributes.map(
                    (attr: { key: string; value: string }) => ({
                      key: attr.key,
                      value: attr.value,
                    }),
                  )
                : [],
              condition: variant.condition || '',
            })) || [],
          sustainabilities: product.sustainabilities || [],
          media: product.media?.map((mediaItem: Media) => mediaItem.url) || [],
        };

        // Reset form with new data
        form.reset(formData);
        lastResetProductRef.current = product.id;
      }
    }
  }, [product, isNew, form]);

  // Cleanup form state when component unmounts
  useEffect(() => {
    return () => {
      form.reset();
      lastResetProductRef.current = null;
    };
  }, [form]);

  return {
    form,
    handleSubmit,
    isSubmitting,
    isDirty,
    product,
    initialMedia,
    handleMediaProcessed,
    productId,
  };
}

export type { ProductFormData };
