import { Trash2 } from 'lucide-react';
import { Button } from '@shadcn/ui/button';

interface RemovableTagListProps<T> {
  items: T[];
  getKey: (item: T, index: number) => React.Key;
  getLabel: (item: T) => string;
  getDeleteAriaLabel: (item: T) => string;
  onRemove: (index: number) => void;
  tagClassName: string;
}

export default function RemovableTagList<T>({
  items,
  getKey,
  getLabel,
  getDeleteAriaLabel,
  onRemove,
  tagClassName,
}: RemovableTagListProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <div key={getKey(item, index)} className={tagClassName}>
          <span className="text-sm">{getLabel(item)}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-error hover:bg-hover hover:text-destructive h-5 w-5"
            onClick={() => onRemove(index)}
            aria-label={getDeleteAriaLabel(item)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
