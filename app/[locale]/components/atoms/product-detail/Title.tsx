import { Input } from '@shadcn/ui/input';

export default function Title() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#000000]">
        Title
      </label>
      <Input className="border-[#e2e8f0] bg-[#ffffff]" />
    </div>
  );
}
