import { ArrowUpDown } from 'lucide-react';
import { Label } from '@shadcn/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@shadcn/ui/select';

interface SortOption<Value extends string> {
  value: Value;
  label: string;
}

interface SortByControlProps<Value extends string> {
  className?: string;
  defaultValue: Value;
  onChange: (value: Value) => void;
  options: readonly SortOption<Value>[];
  placeholder: string;
  value?: Value | null;
}

export default function SortByControl<Value extends string>({
  className,
  defaultValue,
  onChange,
  options,
  placeholder,
  value,
}: SortByControlProps<Value>) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value ?? undefined}
      onValueChange={(selectedValue) => {
        onChange(selectedValue as Value);
      }}
    >
      <SelectTrigger
        className={`text-title hover:text-title/80 flex h-auto w-auto cursor-pointer items-center justify-start gap-1 border-none bg-transparent p-0 font-medium shadow-none transition-colors focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent dark:hover:bg-transparent [&>svg:last-child]:hidden ${className || ''}`}
        aria-label={placeholder}
        aria-describedby="sort-by-description"
      >
        <Label id="sort-by-description" className="sr-only">
          {placeholder}
        </Label>
        <Label aria-hidden="true" className="cursor-pointer">
          {placeholder}
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
