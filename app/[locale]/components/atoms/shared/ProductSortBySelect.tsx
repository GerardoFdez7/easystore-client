import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@shadcn/ui/select';
import { Label } from '@shadcn/ui/label';
import { ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProductSortBy } from '@graphql/generated';

type ProductSortBySelectProps = {
  value?: ProductSortBy | null;
  onChange: (value: ProductSortBy | null) => void;
  className?: string;
  availableOptions?: ProductSortBy[];
};

export default function ProductSortBySelect({
  value,
  onChange,
  className,
  availableOptions,
}: ProductSortBySelectProps) {
  const t = useTranslations('Shared');

  const allOptions = [
    { value: ProductSortBy.Name, label: t('sortBy.name') },
    { value: ProductSortBy.CreatedAt, label: t('sortBy.createdAt') },
    { value: ProductSortBy.UpdatedAt, label: t('sortBy.updatedAt') },
    { value: ProductSortBy.Sku, label: t('sortBy.sku') },
    {
      value: ProductSortBy.FirstVariantPrice,
      label: t('sortBy.firstVariantPrice'),
    },
    { value: ProductSortBy.VariantCount, label: t('sortBy.variantCount') },
  ];

  const options = availableOptions
    ? allOptions.filter((option) => availableOptions.includes(option.value))
    : allOptions;

  return (
    <Select
      defaultValue={ProductSortBy.UpdatedAt}
      value={value ?? undefined}
      onValueChange={(selectedValue) => {
        onChange(selectedValue as ProductSortBy);
      }}
    >
      <SelectTrigger
        className={`text-title hover:text-title/80 flex h-auto w-auto cursor-pointer items-center justify-start gap-1 border-none bg-transparent p-0 font-medium shadow-none transition-colors focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent dark:hover:bg-transparent [&>svg:last-child]:hidden ${className || ''}`}
        aria-label={t('sortBy.placeholder')}
        aria-describedby="sort-by-description"
      >
        <Label id="sort-by-description" className="sr-only">
          {t('sortBy.placeholder')}
        </Label>
        <Label aria-hidden="true" className="cursor-pointer">
          {t('sortBy.placeholder')}
        </Label>
        <ArrowUpDown className="text-title h-4 w-4" aria-hidden="true" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
