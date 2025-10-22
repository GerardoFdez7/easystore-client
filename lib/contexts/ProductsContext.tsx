'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
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

  // Include sort parameters in the initial variables
  const variablesWithSort = {
    ...initialVariables,
    sortBy,
    sortOrder,
  };

  const { products, loading, error, refetch, refreshProducts, total } =
    useGetAllProducts(variablesWithSort);

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

  // Enhanced refreshProducts that includes current sort state
  const refreshProductsWithSort = useCallback(
    (variables?: FindAllProductsQueryVariables) => {
      return refreshProducts({
        ...variables,
        sortBy,
        sortOrder,
      });
    },
    [refreshProducts, sortBy, sortOrder],
  );

  // Auto-refresh products when sort state changes
  useEffect(() => {
    void refreshProductsWithSort();
  }, [sortBy, sortOrder, refreshProductsWithSort]);

  const contextValue: ProductsContextType = {
    products,
    loading,
    error,
    refetch,
    refreshProducts: refreshProductsWithSort,
    total,
    getVariantById,
    getProductByVariantId,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    handleSort,
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
