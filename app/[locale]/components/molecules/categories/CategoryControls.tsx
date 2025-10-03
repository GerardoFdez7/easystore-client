'use client';

import { Plus } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import SearchBar from '@atoms/shared/SearchBar';
import {
  SortControls,
  SortControlsProps,
} from '@molecules/shared/SortControls';
import Link from 'next/link';

interface CategoryControlsProps extends SortControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder?: string;
  addButtonHref?: string;
  addButtonText?: string;
  showAddButton?: boolean;
}

export default function CategoryControls({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  addButtonHref,
  addButtonText,
  showAddButton = true,
  sortBy,
  updateSortBy,
  sortOrder,
  updateSortOrder,
}: CategoryControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Layout: Add button, SearchBar, and SortControls in column */}
      <div className="flex flex-col gap-4 lg:hidden">
        {showAddButton && addButtonHref && addButtonText && (
          <Button
            asChild
            className="text-accent bg-title hover:bg-accent-foreground self-end"
          >
            <Link href={addButtonHref}>
              <Plus className="h-4 w-4" />
              {addButtonText}
            </Link>
          </Button>
        )}
        <SearchBar
          placeholder={searchPlaceholder}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
        <SortControls
          sortBy={sortBy}
          updateSortBy={updateSortBy}
          sortOrder={sortOrder}
          updateSortOrder={updateSortOrder}
        />
      </div>

      {/* Desktop Layout: Add button on top right, SearchBar and SortControls on same row */}
      <div className="hidden lg:flex lg:flex-col lg:gap-4">
        {showAddButton && addButtonHref && addButtonText && (
          <div className="flex justify-end">
            <Button
              asChild
              className="text-accent bg-title hover:bg-accent-foreground"
            >
              <Link href={addButtonHref}>
                <Plus className="h-4 w-4" />
                {addButtonText}
              </Link>
            </Button>
          </div>
        )}
        <div className="flex flex-row items-center gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder={searchPlaceholder}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />
          </div>
          <SortControls
            sortBy={sortBy}
            updateSortBy={updateSortBy}
            sortOrder={sortOrder}
            updateSortOrder={updateSortOrder}
          />
        </div>
      </div>
    </div>
  );
}
