import BadgeTag from '@atoms/product-detail/BadgeTag';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Plus } from 'lucide-react';

interface TagsProps {
  tags: string[];
  newTag: string;
  setNewTag: (tag: string) => void;
  addTag: () => void;
  removeTag: (index: number) => void;
}

export default function Tags({
  tags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
}: TagsProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#000000]">
        Tags
      </label>
      <div className="mb-3 flex items-center gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add"
          className="border-[#e2e8f0] bg-[#ffffff]"
          onKeyPress={(e) => e.key === 'Enter' && addTag()}
        />
        <Button
          onClick={addTag}
          size="sm"
          variant="outline"
          className="border-[#d9d9d9]"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <BadgeTag key={index} text={tag} onRemove={() => removeTag(index)} />
        ))}
      </div>
    </div>
  );
}
