import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { useTranslations } from 'next-intl';
import { ProductType } from '@lib/types/product';

type SelectTypeProps = {
  value?: ProductType | null;
  onValueChange?: (value: ProductType | null) => void;
  className?: string;
  disabled?: boolean;
};

export default function SelectType({
  value,
  onValueChange,
  className,
  disabled,
}: SelectTypeProps) {
  const t = useTranslations('Products');

  const typeOptions = [
    { value: ProductType.Physical, label: t('physical') },
    { value: ProductType.Digital, label: t('digital') },
  ];

  // Handle toggle functionality - deselect if same value is selected
  const handleValueChange = (selectedValue: string) => {
    if (onValueChange) {
      const newValue = selectedValue === value ? null : selectedValue;
      if (
        newValue === null ||
        newValue === ProductType.Physical ||
        newValue === ProductType.Digital
      ) {
        onValueChange(newValue);
      }
    }
  };

  // Handle pointer down for toggle behavior
  const handlePointerDown = (
    optionValue: ProductType,
    e: React.PointerEvent,
  ) => {
    // If clicking the already-selected item, prevent default and clear selection
    if (value === optionValue) {
      e.preventDefault();
      onValueChange?.(null);
    }
  };

  return (
    <Select
      key={value ? `selected-${value}` : 'unselected'}
      value={value ?? undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className} aria-label={t('type')}>
        <SelectValue placeholder={t('type')} />
      </SelectTrigger>
      <SelectContent>
        {typeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onPointerDown={(e) => handlePointerDown(option.value, e)}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
