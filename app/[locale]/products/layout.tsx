'use client';

import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
import { ProductFilterMode } from '@graphql/generated';
import type { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <ProductsProvider
      initialVariables={{
        page: 1,
        limit: 25,
        filterMode: ProductFilterMode.All,
        type: null,
      }}
    >
      <ProductCreationProvider>{children}</ProductCreationProvider>
    </ProductsProvider>
  );
}
