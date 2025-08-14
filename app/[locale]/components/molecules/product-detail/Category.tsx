import BadgeTag from '@atoms/product-detail/BadgeTag';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';

interface Category {
  id: string;
  name: string;
}

interface CategoryProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  removeCategory: (index: number) => void;
  availableCategories?: Category[];
}

export default function Category({
  selectedCategories,
  setSelectedCategories,
  removeCategory,
  availableCategories = [
    { id: 'computers', name: 'Computers' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'software', name: 'Software' },
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
            if (value && !selectedCategories.includes(value)) {
              setSelectedCategories([...selectedCategories, value]);
            }
          }}
        >
          <SelectTrigger className="bg-card w-full border-[#e2e8f0]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((categoryId, index) => {
          const category = availableCategories.find(
            (cat) => cat.id === categoryId,
          );
          return (
            <BadgeTag
              key={index}
              text={category?.name || categoryId}
              onRemove={() => removeCategory(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
