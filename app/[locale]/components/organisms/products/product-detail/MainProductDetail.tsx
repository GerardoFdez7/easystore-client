'use client';

import VariantsFormField from '@molecules/products/product-detail/VariantsFormField';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';
import NameFormField from '@molecules/products/product-detail/NameFormField';
import BrandManufacturerFormField from '@molecules/products/product-detail/BrandManufacturerFormField';
import ShortLongDescriptionFormField from '@molecules/products/product-detail/ShortLongDescriptionFormField';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';
import MediaFormField from '@molecules/products/product-detail/MediaFormField';
import { Form } from '@shadcn/ui/form';
import MediaUploader from '@organisms/shared/MediaUploader';
import type { MultipleMediaUploaderRef } from '@molecules/shared/MultipleMediaUploader';
import type { Sustainability, Category, Variant } from '@lib/types/product';
import { ProcessedData } from '@lib/types/media';
import type { Media } from '@lib/graphql/generated';
import TagsFormField from '@molecules/products/product-detail/TagsFormField';
import CategoryFormField from '@molecules/products/product-detail/CategoryFormField';
import SaveButton from '@atoms/shared/SaveButton';
import ProductActions from '@atoms/shared/ProductActions';
import { useProductMedia } from '@hooks/domains/products/useMultipleMediaPersistence';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const { actions } = useUpdateProduct(param);
  const { product } = useGetProductById(param);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastResetProductRef = useRef<string | null>(null);

  // Track media changes separately from form state
  const [hasMediaChanges, setHasMediaChanges] = useState(false);

  // Create ref for MediaUploader to access handleDoneWrapper directly
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);

  // Callback to refresh product data after archive/restore operations
  const handleProductUpdate = () => {
    void refetch();
  };

  // Use custom hook for media management
  const { initialMedia, handleMediaProcessed } = useProductMedia({
    product,
    actions,
  });

  // Handle media changes from MediaUploader
  const handleMediaChange = (hasChanges: boolean) => {
    setHasMediaChanges(hasChanges);
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
    if (!isDirty && !hasMediaChanges) return; // Don't submit if no changes

    setIsSubmitting(true);
    try {
      // First, trigger media upload if there are media changes
      if (hasMediaChanges && mediaUploaderRef.current) {
        await new Promise<void>((resolve) => {
          // Set up a temporary callback to know when media processing is done
          const originalHandleMediaProcessed = handleMediaProcessed;
          const _tempHandleMediaProcessed = async (
            processedData?: ProcessedData,
          ) => {
            await originalHandleMediaProcessed(processedData);
            resolve();
          };

          // Temporarily replace the callback
          const mediaUploader = mediaUploaderRef.current;
          if (mediaUploader) {
            // Call handleDoneWrapper which will trigger the media processing
            mediaUploader.handleDoneWrapper();
            // Wait a bit for the async operation to complete
            setTimeout(resolve, 1000);
          } else {
            resolve();
          }
        });
      }

      // Then update form fields if there are form changes
      if (isDirty) {
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
          return; // Don't reset media changes if form update failed
        }
      }

      // Reset media changes state after successful operations
      setHasMediaChanges(false);
    } catch (error) {
      console.error('Error updating product:', error);
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
    <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            void form.handleSubmit(handleSubmit)(e);
          }}
          className="space-y-6"
        >
          {/* Main Content */}
          <div className="flex justify-end">
            <ProductActions
              singleMode={true}
              productId={param}
              productIsArchived={product?.isArchived ?? false}
            />
          </div>
          <MediaFormField isSubmitting={isSubmitting} />
          <NameFormField />
          <ShortLongDescriptionFormField />
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
              disabled={(!isDirty && !hasMediaChanges) || isSubmitting}
              size="lg"
              translationKey={isNew ? 'add' : 'save'}
            />
          </div>
        </form>
      </Form>
    </main>
  );
}
