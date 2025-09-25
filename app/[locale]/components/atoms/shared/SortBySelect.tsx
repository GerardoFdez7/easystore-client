import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Label } from '@shadcn/ui/label';
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
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="sort-by-select">{t('sortBy.placeholder')}</Label>
        <Select
          defaultValue={SortBy.Name}
          value={value ?? undefined}
          onValueChange={(selectedValue) => {
            onChange(selectedValue as SortBy);
          }}
        >
          <SelectTrigger id="sort-by-select" className={className}>
            <SelectValue placeholder={t('sortBy.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
