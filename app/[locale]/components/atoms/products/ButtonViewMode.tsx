import { Button } from '@shadcn/ui/button';
import { Grid3X3 } from 'lucide-react';
import { AlignJustify } from 'lucide-react';

type ButtonViewProps = {
  onViewModeToggle: () => void;
  viewMode: string;
};

export default function ButtonViewMode({
  onViewModeToggle,
  viewMode,
}: ButtonViewProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onViewModeToggle}
      className="h-16 w-16"
    >
      {viewMode === 'table' ? (
        <AlignJustify className="text-foreground size-5 sm:size-6" />
      ) : (
        <Grid3X3 className="text-foreground size-5 sm:size-6" />
      )}
    </Button>
  );
}
