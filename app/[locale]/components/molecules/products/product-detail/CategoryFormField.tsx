import React, { useCallback, useState, useEffect } from 'react';
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import { useTranslations } from 'next-intl';
import CategoryPicker, {
  type CategoryItem,
  type NewCategoryItem,
} from '@molecules/categories/detail/CategoryPicker';

// Define the category form structure
interface CategoryFormItem {
  categoryId: string;
  categoryName?: string;
  description?: string;
  cover?: string;
}

interface CategoryFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: string;
}

export default function CategoryFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label }: CategoryFormFieldProps<TFieldValues, TName>) {
  const t = useTranslations('Category');
  const { control, watch, setValue } = useFormContext<TFieldValues>();

  const [newCategories, setNewCategories] = useState<NewCategoryItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryItem[]>(
    [],
  );

  // Watch the form field value for initial load and synchronization
  const fieldValue = watch(name);

  // Initialize selected categories from form value on mount and when form value changes
  useEffect(() => {
    if (!fieldValue || !Array.isArray(fieldValue)) {
      setSelectedCategories([]);
      return;
    }

    const categories = fieldValue.map((item: CategoryFormItem) => ({
      id: item.categoryId,
      name: item.categoryName || '',
      description: item.description || '',
      cover: item.cover || '',
    }));

    setSelectedCategories(categories);
  }, [fieldValue]);

  // Handle adding categories - now receives full CategoryItem objects
  const handleAddCategories = useCallback(
    (categories: CategoryItem[]) => {
      const updatedCategories = [...selectedCategories, ...categories];

      // Update local state immediately
      setSelectedCategories(updatedCategories);

      // Convert CategoryItem[] to the form's expected format: CategoryFormItem[]
      const formValue: CategoryFormItem[] = updatedCategories.map(
        (category) => ({
          categoryId: category.id,
          categoryName: category.name,
          description: category.description,
          cover: category.cover,
        }),
      );

      setValue(name, formValue as PathValue<TFieldValues, TName>, {
        shouldDirty: true,
      });
    },
    [selectedCategories, setValue, name],
  );

  const handleRemoveCategory = useCallback(
    (categoryId: string) => {
      const isNewCategory = newCategories.some(
        (newCat) => newCat.id === categoryId,
      );

      if (isNewCategory) {
        setNewCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
      }

      const updatedCategories = selectedCategories.filter(
        (category: CategoryItem) => category.id !== categoryId,
      );

      // Update local state immediately
      setSelectedCategories(updatedCategories);

      // Convert CategoryItem[] to the form's expected format: CategoryFormItem[]
      const formValue: CategoryFormItem[] = updatedCategories.map(
        (category: CategoryItem) => ({
          categoryId: category.id,
          categoryName: category.name,
          description: category.description,
          cover: category.cover,
        }),
      );

      setValue(name, formValue as PathValue<TFieldValues, TName>, {
        shouldDirty: true,
      });
    },
    [selectedCategories, newCategories, setValue, name],
  );

  const handleNewCategoryAdd = useCallback(
    (category: NewCategoryItem) => {
      setNewCategories((prev) => [...prev, category]);

      const newCategoryItem: CategoryItem = {
        id: category.id,
        name: category.name,
        cover: category.cover || '',
        description: category.description,
      };

      const updatedCategories = [...selectedCategories, newCategoryItem];

      // Update local state immediately
      setSelectedCategories(updatedCategories);

      // Convert CategoryItem[] to the form's expected format: CategoryFormItem[]
      const formValue: CategoryFormItem[] = updatedCategories.map((cat) => ({
        categoryId: cat.id,
        categoryName: cat.name,
        description: cat.description,
        cover: cat.cover,
      }));

      setValue(name, formValue as PathValue<TFieldValues, TName>, {
        shouldDirty: true,
      });
    },
    [selectedCategories, setValue, name],
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">
            {label || t('welcomeCategory')}
          </FormLabel>
          <FormControl>
            <CategoryPicker
              mode="product-selection"
              items={selectedCategories}
              onAdd={handleAddCategories}
              onRemove={handleRemoveCategory}
              newCategories={newCategories}
              onNewCategoryAdd={handleNewCategoryAdd}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
