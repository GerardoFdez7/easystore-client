'use client';

import InputProduct from '@atoms/product-detail/InputProduct';
import Description from '@atoms/product-detail/Description';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import TableVariants from '@molecules/product-detail/TableVariants';
import SustainabilityFormField from '@molecules/product-detail/SustainabilityFormField';
import { Form, FormField, FormItem, FormMessage } from '@shadcn/ui/form';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import { useGetProductById } from '@hooks/domains/products/useGetProductById';
import MediaUploader from '@organisms/shared/MediaUploader';
import type {
  Sustainability,
  Category,
  Variant,
} from '@lib/utils/types/product';
import type { Media } from '@lib/graphql/generated';
import TagsFormField from '@molecules/product-detail/TagsFormField';
import CategoryFormField from '@molecules/product-detail/CategoryFormField';
import SaveButton from '@atoms/shared/SaveButton';
import { useUpdateProduct } from '@hooks/domains/products/useUpdateProduct';
import { toast } from 'sonner';
import ProductActions from '@atoms/shared/ProductActions';

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
  productType: string;
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
  const { product, refetch } = useGetProductById(param);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastResetProductRef = useRef<string | null>(null);

  // Callback to refresh product data after archive/restore operations
  const handleProductUpdate = () => {
    void refetch();
  };

  // Initialize form with default values
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      brand: '',
      cover: '',
      longDescription: '',
      shortDescription: '',
      manufacturer: '',
      productType: '',
      tags: [],
      categories: [],
      variants: [],
      sustainabilities: [],
      media: [],
    },
  });

  // Get dirty fields to determine if Save button should be enabled
  const { dirtyFields, isDirty } = form.formState;

  // Watch productType specifically to ensure proper synchronization
  const currentProductType = form.watch('productType');

  // Helper function to get only the changed fields
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
    if (!isDirty) return; // Don't submit if no changes

    setIsSubmitting(true);
    try {
      const changedFields = getChangedFields(formData);

      // Use bulk update function - validates all fields first, then makes single API call
      const result = await actions.updateMultipleFields(changedFields);

      if (result.success) {
        // Reset form dirty state after successful submission
        form.reset(formData);
      } else {
        // Show validation errors
        toast.error('Validation Error', {
          description: result.error,
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when product data is loaded
  useEffect(() => {
    if (!isNew && product && product.id) {
      // Only reset if we haven't reset for this specific product already
      if (lastResetProductRef.current !== product.id) {
        const formData = {
          name: product.name || '',
          brand: product.brand ?? '',
          cover: product.cover || '',
          manufacturer: product.manufacturer ?? '',
          shortDescription: product.shortDescription || '',
          longDescription: product.longDescription ?? '',
          productType:
            product.productType === null || product.productType === undefined
              ? ''
              : String(product.productType), // Ensure it's a string
          tags:
            product.tags?.filter((tag): tag is string => Boolean(tag)) || [],
          categories:
            product.categories?.map((cat) => ({
              categoryId: cat.categoryId,
              categoryName: cat.categoryName ?? undefined,
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
            <ProductActions
              singleMode={true}
              productId={param}
              productIsArchived={product?.isArchived ?? false}
              onDeleteComplete={handleProductUpdate}
            />
            {/* Title */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <InputProduct
                    label="Name"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Short Description */}
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <Description
                    label="Short Description"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Long Description */}
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <Description
                    label="Long Description"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multimedia */}
            <MediaUploader
              multiple={true}
              maxImageSize={10}
              maxVideoSize={50}
              onUploadSuccess={(url) => {
                console.log('Media uploaded successfully:', url);
              }}
              onUploadError={(error) => {
                console.error('Media upload error:', error);
              }}
            />

            {/* Category */}
            <CategoryFormField />

            {/* Variants */}
            <FormField
              control={form.control}
              name="variants"
              render={({ field: { value: variants = [] } }) => (
                <FormItem>
                  <TableVariants variants={variants} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type Product */}
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <TypeProduct
                    value={currentProductType || field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <TagsFormField />

            {/* Brand & Manufacturer */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <InputProduct
                      label="Brand"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <InputProduct
                      label="Manufacturer"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sustainability */}
            <SustainabilityFormField />

            <div className="flex justify-end">
              <SaveButton
                type="submit"
                isLoading={isSubmitting}
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
