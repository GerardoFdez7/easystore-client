import { Badge } from '@shadcn/ui/badge';
import { X } from 'lucide-react';

interface BadgeTagProps {
  text: string;
  onRemove: () => void;
}

export default function BadgeTag({ text, onRemove }: BadgeTagProps) {
  return (
    <Badge
      variant="secondary"
      className="text-foreground bg-[#d9d9d9] text-xs hover:bg-[#c4c0c0] sm:text-sm dark:text-gray-600"
    >
      {text}
      <button onClick={onRemove} className="ml-2">
        <X className="h-3 w-3 hover:text-red-600" />
      </button>
    </Badge>
  );
}
