'use client';

import { ProductsProvider } from '@lib/contexts/ProductsContext';
import type { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <ProductsProvider
      initialVariables={{
        page: 1,
        limit: 100,
        includeSoftDeleted: true,
        type: null,
      }}
    >
      {children}
    </ProductsProvider>
  );
}
