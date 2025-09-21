import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';

interface TypeProductProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function TypeProduct({ value, onChange }: TypeProductProps) {
  // Ensure value is valid, fallback to empty string if not
  const safeValue = value === 'PHYSICAL' || value === 'DIGITAL' ? value : '';

  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Type Product
      </label>
      <Select value={safeValue} onValueChange={onChange}>
        <SelectTrigger className="w-[240px] bg-[#ffffff] sm:w-[300px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PHYSICAL">PHYSICAL</SelectItem>
          <SelectItem value="DIGITAL">DIGITAL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
