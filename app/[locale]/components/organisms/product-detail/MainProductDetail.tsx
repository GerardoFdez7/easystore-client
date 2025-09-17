'use client';

import InputProduct from '@atoms/product-detail/InputProduct';
import Description from '@atoms/product-detail/Description';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import TableVariants from '@molecules/product-detail/TableVariants';
import SustainabilityFormField from '@molecules/product-detail/SustainabilityFormField';
import DeleteProduct from '@atoms/product-detail/DeleteProduct';
import ArchivedProduct from '@atoms/product-detail/ArchivedProduct';
import ButtonCancel from '@atoms/product-detail/ButtonCancel';
import ButtonSave from '@atoms/product-detail/ButtonSave';
import { Form, FormField, FormItem, FormMessage } from '@shadcn/ui/form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetProductById } from '@hooks/domains/products/useGetProductById';
import MediaUploader from '@organisms/shared/MediaUploader';
// import { useTestMultipleMediaPersistence } from '@hooks/useTestMultipleMediaPersistence';
// import { toast } from 'sonner';
// import { CheckCircle, Loader2 } from 'lucide-react';
// import { Button } from '@shadcn/ui/button';
import type {
  Sustainability,
  Category,
  Variant,
} from '@lib/utils/types/product';
import type { Media } from '@lib/graphql/generated';
import TagsFormField from '@molecules/product-detail/TagsFormField';
import CategoryFormField from '@molecules/product-detail/CategoryFormField';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const { product } = useGetProductById(param);
  // const [setUploadResults] = useState<UploadResult[]>([]);
  // const { persistMultipleMedia } = useTestMultipleMediaPersistence();

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      name: '',
      brand: '',
      cover: '',
      longDescription: '',
      shortDescription: '',
      manufacturer: '',
      productType: '',
      tags: [] as string[],
      categories: [] as Category[],
      variants: [] as Variant[],
      sustainabilities: [] as Sustainability[],
      media: [] as string[],
    },
  });

  // Reset form when product data is loaded
  useEffect(() => {
    if (!isNew && product) {
      console.log('Loading product data:', product);
      form.reset({
        name: product.name || '',
        brand: product.brand || '',
        cover: product.cover || '',
        manufacturer: product.manufacturer || '',
        shortDescription: product.shortDescription || '',
        longDescription: product.longDescription || '',
        productType: product.productType || '',
        tags: product.tags?.filter((tag): tag is string => Boolean(tag)) || [],
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
      });
    } else if (isNew) {
      // Reset form to default values for new product
      form.reset({
        name: '',
        brand: '',
        cover: '',
        manufacturer: '',
        shortDescription: '',
        longDescription: '',
        productType: '',
        tags: [],
        categories: [],
        sustainabilities: [],
        media: [],
      });
    }
  }, [product, isNew, form]);

  // //Multimedia
  // const handleUploadSuccess = (url: string) => {
  //   const result: UploadResult = {
  //     url,
  //     timestamp: new Date(),
  //     status: 'success',
  //   };

  //   setUploadResults((prev) => [result, ...prev]);
  //   toast.success('File uploaded successfully!');
  // };

  // const handleUploadError = (error: string) => {
  //   const result: UploadResult = {
  //     url: '',
  //     timestamp: new Date(),
  //     status: 'error',
  //     message: error,
  //   };

  //   setUploadResults((prev) => [result, ...prev]);
  //   toast.error('Upload failed!', {
  //     description: error,
  //   });
  // };

  return (
    <Form {...form}>
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Title */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <InputProduct label="Title" value={field.value} />
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
                <Description label="Short Description" value={field.value} />
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
                <Description label="Long Description" value={field.value} />
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

          {/* <CategoryFormField /> */}

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
                <TypeProduct value={field.value} />
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
                  <InputProduct label="Brand" value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <InputProduct label="Manufacturer" value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sustainability */}
          <FormField
            control={form.control}
            name="sustainabilities"
            render={({ field: { value: sustainabilities = [] } }) => (
              <SustainabilityFormField sustainabilities={sustainabilities} />
            )}
          />

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-8">
            <div className="flex justify-center gap-4 pb-6">
              <DeleteProduct />
              <ArchivedProduct />
            </div>
            <div className="flex justify-end gap-4">
              <ButtonCancel />
              <ButtonSave />
            </div>
          </div>
        </div>
      </main>
    </Form>
  );
}
