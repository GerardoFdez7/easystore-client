import Input from '@atoms/shared/OutsideInput';
import { Label } from '@shadcn//ui/label';
import { Edit2 } from 'lucide-react';

export function EditableField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-6">
      <Label className="mb-2 block font-medium text-[#423f3d]">{label}</Label>
      <div className="relative">
        <Input
          value={value}
          className="border-gray-200 bg-white pr-10"
          readOnly
        />
        <Edit2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer text-[#10b981]" />
      </div>
    </div>
  );
}
