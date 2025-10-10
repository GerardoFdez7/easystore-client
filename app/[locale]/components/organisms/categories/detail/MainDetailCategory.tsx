'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@shadcn/ui/form';
import MediaUploader from '@organisms/shared/MediaUploader';
import CategoryPicker, {
  type CategoryItem,
  type NewCategoryItem,
} from '@molecules/categories/detail/CategoryPicker';
import SaveButton from '@atoms/shared/SaveButton';
import Options from '@molecules/shared/Options';
import type { MultipleMediaUploaderRef } from '@molecules/shared/MultipleMediaUploader';
import type { ProcessedData } from '@lib/types/media';
import {
  useCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCategoryMedia,
  CategoryFormValues,
} from '@hooks/domains/category';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  CreateCategoryDocument,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  FindAllCategoriesDocument,
  FindAllCategoriesQuery,
  FindAllCategoriesQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

interface MainDetailCategoryProps {
  categoryId?: string;
  parentId?: string;
  isNew?: boolean;
  isEdit?: boolean;
  isAdd?: boolean;
  initialData?: CategoryFormValues;
  onSave?: (data: CategoryFormValues) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default function MainDetailCategory({
  categoryId,
  parentId,
  isNew = false,
  isEdit = false,
  isAdd = false,
  initialData,
  onSave,
  onDelete,
}: MainDetailCategoryProps) {
  const t = useTranslations('CategoryDetail');
  const tCategory = useTranslations('Category');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMediaChanges, setHasMediaChanges] = useState(false);
  const [newCategories, setNewCategories] = useState<NewCategoryItem[]>([]);
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);
  const router = useRouter();

  // Fetch category data if editing existing category
  const { category } = useCategory(!isNew && !isAdd ? categoryId : undefined);

  // Fetch all categories to resolve subcategory IDs that aren't in the current category's subcategories
  const { data: allCategoriesData } = useQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, {
    variables: {
      sortBy: SortBy.Name,
      sortOrder: SortOrder.Asc,
    },
    skip: isNew && !isAdd, // Only fetch when we might need to resolve subcategory IDs
  });

  // Initialize hooks for create/update operations
  const createCategoryHook = useCreateCategory({
    parentId: isAdd ? parentId : undefined,
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          cover: initialData.cover,
          subCategoryIds: initialData.subCategoryIds || [],
        }
      : undefined,
  });

  const updateCategoryHook = useUpdateCategory({
    id: categoryId || '',
    initialChildIds: category?.subCategories?.map((sub) => sub.id) || [],
    defaultValues: category
      ? {
          name: category.name,
          description: category.description || '',
          cover: category.cover || '',
          subCategoryIds: category.subCategories?.map((sub) => sub.id) || [],
        }
      : undefined,
    onSuccess: () => {},
  });

  // Direct mutation for creating new categories
  const [createCategoryMutation] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    // Use cache update instead of refetchQueries to avoid unnecessary refetches
    update: (cache, { data }) => {
      if (data?.createCategory) {
        // The cache will be automatically updated when the parent category is saved
        // No need to refetch all categories here
      }
    },
  });

  const { remove: deleteCategory } = useDeleteCategory();

  // Use the appropriate form based on the operation
  const form = isEdit ? updateCategoryHook.form : createCategoryHook.form;

  const {
    formState: { isDirty, errors },
    watch,
    setValue,
  } = form;

  // Initialize media hook for proper media handling (after form initialization)
  const { initialMedia, handleMediaProcessed: mediaHookHandler } =
    useCategoryMedia({
      category,
      setValue,
    });

  // Watch the cover field to get the current form value
  const currentCover = watch('cover');

  // Use the current form value for initialMedia, falling back to the hook's initialMedia
  const effectiveInitialMedia = currentCover || initialMedia;

  // Watch form values for real-time updates
  const subcategoryIds = watch('subCategoryIds') || [];

  // Use the fetched category data, all categories data, and new categories for subcategories display
  const subcategories = subcategoryIds
    .map((id) => {
      // First try to find in the fetched category's subcategories
      const fetchedSubcategory = category?.subCategories?.find(
        (sub) => sub.id === id,
      );
      if (fetchedSubcategory) {
        return {
          id: fetchedSubcategory.id,
          name: fetchedSubcategory.name,
          cover: fetchedSubcategory.cover,
          description: fetchedSubcategory.description || undefined,
        } as CategoryItem;
      }

      // Check if it's a new category that hasn't been saved yet
      const newCategory = newCategories.find((newCat) => newCat.id === id);
      if (newCategory) {
        return {
          id: newCategory.id,
          name: newCategory.name,
          cover: newCategory.cover,
          description: newCategory.description,
        } as CategoryItem;
      }

      // Try to find in all categories data (for categories selected via AddSubcategoriesPicker)
      const allCategory = allCategoriesData?.getAllCategories?.categories?.find(
        (cat) => cat.id === id,
      );
      if (allCategory) {
        return {
          id: allCategory.id,
          name: allCategory.name,
          cover: allCategory.cover || undefined,
          description: allCategory.description || undefined,
        } as CategoryItem;
      }

      // If not found in any place, return null (will be filtered out)
      return null;
    })
    .filter((item): item is CategoryItem => Boolean(item));

  // Handle media upload success - MediaUploader already uploaded to ImageKit
  const handleMediaProcessed = async (processedData?: ProcessedData | null) => {
    mediaHookHandler(processedData);
    // Reset media changes state since upload is complete
    setHasMediaChanges(false);
  };

  // Handle media changes
  const handleMediaChange = (hasChanges: boolean) => {
    setHasMediaChanges(hasChanges);
  };

  // Handle adding subcategories
  const handleAddSubcategories = (ids: string[]) => {
    setValue('subCategoryIds', [...subcategoryIds, ...ids], {
      shouldDirty: true,
    });
  };

  // Handle removing subcategory
  const handleRemoveSubcategory = (id: string) => {
    const isNewCategory = newCategories.some((newCat) => newCat.id === id);

    if (isNewCategory) {
      setNewCategories((prev) => prev.filter((cat) => cat.id !== id));
    }

    // Always remove from form subcategoryIds
    const updatedSubcategories = subcategoryIds.filter((subId) => subId !== id);
    setValue('subCategoryIds', updatedSubcategories, { shouldDirty: true });
  };

  // Handle adding new category to local state
  const handleNewCategoryAdd = (category: NewCategoryItem) => {
    setNewCategories((prev) => [...prev, category]);
    setValue('subCategoryIds', [...subcategoryIds, category.id], {
      shouldDirty: true,
    });
  };

  // Form submission handler
  const onSubmit = async (data: CategoryFormValues) => {
    if (!isDirty && !hasMediaChanges) return;

    setIsSubmitting(true);
    try {
      // First, create any new categories and get their real IDs
      const createdCategoryIds: string[] = [];

      if (newCategories.length > 0) {
        for (const newCategory of newCategories) {
          const result = await createCategoryMutation({
            variables: {
              input: {
                name: newCategory.name,
                description: newCategory.description || '',
                cover: newCategory.cover || '',
                parentId: isAdd ? parentId : categoryId,
              },
            },
          });

          if (result.data?.createCategory?.id) {
            createdCategoryIds.push(result.data.createCategory.id);
          }
        }
      }

      // Filter out temporary IDs and add the newly created category IDs
      const existingSubCategoryIds = (data.subCategoryIds || []).filter(
        (id) => !newCategories.some((newCat) => newCat.id === id),
      );

      const finalSubCategoryIds = [
        ...existingSubCategoryIds,
        ...createdCategoryIds,
      ];

      // Update the form with the real IDs
      form.setValue('subCategoryIds', finalSubCategoryIds);

      // Now proceed with the main category creation/update
      if (isEdit) {
        updateCategoryHook.handleSubmit();
      } else {
        createCategoryHook.handleSubmit();
      }

      // Clear new categories after successful save
      setNewCategories([]);

      // Call the onSave callback if provided (for backward compatibility)
      if (onSave) {
        await onSave(form.getValues());
      }

      // Reset media changes state after successful operations
      setHasMediaChanges(false);
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete operation
  const handleDelete = async () => {
    if (!categoryId || isNew || isAdd) return;

    try {
      await deleteCategory(categoryId);

      // Navigate to previous category in path after successful deletion
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);

      // Remove locale and 'categories' from path segments
      const categoryPathSegments = pathSegments.slice(2); // Remove locale and 'categories'

      if (categoryPathSegments.length > 1) {
        // Navigate to parent category
        const parentPath = categoryPathSegments.slice(0, -1).join('/');
        router.push(`/categories/${parentPath}`);
      } else {
        // Navigate to root categories if no parent
        router.push('/categories');
      }

      if (onDelete) {
        await onDelete();
      }
    } catch (_error) {}
  };

  // Reset form when initial data changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        cover: initialData.cover,
        subCategoryIds: initialData.subCategoryIds || [],
      });
    } else if (category && !isNew && !isAdd) {
      // Reset form with fetched category data
      form.reset({
        name: category.name,
        description: category.description || '',
        cover: category.cover || '',
        subCategoryIds: category.subCategories?.map((sub) => sub.id) || [],
      });
    }
  }, [initialData, category, form, isNew, isAdd]);

  return (
    <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
      <div className="relative w-full">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit(onSubmit)(e);
            }}
            className="w-full space-y-8"
            role="form"
            aria-label={
              isAdd
                ? t('addSubcategory')
                : isEdit
                  ? t('editCategory')
                  : isNew
                    ? t('addCategory')
                    : t('editCategory')
            }
          >
            {/* Options Menu - Top Right Corner */}
            {!isNew && !isAdd && categoryId && (
              <Options
                showDelete={true}
                onDelete={handleDelete}
                disabled={isSubmitting}
                deleteTitle={tCategory('title')}
                deleteDescription={tCategory('description')}
              />
            )}
            {/* Cover Image */}
            <FormField
              control={form.control}
              name="cover"
              render={({}) => (
                <FormItem>
                  <FormLabel
                    htmlFor="cover-upload"
                    className="text-lg font-semibold"
                  >
                    {t('cover')}
                  </FormLabel>
                  <FormControl>
                    <MediaUploader
                      ref={mediaUploaderRef}
                      alwaysEditing={true}
                      initialMedia={effectiveInitialMedia}
                      onMediaProcessed={handleMediaProcessed}
                      onMediaChange={handleMediaChange}
                      acceptedFileTypes={[
                        'image/jpeg',
                        'image/png',
                        'image/webp',
                      ]}
                      aria-describedby="cover-error"
                    />
                  </FormControl>
                  <FormMessage id="cover-error"></FormMessage>
                </FormItem>
              )}
            />

            {/* Category Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="category-name"
                    className="text-lg font-semibold"
                  >
                    {t('name')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="category-name"
                      placeholder={t('namePlaceholder')}
                      {...field}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby="name-error"
                    />
                  </FormControl>
                  <FormMessage id="name-error" />
                </FormItem>
              )}
            />

            {/* Category Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="category-description"
                    className="text-lg font-semibold"
                  >
                    {t('description')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="category-description"
                      placeholder={t('descriptionPlaceholder')}
                      maxLength={200}
                      {...field}
                      aria-describedby="description-error"
                      className="h-53 sm:h-auto"
                    />
                  </FormControl>
                  <FormMessage id="description-error" />
                </FormItem>
              )}
            />

            {/* Subcategories */}
            <FormItem>
              <FormLabel
                htmlFor="subcategories"
                className="text-lg font-semibold"
              >
                {t('subcategories')}
              </FormLabel>
              <FormControl>
                <CategoryPicker
                  items={subcategories}
                  currentCategoryId={categoryId}
                  disabled={isSubmitting}
                  onAdd={handleAddSubcategories}
                  onRemove={handleRemoveSubcategory}
                  newCategories={newCategories}
                  onNewCategoryAdd={handleNewCategoryAdd}
                />
              </FormControl>
            </FormItem>

            {/* Save Button */}
            <div className="flex justify-end">
              <SaveButton
                type="submit"
                loading={isSubmitting}
                disabled={(!isDirty && !hasMediaChanges) || isSubmitting}
                size="lg"
                translationKey={isAdd ? 'add' : isEdit ? 'save' : 'create'}
                aria-describedby="save-button-status"
              />
            </div>

            {/* Screen reader status for save button */}
            <div id="save-button-status" className="sr-only" aria-live="polite">
              {isSubmitting && 'Saving category...'}
              {!isDirty && !hasMediaChanges && 'No changes to save'}
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
