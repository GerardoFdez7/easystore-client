import { Combobox } from '@shadcn/ui/combobox';
import { useTranslations } from 'next-intl';
import { InputMaybe, TypeEnum } from '@graphql/generated';

type SelectTypeProps = {
  value?: InputMaybe<TypeEnum>;
  onValueChange?: (value: InputMaybe<TypeEnum>) => void;
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

  return (
    <Combobox
      width={90}
      options={typeOptions}
      value={value?.toString()}
      onValueChange={handleValueChange}
      placeholder={t('type')}
      searchPlaceholder={t('search')}
      emptyMessage={t('noTypeFound')}
      className={className}
      disabled={disabled}
    />
  );
}
