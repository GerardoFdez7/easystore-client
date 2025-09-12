'use client';

import { useState } from 'react';
import InputProduct from '@atoms/product-detail/InputProduct';
import Description from '@atoms/product-detail/Description';
import Category from '@molecules/product-detail/Category';
import TypeProduct from '@atoms/product-detail/TypeProduct';
import Tags from '@molecules/product-detail/Tags';
import TableVariants from '@molecules/product-detail/TableVariants';
import Sustainability from '@molecules/product-detail/Sustainability';
import DeleteProduct from '@atoms/product-detail/DeleteProduct';
import ArchivedProduct from '@atoms/product-detail/ArchivedProduct';
import ButtonCancel from '@atoms/product-detail/ButtonCancel';
import ButtonSave from '@atoms/product-detail/ButtonSave';
import { Form, FormField, FormItem, FormMessage } from '@shadcn/ui/form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetProductById } from '@hooks/domains/products/useGetProductById';
//import {Product as ProductFormData} from '@lib/consts/products';

interface MainProductDetailProps {
  param: string;
  isNew: boolean;
}
export default function MainProductDetail({
  param,
  isNew,
}: MainProductDetailProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { product } = useGetProductById(param);
  const [newTag, setNewTag] = useState('');

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
      categories: [],
      tags: [] as string[],
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
        categories: [],
        tags: [],
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

  const removeCategory = (index: number) => {
    setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <main className="m-2 2xl:m-5">
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

          {/* Category */}
          <Category
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            removeCategory={removeCategory}
          />

          {/* Variants */}
          <TableVariants />

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
          <Sustainability />

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
