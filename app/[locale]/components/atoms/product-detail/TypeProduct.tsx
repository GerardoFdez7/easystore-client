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
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Type Product
      </label>
      <Select value={value} onValueChange={onChange}>
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
