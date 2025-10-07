import { memo, useCallback } from 'react';
import Link from 'next/link';
import { SortBy, SortOrder } from '@graphql/generated';
import { Plus, ListTree } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import SearchBar from '@atoms/shared/SearchBar';
import SortBySelect from '@atoms/shared/SortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';

interface CategoryControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder?: string;
  addButtonHref?: string;
  addButtonText?: string;
  showAddButton?: boolean;
  onTreeToggle?: () => void;
  treeButtonText?: string;
  sortBy: SortBy;
  updateSortBy: (value: SortBy) => void;
  sortOrder: SortOrder;
  updateSortOrder: (value: SortOrder) => void;
  loading?: boolean;
}

function CategoryControls({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  addButtonHref,
  addButtonText,
  showAddButton = true,
  onTreeToggle,
  treeButtonText,
  sortBy,
  updateSortBy,
  sortOrder,
  updateSortOrder,
  loading = false,
}: CategoryControlsProps) {
  const handleSortByChange = useCallback(
    (value: SortBy | null) => {
      updateSortBy(value || SortBy.Name);
    },
    [updateSortBy],
  );

  const handleSortOrderChange = useCallback(
    (value: SortOrder | null) => {
      updateSortOrder(value || SortOrder.Asc);
    },
    [updateSortOrder],
  );

  return (
    <section
      className="flex flex-col gap-4"
      role="region"
      aria-label="Category controls"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full justify-end gap-2">
          {showAddButton && addButtonHref && addButtonText && (
            <Button
              asChild
              disabled={loading}
              className="text-accent bg-title hover:bg-accent-foreground"
              aria-label={addButtonText}
            >
              <Link href={addButtonHref}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>{addButtonText}</span>
              </Link>
            </Button>
          )}
        </div>

        <SearchBar
          placeholder={searchPlaceholder}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          aria-label="Search categories"
        />

        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SortBySelect
              value={sortBy}
              onChange={handleSortByChange}
              aria-label="Sort categories by"
            />
          </div>

          <div className="flex items-center gap-2">
            {onTreeToggle && treeButtonText && (
              <Button
                variant="outline"
                onClick={onTreeToggle}
                disabled={loading}
                className="flex items-center gap-2"
                aria-label={`Toggle ${treeButtonText.toLowerCase()}`}
                type="button"
              >
                <ListTree className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{treeButtonText}</span>
              </Button>
            )}

            <SortOrderSelect
              value={sortOrder}
              onChange={handleSortOrderChange}
              aria-label="Sort order"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CategoryControls);
