import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';

interface TypeProductProps {
  value?: string;
}

export default function TypeProduct({ value }: TypeProductProps) {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Type Product
      </label>
      <Select value={value}>
        <SelectTrigger className="w-[240px] bg-[#ffffff] sm:w-[300px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PHYSICAL">PHYSICAL</SelectItem>
          <SelectItem value="DIGITAL">DIGITAL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
