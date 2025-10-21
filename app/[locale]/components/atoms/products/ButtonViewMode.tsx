import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import { LayoutGrid } from 'lucide-react';
import { Table2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ButtonViewProps = {
  onViewModeToggle: () => void;
  viewMode: string;
};

export default function ButtonViewMode({
  onViewModeToggle,
  viewMode,
}: ButtonViewProps) {
  const t = useTranslations('Products');

  const tooltipText =
    viewMode === 'table' ? t('switchToGridView') : t('switchToTableView');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={onViewModeToggle}>
          {viewMode === 'table' ? (
            <LayoutGrid className="size-6" />
          ) : (
            <Table2 className="size-6" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltipText}</TooltipContent>
    </Tooltip>
  );
}
