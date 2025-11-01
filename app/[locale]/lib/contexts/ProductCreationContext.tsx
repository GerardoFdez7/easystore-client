'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ProductFormData } from '@hooks/domains/products/useProductForm';
import type { VariantFormData } from '@hooks/domains/products/variant/useVariantForm';

interface ProductCreationContextType {
  // Product draft data
  productDraft: Partial<ProductFormData> | null;
  setProductDraft: (draft: Partial<ProductFormData> | null) => void;

  // Variants array for new product
  variantsDraft: VariantFormData[];
  addVariantDraft: (variant: VariantFormData) => void;
  updateVariantDraft: (index: number, variant: VariantFormData) => void;
  removeVariantDraft: (index: number) => void;
  clearVariantsDraft: () => void;

  // Clear all drafts
  clearAllDrafts: () => void;
}

const ProductCreationContext = createContext<
  ProductCreationContextType | undefined
>(undefined);

export function ProductCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [productDraft, setProductDraft] =
    useState<Partial<ProductFormData> | null>(null);
  const [variantsDraft, setVariantsDraft] = useState<VariantFormData[]>([]);

  const addVariantDraft = useCallback((variant: VariantFormData) => {
    setVariantsDraft((prev) => [...prev, variant]);
  }, []);

  const updateVariantDraft = useCallback(
    (index: number, variant: VariantFormData) => {
      setVariantsDraft((prev) => {
        const newVariants = [...prev];
        newVariants[index] = variant;
        return newVariants;
      });
    },
    [],
  );

  const removeVariantDraft = useCallback((index: number) => {
    setVariantsDraft((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearVariantsDraft = useCallback(() => {
    setVariantsDraft([]);
  }, []);

  const clearAllDrafts = useCallback(() => {
    setProductDraft(null);
    setVariantsDraft([]);
  }, []);

  return (
    <ProductCreationContext.Provider
      value={{
        productDraft,
        setProductDraft,
        variantsDraft,
        addVariantDraft,
        updateVariantDraft,
        removeVariantDraft,
        clearVariantsDraft,
        clearAllDrafts,
      }}
    >
      {children}
    </ProductCreationContext.Provider>
  );
}

export function useProductCreation() {
  const context = useContext(ProductCreationContext);
  if (context === undefined) {
    throw new Error(
      'useProductCreation must be used within a ProductCreationProvider',
    );
  }
  return context;
}
