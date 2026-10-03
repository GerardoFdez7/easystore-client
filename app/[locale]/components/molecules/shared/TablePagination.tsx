'use client';

import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  selectedCount: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

interface PaginationButtonProps {
  disabled: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  tooltipContent?: React.ReactNode;
}

interface PageStepButtonsProps {
  canNextPage: boolean;
  canPreviousPage: boolean;
  nextLabel: string;
  onNextPage: () => void;
  onPreviousPage: () => void;
  previousLabel: string;
}

function PaginationButton({
  disabled,
  icon: Icon,
  label,
  onClick,
  tooltipContent = label,
}: PaginationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}

function PageStepButtons({
  canNextPage,
  canPreviousPage,
  nextLabel,
  onNextPage,
  onPreviousPage,
  previousLabel,
}: PageStepButtonsProps) {
  return (
    <>
      <PaginationButton
        disabled={!canPreviousPage}
        icon={ChevronLeft}
        label={previousLabel}
        onClick={onPreviousPage}
      />
      <PaginationButton
        disabled={!canNextPage}
        icon={ChevronRight}
        label={nextLabel}
        onClick={onNextPage}
      />
    </>
  );
}

export default function TablePagination({
  currentPage,
  totalPages,
  selectedCount,
  totalRows,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  canPreviousPage,
  canNextPage,
}: TablePaginationProps) {
  const t = useTranslations('Inventory');

  const showSelectedCount = selectedCount > 0;
  const pageStepButtons = (
    <PageStepButtons
      canNextPage={canNextPage}
      canPreviousPage={canPreviousPage}
      nextLabel={t('nextButton')}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      previousLabel={t('previousButton')}
    />
  );

  return (
    <div className="text-muted-foreground mt-4 flex items-center justify-between px-2 text-left">
      {/* Left side - Selected count or Page info */}
      <div className="flex-1 text-left">
        {showSelectedCount ? (
          <span className="block md:hidden">
            {t('rowsSelected', { count: selectedCount, total: totalRows })}
          </span>
        ) : (
          <span className="block md:hidden">
            {t('pageInfo', { current: currentPage, total: totalPages })}
          </span>
        )}
        <span className="hidden md:block">
          {showSelectedCount
            ? t('rowsSelected', { count: selectedCount, total: totalRows })
            : t('pageInfo', { current: currentPage, total: totalPages })}
        </span>
      </div>

      {/* Right side - Pagination buttons */}
      <div className="flex items-center space-x-2">
        {/* Desktop: Show all 4 buttons */}
        <div className="hidden items-center space-x-2 md:flex">
          <PaginationButton
            disabled={!canPreviousPage}
            icon={ChevronsLeft}
            label={t('firstPageButton')}
            onClick={onFirstPage}
          />
          {pageStepButtons}
          <PaginationButton
            disabled={!canNextPage}
            icon={ChevronsRight}
            label={t('lastPageButton')}
            onClick={onLastPage}
            tooltipContent={<p>{t('lastPageButton')}</p>}
          />
        </div>

        {/* Mobile: Show only previous and next buttons */}
        <div className="flex items-center space-x-2 md:hidden">
          {pageStepButtons}
        </div>
      </div>
    </div>
  );
}
