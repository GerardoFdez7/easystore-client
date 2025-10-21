'use client';

import { ProductsProvider } from '@lib/contexts/ProductsContext';
import { ProductCreationProvider } from '@lib/contexts/ProductCreationContext';
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
        includeSoftDeleted: true,
        type: null,
      }}
    >
      <ProductCreationProvider>{children}</ProductCreationProvider>
    </ProductsProvider>
  );
}
