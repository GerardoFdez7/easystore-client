'use client';

import VariantsFormField from '@molecules/products/product-detail/VariantsFormField';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';
import NameFormField from '@molecules/products/product-detail/NameFormField';
import BrandManufacturerFormField from '@molecules/products/product-detail/BrandManufacturerFormField';
import ShortLongDescriptionFormField from '@molecules/products/product-detail/ShortLongDescriptionFormField';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';
import { Form } from '@shadcn/ui/form';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import MediaUploader from '@organisms/shared/MediaUploader';
import type {
  Sustainability,
  Category,
  Variant,
} from '@lib/utils/types/product';
import type { Media } from '@lib/graphql/generated';
import TagsFormField from '@molecules/products/product-detail/TagsFormField';
import CategoryFormField from '@molecules/products/product-detail/CategoryFormField';
import SaveButton from '@atoms/shared/SaveButton';
import { useUpdateProduct, useGetProductById } from '@hooks/domains/products';
import ProductActions from '@atoms/shared/ProductActions';
import { useProductMedia } from '@hooks/useMultipleMediaPersistence';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}

type ProductFormData = {
  name: string;
  brand: string | null;
  cover: string;
  longDescription: string | null;
  shortDescription: string;
  manufacturer: string | null;
  productType: 'PHYSICAL' | 'DIGITAL';
  tags: string[];
  categories: Category[];
  variants: Variant[];
  sustainabilities: Sustainability[];
  media: string[];
};

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const { actions } = useUpdateProduct(param);
  const { product } = useGetProductById(param);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastResetProductRef = useRef<string | null>(null);

  const { initialMedia, handleMediaProcessed } = useProductMedia({
    product,
    actions,
  });

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      brand: '',
      cover: '',
      longDescription: '',
      shortDescription: '',
      manufacturer: '',
      productType: 'PHYSICAL',
      tags: [],
      categories: [],
      variants: [],
      sustainabilities: [],
      media: [],
    },
  });

  // Get dirty fields to determine if Save button should be enabled
  const { dirtyFields, isDirty } = form.formState;

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
  const onSubmit = async (formData: ProductFormData) => {
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
        const resolvedProductType =
          product.productType === null || product.productType === undefined
            ? 'PHYSICAL'
            : String(product.productType);
        const formData: ProductFormData = {
          name: product.name || '',
          brand: product.brand ?? '',
          cover: product.cover || '',
          manufacturer: product.manufacturer ?? '',
          shortDescription: product.shortDescription || '',
          longDescription: product.longDescription ?? '',
          productType: resolvedProductType as 'PHYSICAL' | 'DIGITAL',
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

        // Simple and effective reset
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

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(onSubmit)(e);
          }}
        >
          {/* Main Content */}
          <div className="space-y-8">
            <div className="flex justify-end">
              <ProductActions
                singleMode={true}
                productId={param}
                productIsArchived={product?.isArchived ?? false}
              />
            </div>
            <NameFormField />
            <ShortLongDescriptionFormField />
            {/* Multimedia */}
            <MediaUploader
              multiple={true}
              maxImageSize={10}
              maxVideoSize={50}
              initialMedia={initialMedia}
              onMediaProcessed={handleMediaProcessed}
              onUploadSuccess={(_url) => {
                // Upload success handled by the hook
              }}
              onUploadError={(_error) => {
                // Upload error handled by the hook
              }}
              renderEditButton={(onEdit, isEditing, hasMedia) => (
                <button
                  type="button"
                  onClick={onEdit}
                  disabled={isEditing || !hasMedia || isSubmitting}
                  className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isEditing ? 'Editing...' : 'Edit Media'}
                </button>
              )}
            />
            <CategoryFormField />
            <VariantsFormField productId={param} />
            <TypeProductFormField />
            <TagsFormField />
            <BrandManufacturerFormField />
            <SustainabilityFormField />

            <div className="flex justify-end">
              <SaveButton
                type="submit"
                loading={isSubmitting}
                disabled={!isDirty || isSubmitting}
                size="lg"
              />
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
