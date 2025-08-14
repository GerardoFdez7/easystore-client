import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';

export default function TypeProduct() {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Type Product
      </label>
      <Select defaultValue="physical">
        <SelectTrigger className="border-[#e2e8f0] bg-[#ffffff]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="physical">PHYSICAL</SelectItem>
          <SelectItem value="digital">DIGITAL</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
