import { useTranslations } from 'next-intl';
import { ArrowUpWideNarrow } from 'lucide-react';
import { SortOrder } from '@graphql/generated';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

type SortOrderSelectProps = {
  value?: SortOrder | null;
  onChange: (value: SortOrder | null) => void;
  className?: string;
};

export default function SortOrderSelect({
  value,
  onChange,
  className,
}: SortOrderSelectProps) {
  const t = useTranslations('Shared');

  const handleClick = () => {
    const newValue = value === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;
    onChange(newValue);
  };

  const currentOrder = value ?? SortOrder.Asc;
  const tooltipText = t('sortOrder.placeholder');
  const ariaLabel =
    currentOrder === SortOrder.Asc
      ? t('sortOrder.ascending')
      : t('sortOrder.descending');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleClick}
          className={`text-title hover:text-title/80 focus-visible:ring-ring flex h-auto w-auto cursor-pointer items-center justify-center border-none bg-transparent p-1 text-sm font-medium shadow-none transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-transparent dark:hover:bg-transparent ${className || ''}`}
          aria-label={ariaLabel}
        >
          <ArrowUpWideNarrow
            className={`h-4 w-4 transition-transform duration-200 ${
              currentOrder === SortOrder.Desc ? 'rotate-180' : 'rotate-0'
            }`}
            aria-hidden="true"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
