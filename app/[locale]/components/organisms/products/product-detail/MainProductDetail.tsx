'use client';

import VariantsFormField from '@molecules/products/product-detail/VariantsFormField';
import SustainabilityFormField from '@molecules/products/product-detail/SustainabilityFormField';
import NameFormField from '@molecules/products/product-detail/NameFormField';
import BrandManufacturerFormField from '@molecules/products/product-detail/BrandManufacturerFormField';
import ShortLongDescriptionFormField from '@molecules/products/product-detail/ShortLongDescriptionFormField';
import TypeProductFormField from '@molecules/products/product-detail/TypeProductFormField';
import { Form } from '@shadcn/ui/form';
import MediaUploader from '@organisms/shared/MediaUploader';
import TagsFormField from '@molecules/products/product-detail/TagsFormField';
import CategoryFormField from '@molecules/products/product-detail/CategoryFormField';
import SaveButton from '@atoms/shared/SaveButton';
import ProductActions from '@atoms/shared/ProductActions';
import { useProduct } from '@hooks/domains/products';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const {
    form,
    handleSubmit,
    isSubmitting,
    isDirty,
    product,
    initialMedia,
    handleMediaProcessed,
    productId,
  } = useProduct({
    productId: param,
    isNew,
  });

  return (
    <main className="mx-4 max-w-3xl sm:mx-auto">
      <Form {...form}>
        <form
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
              productId={productId}
              productIsArchived={product?.isArchived ?? false}
            />
          </div>
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
          <NameFormField />
          <ShortLongDescriptionFormField />
          <CategoryFormField />
          <VariantsFormField productId={productId} />
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
        </form>
      </Form>
    </main>
  );
}
