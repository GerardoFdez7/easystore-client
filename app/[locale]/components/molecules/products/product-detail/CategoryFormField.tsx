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
  categoryDescription?: string;
  categoryCover?: string;
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
  const { control, setValue } = useFormContext<TFieldValues>();

  const [newCategories, setNewCategories] = useState<NewCategoryItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryItem[]>(
    [],
  );

  // Initialize selected categories from form field value
  const initializeCategories = useCallback((fieldValue: CategoryFormItem[]) => {
    // Always update selectedCategories based on fieldValue, even if empty
    if (!fieldValue || !Array.isArray(fieldValue)) {
      setSelectedCategories([]);
      return;
    }

    if (fieldValue.length === 0) {
      setSelectedCategories([]);
      return;
    }

    const categories = fieldValue.map((item: CategoryFormItem) => ({
      id: item.categoryId,
      name: item.categoryName || '',
      description: item.categoryDescription || '',
      cover: item.categoryCover || '',
    }));
    setSelectedCategories(categories);
  }, []);

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
          categoryDescription: category.description,
          categoryCover: category.cover,
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
          categoryDescription: category.description,
          categoryCover: category.cover,
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
        cover: category.cover,
        description: category.description,
      };

      const updatedCategories = [...selectedCategories, newCategoryItem];

      // Update local state immediately
      setSelectedCategories(updatedCategories);

      // Convert CategoryItem[] to the form's expected format: CategoryFormItem[]
      const formValue: CategoryFormItem[] = updatedCategories.map((cat) => ({
        categoryId: cat.id,
        categoryName: cat.name,
        categoryDescription: cat.description,
        categoryCover: cat.cover,
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
      render={({ field }) => {
        // Initialize categories when field value changes
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          initializeCategories(field.value || []);
        }, [field.value]);
        return (
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
        );
      }}
    />
  );
}
