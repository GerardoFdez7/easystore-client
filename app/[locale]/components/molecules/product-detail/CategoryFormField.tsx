import TagSelectFormField from '@molecules/shared/TagSelectFormField';

interface Category {
  categoryId: string;
  categoryName: string;
}

const categories: Category[] = [
  { categoryId: 'computers', categoryName: 'Computers' },
  { categoryId: 'electronics', categoryName: 'Electronics' },
  { categoryId: 'accessories', categoryName: 'Accessories' },
  { categoryId: 'gaming', categoryName: 'Gaming' },
  { categoryId: 'software', categoryName: 'Software' },
  { categoryId: 'mobile', categoryName: 'Mobile Devices' },
  { categoryId: 'audio', categoryName: 'Audio & Video' },
  { categoryId: 'networking', categoryName: 'Networking' },
];

export default function CategoryFormField() {
  return (
    <TagSelectFormField<Category>
      name="categories"
      label="Categories"
      placeholder="Select a category"
      emptyStateText="No categories selected"
      availableOptions={categories}
      getOptionId={(cat) => cat.categoryId}
      getOptionLabel={(cat) => cat.categoryName}
    />
  );
}
