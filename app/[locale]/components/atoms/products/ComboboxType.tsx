import { Combobox } from '@shadcn/ui/combobox';
import { useTranslations } from 'next-intl';

type SelectTypeProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function ComboboxType({
  value,
  onValueChange,
  className = 'placeholder:text-muted-foreground text-[12px] sm:text-[14px] w-[90px] sm:w-[160px] bg-card border-input hover:border-input text-foreground h-9 rounded-full px-3 text-left [&_.border-primary]:border-foreground [&_.text-primary\/80]:text-foreground [&_svg]:text-foreground dark:bg-input/30',
  disabled,
}: SelectTypeProps) {
  const t = useTranslations('Products');

  const typeOptions = [
    { value: 'physical', label: t('physical') },
    { value: 'digital', label: t('digital') },
  ];

  // Handle toggle functionality - deselect if same value is selected
  const handleValueChange = (selectedValue: string) => {
    if (onValueChange) {
      const newValue = selectedValue === value ? '' : selectedValue;
      onValueChange(newValue);
    }
  };

  return (
    <Combobox
      items={typeOptions}
      value={value}
      onValueChange={handleValueChange}
      placeholder={t('type')}
      emptyMessage="No type found."
      className={className}
      disabled={disabled}
    />
  );
}
