'use client';
import * as React from 'react';
import { Combobox } from '@shadcn/ui/combobox';
import { categoryOptions } from '@lib/consts/data-test';
import { useTranslations } from 'next-intl';

type Category = {
  id: string;
  name: string;
  description: string;
  subCategories?: Category[];
};

// Recursive function to flatten all categories and subcategories
function flattenCategories(
  categories: Category[],
): Array<{ label: string; value: string }> {
  const result: Array<{ label: string; value: string }> = [];

  for (const category of categories) {
    result.push({
      value: category.id,
      label: category.name,
    });

    if (category.subCategories && category.subCategories.length > 0) {
      result.push(...flattenCategories(category.subCategories));
    }
  }
  return result;
}

type ComboboxCategoryProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function ComboboxCategory({
  value,
  onValueChange,
  className = 'placeholder:text-muted-foreground text-[12px] sm:text-[14px] w-[120px] sm:w-[200px] bg-card border-input hover:border-input text-foreground h-9 rounded-full px-3 text-left [&_.border-primary]:border-foreground [&_.text-primary\\/80]:text-foreground [&_svg]:text-foreground dark:bg-input/30',
  disabled,
}: ComboboxCategoryProps) {
  const t = useTranslations('Products');

  // Flatten all categories and subcategories
  const items = React.useMemo(() => {
    return flattenCategories(categoryOptions).map((category) => ({
      value: category.value,
      label: category.label,
    }));
  }, []);

  // Handle toggle functionality - deselect if same value is selected
  const handleValueChange = (selectedValue: string) => {
    if (onValueChange) {
      const newValue = selectedValue === value ? '' : selectedValue;
      onValueChange(newValue);
    }
  };

  return (
    <Combobox
      items={items}
      value={value}
      onValueChange={handleValueChange}
      placeholder={t('category')}
      placeholderInput={t('search')}
      emptyMessage={t('noCategoryFound')}
      className={className}
      disabled={disabled}
    />
  );
}
