import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Label } from '@shadcn/ui/label';
import { useTranslations } from 'next-intl';
import { SortOrder } from '@graphql/generated';

type SortOrderSelectProps = {
  value?: SortOrder | null;
  onChange: (value: SortOrder | null) => void;
  className?: string;
  availableOptions?: SortOrder[];
};

export default function SortOrderSelect({
  value,
  onChange,
  className,
  availableOptions,
}: SortOrderSelectProps) {
  const t = useTranslations('Shared');

  const allOptions = [
    { value: SortOrder.Asc, label: t('sortOrder.ascending') },
    { value: SortOrder.Desc, label: t('sortOrder.descending') },
  ];

  const options = availableOptions
    ? allOptions.filter((option) => availableOptions.includes(option.value))
    : allOptions;

  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="sort-order-select">{t('sortOrder.placeholder')}</Label>
        <Select
          defaultValue={SortOrder.Asc}
          value={value ?? undefined}
          onValueChange={(selectedValue) => {
            onChange(selectedValue as SortOrder);
          }}
        >
          <SelectTrigger id="sort-order-select" className={className}>
            <SelectValue placeholder={t('sortOrder.placeholder')} />
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
