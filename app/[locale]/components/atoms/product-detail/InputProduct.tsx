import { Input } from '@shadcn/ui/input';

type InputProductProps = {
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function InputProduct({
  label,
  defaultValue,
  placeholder,
}: InputProductProps) {
  return (
    <div>
      {label && (
        <label className="text-title mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        className="border-[#e2e8f0]"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}
