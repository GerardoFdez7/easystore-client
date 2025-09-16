'use client';

import { useState } from 'react';
import InputProduct from '@atoms/product-detail/InputProduct';
import Description from '@atoms/product-detail/Description';
import CategoryFilter from '@molecules/product-detail/CategoryFilter';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import Tags from '@molecules/product-detail/Tags';
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
//import {Product as ProductFormData} from '@lib/consts/products';
import { useTestMultipleMediaPersistence } from '@hooks/useTestMultipleMediaPersistence';
import { toast } from 'sonner';
import { CheckCircle, Loader2, Upload, XCircle } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Badge } from '@shadcn/ui/badge';
import type {
  Sustainability,
  Category,
  Variant,
} from '@lib/utils/types/product';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}
interface UploadResult {
  url: string;
  timestamp: Date;
  status: 'success' | 'error';
  message?: string;
}

export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const { product } = useGetProductById(param);
  const [newTag, setNewTag] = useState('');
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const { persistMultipleMedia } = useTestMultipleMediaPersistence();

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
          product.variants?.map((variant: Variant) => ({
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
      });
    }
  }, [product, isNew, form]);

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = form.getValues('tags') || [];
      form.setValue('tags', [...currentTags, newTag.trim()], {
        shouldDirty: true,
      });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues('tags') || [];
    form.setValue(
      'tags',
      currentTags.filter((_, i) => i !== index),
      {
        shouldDirty: true,
      },
    );
  };

  //Multimedia
  const handleUploadSuccess = (url: string) => {
    const result: UploadResult = {
      url,
      timestamp: new Date(),
      status: 'success',
    };

    setUploadResults((prev) => [result, ...prev]);
    toast.success('File uploaded successfully!');
  };

  const handleUploadError = (error: string) => {
    const result: UploadResult = {
      url: '',
      timestamp: new Date(),
      status: 'error',
      message: error,
    };

    setUploadResults((prev) => [result, ...prev]);
    toast.error('Upload failed!', {
      description: error,
    });
  };

  const clearResults = () => {
    setUploadResults([]);
  };

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
          <label className="text-title mb-2 block text-sm font-medium">
            Multimedia
          </label>
          <MediaUploader
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            onMediaProcessed={async (processedData) => {
              try {
                if (processedData) {
                  const persistedData =
                    await persistMultipleMedia(processedData);
                  console.log('Multiple media persisted:', persistedData);
                }
              } catch (error) {
                console.error('Error persisting multiple media:', error);
              }
            }}
            acceptedFileTypes={[
              'image/jpeg',
              'image/png',
              'image/webp',
              'video/mp4',
              'video/webm',
              'video/avi',
              'video/mov',
            ]}
            maxImageSize={10}
            maxVideoSize={50}
            multiple={true}
            renderDoneButton={(onDone, isProcessing) => (
              <Button
                onClick={onDone}
                disabled={isProcessing}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                {isProcessing ? 'Uploading...' : 'Finish Upload'}
              </Button>
            )}
          />
          {/* Upload Results */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upload Results</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={clearResults}
                disabled={uploadResults.length === 0}
              >
                Clear Results
              </Button>
            </CardHeader>
            <CardContent>
              {uploadResults.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No uploads yet. Try uploading some files above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadResults.map((result) => (
                    <div key={result.url} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {result.status === 'success' ? (
                            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                          )}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  result.status === 'success'
                                    ? 'default'
                                    : 'destructive'
                                }
                              >
                                {result.status}
                              </Badge>
                              <span className="text-muted-foreground text-sm">
                                {result.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            {result.status === 'success' ? (
                              <div className="space-y-1">
                                <p className="text-muted-foreground text-sm break-all">
                                  URL: {result.url}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-red-600">
                                Error: {result.message}
                              </p>
                            )}
                          </div>
                        </div>
                        {result.status === 'success' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(result.url, '_blank')}
                          >
                            View File
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field: { value: categories = [] } }) => (
              <FormItem>
                <CategoryFilter selectedCategories={categories} />
                <FormMessage />
              </FormItem>
            )}
          />

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
          <FormField
            control={form.control}
            name="tags"
            render={({ field: { value: tags = [] } }) => (
              <FormItem>
                <Tags
                  tags={tags}
                  newTag={newTag}
                  setNewTag={setNewTag}
                  addTag={addTag}
                  removeTag={removeTag}
                />
                <FormMessage />
              </FormItem>
            )}
          />

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
              <FormItem>
                <SustainabilityFormField sustainabilities={sustainabilities} />
                <FormMessage />
              </FormItem>
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
