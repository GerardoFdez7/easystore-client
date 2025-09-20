import { Input } from '@shadcn/ui/input';

type InputProductProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function InputProduct({
  label,
  value,
  placeholder,
  onChange,
}: InputProductProps) {
  return (
    <div>
      {label && (
        <label className="text-title mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
