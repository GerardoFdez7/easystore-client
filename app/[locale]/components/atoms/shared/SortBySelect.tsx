import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@shadcn/ui/select';
import { Label } from '@shadcn/ui/label';
import { ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SortBy } from '@graphql/generated';

type SortBySelectProps = {
  value?: SortBy | null;
  onChange: (value: SortBy | null) => void;
  className?: string;
  availableOptions?: SortBy[];
};

export default function SortBySelect({
  value,
  onChange,
  className,
  availableOptions,
}: SortBySelectProps) {
  const t = useTranslations('Shared');

  const allOptions = [
    { value: SortBy.Name, label: t('sortBy.name') },
    { value: SortBy.CreatedAt, label: t('sortBy.createdAt') },
    { value: SortBy.UpdatedAt, label: t('sortBy.updatedAt') },
  ];

  const options = availableOptions
    ? allOptions.filter((option) => availableOptions.includes(option.value))
    : allOptions;

  return (
    <Select
      defaultValue={SortBy.Name}
      value={value ?? undefined}
      onValueChange={(selectedValue) => {
        onChange(selectedValue as SortBy);
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
