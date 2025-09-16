import BadgeTag from '@atoms/product-detail/BadgeTag';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';

interface Category {
  categoryId: string;
  categoryName: string;
}

interface CategoryProps {
  selectedCategories: Category[];
  setSelectedCategories?: (categories: Category[]) => void;
  removeCategory?: (index: number) => void;
  availableCategories?: Category[];
}

export default function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
  removeCategory,
  availableCategories = [
    { categoryId: 'computers', categoryName: 'Computers' },
    { categoryId: 'electronics', categoryName: 'Electronics' },
    { categoryId: 'accessories', categoryName: 'Accessories' },
    { categoryId: 'gaming', categoryName: 'Gaming' },
    { categoryId: 'software', categoryName: 'Software' },
  ],
}: CategoryProps) {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Category
      </label>
      <div className="mb-3 flex items-center gap-2">
        <Select
          value=""
          onValueChange={(value) => {
            if (
              value &&
              !selectedCategories.find((cat) => cat.categoryId === value)
            ) {
              const selectedCategory = availableCategories.find(
                (cat) => cat.categoryId === value,
              );
              if (selectedCategory) {
                setSelectedCategories?.([
                  ...selectedCategories,
                  selectedCategory,
                ]);
              }
            }
          }}
        >
          <SelectTrigger className="bg-card w-full border-[#e2e8f0]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableCategories.map((category) => (
                <SelectItem
                  key={category.categoryId}
                  value={category.categoryId}
                >
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category, index) => {
          const foundCategory = availableCategories.find(
            (cat) => cat.categoryId === category.categoryId,
          );
          return (
            <BadgeTag
              key={index}
              text={foundCategory?.categoryName || category.categoryName}
              onRemove={() => removeCategory?.(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
