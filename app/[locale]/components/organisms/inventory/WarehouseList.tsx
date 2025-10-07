import { useTranslations } from 'next-intl';
import { FindWarehousesQuery, SortBy, SortOrder } from '@graphql/generated';
import { Plus, Warehouse } from 'lucide-react';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Skeleton } from '@shadcn/ui/skeleton';
import { SortControls } from '@molecules/shared/SortControls';
import WarehouseCard from '@molecules/inventory/WarehouseCard';
import EmptyState from '@molecules/shared/EmptyState';
import SearchBar from '@atoms/shared/SearchBar';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';

type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

export interface WarehouseListProps {
  warehouses: WarehouseType[];
  loading?: boolean;
  hasMore?: boolean;
  searchTerm: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSearchChange: (term: string) => void;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onLoadMore: () => void;
  onCreateWarehouse: () => void;
  onEditWarehouse: (warehouse: WarehouseType) => void;
  showCreateButton?: boolean;
  showSearch?: boolean;
  showSortControls?: boolean;
  className?: string;
}

export default function WarehouseList({
  warehouses,
  loading = false,
  hasMore = false,
  searchTerm,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
  onLoadMore,
  onCreateWarehouse,
  onEditWarehouse,
  showCreateButton = true,
  showSearch = true,
  showSortControls = true,
  className = '',
}: WarehouseListProps) {
  const t = useTranslations('Inventory.WarehouseManagement');

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="flex items-start space-x-4 rounded-lg">
          <CardContent className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <Skeleton className="h-7 w-7 rounded-sm" />
              <Skeleton className="h-6 w-34 sm:w-48" />
            </div>
            <div className="ml-1 flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-30 sm:w-70" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Empty state
  const renderEmptyState = () => (
    <EmptyState
      icon={Warehouse}
      title={t('noWarehousesTitle')}
      description={t('noWarehousesDescription')}
      buttonText={t('createFirstWarehouse')}
      onButtonClick={onCreateWarehouse}
    />
  );

  return (
    <section
      className={`space-y-6 ${className}`}
      role="region"
      aria-label={'warehouseList'}
    >
      {/* Header with search and actions */}
      {(showSearch || showCreateButton) && (
        <header className="flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          {showSearch && (
            <SearchBar
              placeholder={t('searchWarehouses')}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />
          )}

          {/* Create button */}
          {showCreateButton && (
            <Button
              onClick={onCreateWarehouse}
              className="shrink-0"
              variant={'title'}
              aria-label={t('createWarehouse')}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t('createWarehouse')}
            </Button>
          )}
        </header>
      )}

      {/* Sort controls */}
      {showSortControls && (
        <SortControls
          sortBy={sortBy}
          updateSortBy={onSortByChange}
          sortOrder={sortOrder}
          updateSortOrder={onSortOrderChange}
          className="justify-between"
        />
      )}

      {/* Warehouse list */}
      {loading ? (
        renderLoadingSkeleton()
      ) : warehouses.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="space-y-4" role="list" aria-label={'warehouses'}>
          {warehouses.map((warehouse) => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              onEdit={onEditWarehouse}
            />
          ))}

          {/* Load more button */}
          {hasMore && (
            <LoadMoreButton
              onClick={onLoadMore}
              isLoading={loading}
              containerClassName="pt-4"
            />
          )}
        </div>
      )}
    </section>
  );
}
