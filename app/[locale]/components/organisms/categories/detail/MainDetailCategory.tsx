'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
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
import {
  useCategory,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCategoryMedia,
  CategoryFormValues,
} from '@hooks/domains/category';
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
import SaveButton from '@atoms/shared/SaveButton';
import Options from '@molecules/shared/Options';
import MediaUploader from '@organisms/shared/MediaUploader';
import CategoryPicker, {
  type CategoryItem,
  type NewCategoryItem,
} from '@molecules/categories/detail/CategoryPicker';
import type { MultipleMediaUploaderRef } from '@molecules/shared/MultipleMediaUploader';
import type { ProcessedData } from '@lib/types/media';
import { useMutation, useQuery } from '@apollo/client/react';
import { getCurrentPathDepth } from '@lib/utils/path-utils';

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
  const router = useRouter();

  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMediaChanges, setHasMediaChanges] = useState(false);
  const [newCategories, setNewCategories] = useState<NewCategoryItem[]>([]);

  // Refs
  const mediaUploaderRef = useRef<MultipleMediaUploaderRef>(null);

  // Memoized values
  const categoryPathDepth = useMemo(() => getCurrentPathDepth(), []);
  const shouldFetch = useMemo(
    () => !isNew && !isAdd && categoryId,
    [isNew, isAdd, categoryId],
  );
  const categoryIdUsed = shouldFetch ? categoryId : undefined;

  // Data fetching
  const { category } = useCategory(categoryIdUsed);

  const { data: allCategoriesData } = useQuery<
    FindAllCategoriesQuery,
    FindAllCategoriesQueryVariables
  >(FindAllCategoriesDocument, {
    variables: {
      sortBy: SortBy.Name,
      sortOrder: SortOrder.Asc,
    },
    skip: isNew && !isAdd,
  });

  // Hooks initialization
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
  });

  const [createCategoryMutation] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    update: (cache, { data }) => {
      if (data?.createCategory) {
        // Cache will be automatically updated when parent category is saved
      }
    },
  });

  const { remove: deleteCategory } = useDeleteCategory();

  // Form management
  const form = isEdit ? updateCategoryHook.form : createCategoryHook.form;
  const {
    formState: { isDirty, errors },
    watch,
    setValue,
  } = form;

  // Media handling
  const { initialMedia, handleMediaProcessed: mediaHookHandler } =
    useCategoryMedia({
      category,
      setValue,
    });

  const currentCover = watch('cover');
  const effectiveInitialMedia = currentCover || initialMedia;

  // Extract the complex expression to a separate variable for static checking
  const watchedSubCategoryIds = watch('subCategoryIds');

  // Memoize subcategoryIds to prevent dependencies from changing on every render
  const subcategoryIds = useMemo(
    () => watchedSubCategoryIds || [],
    [watchedSubCategoryIds],
  );

  // Memoized subcategories computation
  const subcategories = useMemo(() => {
    return subcategoryIds
      .map((id) => {
        // Try to find in fetched category's subcategories
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

        // Check if it's a new category
        const newCategory = newCategories.find((newCat) => newCat.id === id);
        if (newCategory) {
          return {
            id: newCategory.id,
            name: newCategory.name,
            cover: newCategory.cover,
            description: newCategory.description,
          } as CategoryItem;
        }

        // Try to find in all categories data
        const allCategory =
          allCategoriesData?.getAllCategories?.categories?.find(
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

        return null;
      })
      .filter((item): item is CategoryItem => Boolean(item));
  }, [
    subcategoryIds,
    category?.subCategories,
    newCategories,
    allCategoriesData?.getAllCategories?.categories,
  ]);

  // Event handlers
  const handleMediaProcessed = useCallback(
    async (processedData?: ProcessedData | null) => {
      mediaHookHandler(processedData);
      setHasMediaChanges(false);
    },
    [mediaHookHandler],
  );

  const handleMediaChange = useCallback((hasChanges: boolean) => {
    setHasMediaChanges(hasChanges);
  }, []);

  const handleAddSubcategories = useCallback(
    (ids: string[]) => {
      setValue('subCategoryIds', [...subcategoryIds, ...ids], {
        shouldDirty: true,
      });
    },
    [setValue, subcategoryIds],
  );

  const handleRemoveSubcategory = useCallback(
    (id: string) => {
      const isNewCategory = newCategories.some((newCat) => newCat.id === id);

      if (isNewCategory) {
        setNewCategories((prev) => prev.filter((cat) => cat.id !== id));
      }

      const updatedSubcategories = subcategoryIds.filter(
        (subId) => subId !== id,
      );
      setValue('subCategoryIds', updatedSubcategories, { shouldDirty: true });
    },
    [newCategories, subcategoryIds, setValue],
  );

  const handleNewCategoryAdd = useCallback(
    (category: NewCategoryItem) => {
      setNewCategories((prev) => [...prev, category]);
      setValue('subCategoryIds', [...subcategoryIds, category.id], {
        shouldDirty: true,
      });
    },
    [setValue, subcategoryIds],
  );

  const onSubmit = useCallback(
    async (data: CategoryFormValues) => {
      if (!isDirty && !hasMediaChanges) return;

      setIsSubmitting(true);
      try {
        if (isEdit) {
          const createdCategoryIds: string[] = [];

          if (newCategories.length > 0) {
            for (const newCategory of newCategories) {
              const result = await createCategoryMutation({
                variables: {
                  input: {
                    name: newCategory.name,
                    description: newCategory.description || '',
                    cover: newCategory.cover || '',
                    parentId: categoryId,
                  },
                },
              });

              if (result.data?.createCategory?.id) {
                createdCategoryIds.push(result.data.createCategory.id);
              }
            }
          }

          const existingSubCategoryIds = (data.subCategoryIds || []).filter(
            (id) => !newCategories.some((newCat) => newCat.id === id),
          );

          const finalSubCategoryIds = [
            ...existingSubCategoryIds,
            ...createdCategoryIds,
          ];

          form.setValue('subCategoryIds', finalSubCategoryIds);
          updateCategoryHook.handleSubmit();
        } else {
          const buildNestedSubCategories = (categories: NewCategoryItem[]) => {
            return categories.map((cat) => ({
              name: cat.name,
              description: cat.description || '',
              cover: cat.cover || '',
            }));
          };

          const input = {
            name: data.name?.trim() || '',
            description: data.description?.trim() || '',
            cover: data.cover?.trim() || '',
            ...(parentId ? { parentId } : {}),
            ...(newCategories.length > 0
              ? { subCategories: buildNestedSubCategories(newCategories) }
              : {}),
          };

          const result = await createCategoryMutation({
            variables: { input },
          });

          if (result.data?.createCategory) {
            setNewCategories([]);
            createCategoryHook.form.reset();

            router.back();
          }
        }

        if (onSave) {
          await onSave(form.getValues());
        }

        setHasMediaChanges(false);
      } catch (_error) {
        // Error handling is managed by the error registry
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isDirty,
      hasMediaChanges,
      isEdit,
      newCategories,
      createCategoryMutation,
      categoryId,
      form,
      updateCategoryHook,
      parentId,
      createCategoryHook,
      router,
      onSave,
    ],
  );

  const handleDelete = useCallback(async () => {
    if (!categoryId || isNew || isAdd) return;

    try {
      await deleteCategory(categoryId);

      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);
      const categoryPathSegments = pathSegments.slice(2);

      if (categoryPathSegments.length > 1) {
        const parentPath = categoryPathSegments.slice(0, -1).join('/');
        router.push(`/categories/${parentPath}`);
      } else {
        router.push('/categories');
      }

      if (onDelete) {
        await onDelete();
      }
    } catch (_error) {
      // Error handling is managed by the error registry
    }
  }, [categoryId, isNew, isAdd, deleteCategory, router, onDelete]);

  // Effects
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        cover: initialData.cover,
        subCategoryIds: initialData.subCategoryIds || [],
      });
    } else if (category && !isNew && !isAdd) {
      form.reset({
        name: category.name,
        description: category.description || '',
        cover: category.cover || '',
        subCategoryIds: category.subCategories?.map((sub) => sub.id) || [],
      });
    }
  }, [initialData, category, form, isNew, isAdd]);

  // Computed values for accessibility
  const formAriaLabel = useMemo(() => {
    if (isAdd) return t('addSubcategory');
    if (isEdit) return t('editCategory');
    if (isNew) return t('addCategory');
    return t('editCategory');
  }, [isAdd, isEdit, isNew, t]);

  const showSubcategories = useMemo(() => {
    return isAdd ? categoryPathDepth < 9 : categoryPathDepth < 10;
  }, [isAdd, categoryPathDepth]);

  const canSave = useMemo(() => {
    return (isDirty || hasMediaChanges) && !isSubmitting;
  }, [isDirty, hasMediaChanges, isSubmitting]);

  const saveButtonTranslationKey = useMemo(() => {
    if (isAdd) return 'add';
    if (isEdit) return 'save';
    return 'create';
  }, [isAdd, isEdit]);

  return (
    <main className="mx-4 flex max-w-screen-md justify-center lg:mx-auto lg:w-full">
      <div className="relative w-full">
        <section className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)(e);
              }}
              className="w-full space-y-8"
              role="form"
              aria-label={formAriaLabel}
            >
              {/* Options Menu */}
              {!isNew && !isAdd && isEdit && (
                <aside className="flex justify-end">
                  <Options
                    showDelete={true}
                    onDelete={handleDelete}
                    disabled={isSubmitting}
                    deleteTitle={tCategory('title')}
                    deleteDescription={tCategory('description')}
                  />
                </aside>
              )}

              {/* Cover Image Section */}
              <section>
                <FormField
                  control={form.control}
                  name="cover"
                  render={() => (
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
                      <FormMessage id="cover-error" />
                    </FormItem>
                  )}
                />
              </section>

              {/* Category Name Section */}
              <section>
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
              </section>

              {/* Category Description Section */}
              <section>
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
              </section>

              {/* Subcategories Section */}
              {showSubcategories && (
                <section>
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
                </section>
              )}

              {/* Save Button Section */}
              <section className="flex justify-end">
                <SaveButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={!canSave}
                  size="lg"
                  translationKey={saveButtonTranslationKey}
                  aria-describedby="save-button-status"
                />
              </section>

              {/* Screen reader status */}
              <div
                id="save-button-status"
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
              >
                {isSubmitting && 'Saving category...'}
                {!isDirty && !hasMediaChanges && 'No changes to save'}
              </div>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
