import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { useTranslations } from 'next-intl';
import { InputMaybe, TypeEnum } from '@graphql/generated';

type SelectTypeProps = {
  value?: InputMaybe<TypeEnum>;
  onValueChange?: (value: InputMaybe<TypeEnum>) => void;
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
    { value: TypeEnum.Physical, label: t('physical') },
    { value: TypeEnum.Digital, label: t('digital') },
  ];

  // Handle toggle functionality - deselect if same value is selected
  const handleValueChange = (selectedValue: string) => {
    if (onValueChange) {
      const newValue = selectedValue === value ? null : selectedValue;
      onValueChange(newValue as InputMaybe<TypeEnum>);
    }
  };

  // Handle pointer down for toggle behavior
  const handlePointerDown = (optionValue: TypeEnum, e: React.PointerEvent) => {
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
      <SelectTrigger className={className}>
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
