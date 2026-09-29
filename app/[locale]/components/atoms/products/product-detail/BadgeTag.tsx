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
      className="text-foreground bg-border hover:bg-hover dark:text-foreground text-xs sm:text-sm"
    >
      {text}
      <button onClick={onRemove} className="ml-2">
        <X className="hover:text-destructive h-3 w-3" />
      </button>
    </Badge>
  );
}
