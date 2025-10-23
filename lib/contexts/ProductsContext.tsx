'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useGetAllProducts } from '@hooks/domains/products';
import {
  FindAllProductsQueryVariables,
  Product,
  Variant,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<unknown>;
  refreshProducts: (
    variables?: FindAllProductsQueryVariables,
  ) => Promise<unknown>;
  total: number;
  getVariantById: (variantId: string) => Variant | null;
  getProductByVariantId: (variantId: string) => Product | null;
  // Sort state and handlers
  sortBy: ProductSortBy;
  sortOrder: SortOrder;
  setSortBy: (sortBy: ProductSortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  handleSort: (column: ProductSortBy) => void;
  // Pagination support
  hasMore: boolean;
  fetchMore: () => Promise<void>;
  isLoadingMore: boolean;
  // Table pagination support
  fetchPage: (
    page: number,
    variables?: FindAllProductsQueryVariables,
  ) => Promise<void>;
  // View mode management
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

interface ProductsProviderProps {
  children: ReactNode;
  initialVariables?: FindAllProductsQueryVariables;
}

export function ProductsProvider({
  children,
  initialVariables,
}: ProductsProviderProps) {
  // Sort state - default to UPDATED_AT DESC as requested
  const [sortBy, setSortBy] = useState<ProductSortBy>(ProductSortBy.UpdatedAt);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Include sort parameters in the initial variables
  const variablesWithSort = useMemo(
    () => ({
      ...initialVariables,
      sortBy,
      sortOrder,
      page: viewMode === 'table' ? currentPage : 1,
      limit: 25,
    }),
    [initialVariables, sortBy, sortOrder, currentPage, viewMode],
  );

  const {
    products: queryProducts,
    loading,
    error,
    refetch,
    refreshProducts: originalRefreshProducts,
    total,
    hasMore: originalHasMore,
    fetchMore: apolloFetchMore,
  } = useGetAllProducts(variablesWithSort);

  // Override hasMore calculation for cards view based on context state
  const hasMore = useMemo(() => {
    if (viewMode === 'table') {
      return originalHasMore;
    }
    // For cards view, use the current page from context
    if (!total) return false;
    const limit = 25;
    return currentPage * limit < total;
  }, [viewMode, originalHasMore, total, currentPage]);

  // Manage products based on view mode
  const products = useMemo(() => {
    if (viewMode === 'table') {
      return queryProducts;
    } else {
      // For cards view, use accumulated products
      return allProducts;
    }
  }, [viewMode, queryProducts, allProducts]);

  // Update accumulated products when query products change
  useEffect(() => {
    if (viewMode === 'cards') {
      if (currentPage === 1) {
        // Reset for new search/filter
        setAllProducts(queryProducts);
      } else {
        // Append new products for infinite scroll - merge avoiding duplicates
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = queryProducts.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...newProducts];
        });
      }
    }
    // For table view, don't accumulate - just use queryProducts directly
  }, [queryProducts, viewMode, currentPage]);

  // Helper function to find a variant by ID across all products
  const getVariantById = (variantId: string): Variant | null => {
    for (const product of products) {
      if (product.variants) {
        const variant = product.variants.find((v) => v.id === variantId);
        if (variant) {
          return variant;
        }
      }
    }
    return null;
  };

  // Helper function to find the product that contains a specific variant
  const getProductByVariantId = (variantId: string): Product | null => {
    for (const product of products) {
      if (product.variants?.some((v) => v.id === variantId)) {
        return product;
      }
    }
    return null;
  };

  // Handle sort column click - toggle order if same column, otherwise set new column with ASC
  const handleSort = useCallback(
    (column: ProductSortBy) => {
      // Reset to first page when sorting changes
      setCurrentPage(1);
      setAllProducts([]); // Reset accumulated products for cards view

      if (sortBy === column) {
        // Same column, toggle order
        setSortOrder(
          sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
        );
      } else {
        // Different column, set to ASC
        setSortBy(column);
        setSortOrder(SortOrder.Asc);
      }
    },
    [sortBy, sortOrder],
  );

  // Fetch more products for infinite scroll (cards view)
  const fetchMore = useCallback(async () => {
    if (!hasMore || isLoadingMore || loading || viewMode === 'table') return;

    setIsLoadingMore(true);
    try {
      await apolloFetchMore({
        variables: {
          ...variablesWithSort,
          page: currentPage + 1,
        },
      });
      setCurrentPage((prev) => prev + 1);
    } catch (_err) {
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    hasMore,
    isLoadingMore,
    loading,
    viewMode,
    apolloFetchMore,
    variablesWithSort,
    currentPage,
  ]);

  // Fetch specific page for table pagination
  const fetchPage = useCallback(
    async (
      page: number,
      variables?: FindAllProductsQueryVariables,
    ): Promise<void> => {
      if (viewMode !== 'table') return;

      const refetchVariables = {
        ...initialVariables,
        ...variables,
        sortBy,
        sortOrder,
        page,
        limit: 25,
      };
      await refetch(refetchVariables);

      // Update currentPage AFTER successful refetch to ensure UI updates
      setCurrentPage(page);
    },
    [viewMode, refetch, initialVariables, sortBy, sortOrder],
  );

  // Enhanced refreshProducts that includes current sort state
  const refreshProducts = useCallback(
    (variables?: FindAllProductsQueryVariables) => {
      // Reset pagination when refreshing
      setCurrentPage(1);
      setIsLoadingMore(false);
      setAllProducts([]); // Reset accumulated products for cards view

      return originalRefreshProducts({
        ...variables,
        sortBy,
        sortOrder,
        page: 1,
        limit: 25,
      });
    },
    [originalRefreshProducts, sortBy, sortOrder],
  );

  // Auto-refresh products when sort state changes
  useEffect(() => {
    void refreshProducts();
  }, [sortBy, sortOrder, refreshProducts]);

  const contextValue: ProductsContextType = {
    products,
    loading,
    error,
    refetch,
    refreshProducts,
    total,
    getVariantById,
    getProductByVariantId,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    handleSort,
    hasMore,
    fetchMore,
    isLoadingMore,
    fetchPage,
    viewMode,
    setViewMode,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }
  return context;
}

// Custom hook specifically for variant data
export function useVariantFromProducts(variantId: string) {
  const { getVariantById, getProductByVariantId, loading, error } =
    useProductsContext();

  const variant = getVariantById(variantId);
  const product = getProductByVariantId(variantId);

  return {
    variant,
    product,
    loading,
    error,
    found: variant !== null,
  };
}
