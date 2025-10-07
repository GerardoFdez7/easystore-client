'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGetAllProducts } from '@hooks/domains/products';
import type {
  FindAllProductsQueryVariables,
  Product,
  Variant,
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
  const { products, loading, error, refetch, refreshProducts, total } =
    useGetAllProducts(initialVariables);

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

  const contextValue: ProductsContextType = {
    products,
    loading,
    error,
    refetch,
    refreshProducts,
    total,
    getVariantById,
    getProductByVariantId,
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
