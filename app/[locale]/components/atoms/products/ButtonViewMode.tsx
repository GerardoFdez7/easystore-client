import { Button } from '@shadcn/ui/button';
import { Grid3X3 } from 'lucide-react';

type ButtonViewProps = { onViewModeToggle: () => void };

export default function ButtonViewMode({ onViewModeToggle }: ButtonViewProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onViewModeToggle}
      className="h-16 w-16"
    >
      <Grid3X3 className="text-foreground size-6" />
    </Button>
  );
}
