import { Button } from '@shadcn/ui/button';
import { LayoutGrid } from 'lucide-react';
import { Table2 } from 'lucide-react';

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
        <Table2 className="text-foreground size-5 sm:size-6" />
      ) : (
        <LayoutGrid className="text-foreground size-5 sm:size-6" />
      )}
    </Button>
  );
}
