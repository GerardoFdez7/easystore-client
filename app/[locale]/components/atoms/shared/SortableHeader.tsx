'use client';

import React from 'react';
import { TableHead } from '@shadcn/ui/table';
import { MoveUp, LucideIcon } from 'lucide-react';
import { cn } from '@lib/utils';

interface SortableHeaderProps<T = string> {
  children: React.ReactNode;
  sortKey: T;
  currentSortBy: T;
  currentSortOrder: 'ASC' | 'DESC';
  onSort: (column: T) => void;
  className?: string;
  icon?: LucideIcon;
  disableRotation?: boolean;
}

/**
 * SortableHeader - A reusable sortable table header component
 *
 * @param children - The header content (text)
 * @param sortKey - The key to sort by when this header is clicked
 * @param currentSortBy - The currently active sort key
 * @param currentSortOrder - The current sort order (ASC/DESC or asc/desc)
 * @param onSort - Function to call when header is clicked
 * @param className - Additional CSS classes
 * @param icon - Optional icon to display instead of the default MoveUp arrow
 * @param disableRotation - If true, prevents icon rotation on sort direction change
 */
export default function SortableHeader<T = string>({
  children,
  sortKey,
  currentSortBy,
  currentSortOrder,
  onSort,
  className,
  icon: Icon,
  disableRotation = false,
}: SortableHeaderProps<T>) {
  const isActive = currentSortBy === sortKey;
  const isDesc = currentSortOrder.toLowerCase() === 'desc';

  return (
    <TableHead
      className={cn(
        'hover:bg-muted/50 cursor-pointer text-center align-middle transition-colors select-none',
        className,
      )}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        {Icon ? (
          <Icon
            className={cn(
              'h-4 w-4 transition-all duration-200',
              isActive ? 'opacity-100' : 'opacity-0',
              !disableRotation && isActive && isDesc
                ? 'rotate-180'
                : 'rotate-0',
            )}
          />
        ) : (
          <MoveUp
            className={cn(
              'h-4 w-4 transition-all duration-200',
              isActive ? 'opacity-100' : 'opacity-0',
              !disableRotation && isActive && isDesc
                ? 'rotate-180'
                : 'rotate-0',
            )}
          />
        )}
      </div>
    </TableHead>
  );
}
