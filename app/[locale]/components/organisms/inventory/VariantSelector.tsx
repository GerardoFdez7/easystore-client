import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useVariantSelector } from '@hooks/domains/inventory';
import { Package } from 'lucide-react';
import { Switch } from '@shadcn/ui/switch';
import { Label } from '@shadcn/ui/label';
import { Skeleton } from '@shadcn/ui/skeleton';
import { Card, CardContent, CardHeader } from '@shadcn/ui/card';
import SearchBar from '@atoms/shared/SearchBar';
import ProductVariantGroup from '@molecules/inventory/ProductVariantGroup';
import EmptyState from '@molecules/shared/EmptyState';
import ProductSortBySelect from '@atoms/shared/ProductSortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';
import { ProductSortBy, ProductFilterMode } from '@graphql/generated';

interface VariantSelectorProps {
  onVariantSelect: (
    variantId: string,
    productName: string,
    attributes: Array<{ key: string; value: string }>,
  ) => void;
  selectedVariantId?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  onVariantSelect,
  selectedVariantId,
}) => {
  const t = useTranslations('Inventory.AddStock');
  const router = useRouter();

  const {
    searchTerm,
    sortBy,
    sortOrder,
    filterMode,
    products,
    loading,
    hasMore,
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    updateFilterMode,
    handleLoadMore,
  } = useVariantSelector();

  const handleVariantSelect = (
    variantId: string,
    productName: string,
    attributes: Array<{ key: string; value: string }>,
  ) => {
    onVariantSelect(variantId, productName, attributes);
  };

  return (
    <section
      className="mx-4 space-y-4"
      role="region"
      aria-label={'variantSelection'}
    >
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <SearchBar
          placeholder={t('searchProducts')}
          searchTerm={searchTerm}
          onSearchChange={updateSearchTerm}
        />

        {/* Filters Row */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            {/* Archived Switch */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="includeArchived"
                className="text-sm"
                id="includeArchived-description"
              >
                {t('includeArchived')}
              </Label>
              <Switch
                id="includeArchived"
                checked={filterMode === ProductFilterMode.Archives}
                onCheckedChange={(checked) => {
                  updateFilterMode(
                    checked
                      ? ProductFilterMode.Archives
                      : ProductFilterMode.Actives,
                  );
                }}
                aria-describedby="includeArchived-description"
              />
            </div>
            <ProductSortBySelect
              value={sortBy}
              onChange={(value) => {
                if (value) {
                  updateSortBy(value);
                }
              }}
              availableOptions={[
                ProductSortBy.Name,
                ProductSortBy.CreatedAt,
                ProductSortBy.UpdatedAt,
                ProductSortBy.Sku,
                ProductSortBy.VariantCount,
              ]}
            />
          </div>
          <SortOrderSelect
            value={sortOrder}
            onChange={(value) => {
              if (value) {
                updateSortOrder(value);
              }
            }}
          />
        </div>
      </div>

      {/* Variants Grid */}
      <div className="space-y-4" role="list" aria-label={'productVariants'}>
        {loading ? (
          <div className="space-y-4" aria-live="polite" aria-label="loading">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="w-full">
                {/* Card Header Skeleton */}
                <CardHeader className="w-full pb-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                    <Skeleton className="h-5 w-32 sm:w-48" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </CardHeader>

                {/* Card Content Skeleton - Multiple variants */}
                <CardContent className="w-full space-y-2">
                  {Array.from({ length: 3 }).map((_, variantIndex) => (
                    <div
                      key={variantIndex}
                      className="flex flex-col rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <Skeleton className="mb-1 h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="mt-2 ml-auto h-8 w-20 rounded-md sm:mt-0 sm:ml-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Package}
            title={t('noVariantsFound')}
            description={t('noVariantsFoundDescription')}
            buttonText={t('viewProducts')}
            onButtonClick={() => router.push('/products')}
          />
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductVariantGroup
                key={product.name}
                productName={product.name}
                variants={product.variants}
                onVariantSelect={handleVariantSelect}
                selectedVariantId={selectedVariantId}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && products.length > 0 && (
          <LoadMoreButton
            onClick={() => {
              handleLoadMore().catch((_err) => {});
            }}
            isLoading={loading}
            containerClassName="pt-4"
          />
        )}
      </div>
    </section>
  );
};

VariantSelector.displayName = 'VariantSelector';

export default VariantSelector;
