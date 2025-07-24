import { Edit2 } from 'lucide-react';
import { Textarea } from '@shadcn/ui/textarea';

export function DescriptionEditor() {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-medium text-[#423f3d]">Description</span>
        <Edit2 className="h-4 w-4 cursor-pointer text-[#10b981]" />
      </div>
      <Textarea
        className="min-h-[200px] resize-none border-gray-200 bg-[#f5f5f5]"
        placeholder="Enter description..."
      />
    </div>
  );
}
