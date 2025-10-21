'use client';

import { useTranslations } from 'next-intl';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onFirstPage}
                disabled={!canPreviousPage}
                aria-label={t('firstPageButton')}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('firstPageButton')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onPreviousPage}
                disabled={!canPreviousPage}
                aria-label={t('previousButton')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('previousButton')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onNextPage}
                disabled={!canNextPage}
                aria-label={t('nextButton')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('nextButton')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onLastPage}
                disabled={!canNextPage}
                aria-label={t('lastPageButton')}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('lastPageButton')}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Mobile: Show only previous and next buttons */}
        <div className="flex items-center space-x-2 md:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onPreviousPage}
                disabled={!canPreviousPage}
                aria-label={t('previousButton')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('previousButton')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onNextPage}
                disabled={!canNextPage}
                aria-label={t('nextButton')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('nextButton')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
