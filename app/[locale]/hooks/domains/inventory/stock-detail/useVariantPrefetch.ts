'use client';

import { useEffect, useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  FindAllVariantsToCreateStockDocument,
  type FindAllVariantsToCreateStockQuery,
  type FindAllVariantsToCreateStockQueryVariables,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';

export type SelectedVariant = {
  id: string;
  sku?: string | null;
  productName?: string;
  attributes?: Array<{ key: string; value: string }>;
};

type Options = {
  initialVariantId?: string;
  variantSku?: string;
  productName?: string;
};

export function useVariantPrefetch(opts: Options) {
  const { initialVariantId, variantSku, productName } = opts;
  const apollo = useApolloClient();
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariant | null>(null);

  const selectVariantFromSelector = useCallback(
    (
      variantId: string,
      sku?: string | null,
      productName?: string,
      attributes?: Array<{ key: string; value: string }>,
    ) => {
      setSelectedVariant({ id: variantId, sku, productName, attributes });
    },
    [],
  );

  useEffect(() => {
    let mounted = true;
    void (async () => {
      try {
        if (selectedVariant) return;
        if (!initialVariantId && !variantSku && !productName) return;

        const variables: FindAllVariantsToCreateStockQueryVariables = {
          page: 1,
          limit: 25,
          name: productName || undefined,
          sortBy: ProductSortBy.Name,
          sortOrder: SortOrder.Asc,
        };

        const res = await apollo.query<
          FindAllVariantsToCreateStockQuery,
          FindAllVariantsToCreateStockQueryVariables
        >({
          query: FindAllVariantsToCreateStockDocument,
          variables,
          fetchPolicy: 'network-only',
        });

        const products = res.data?.getAllProducts?.products ?? [];
        const allVariants = products.flatMap((p) =>
          (p.variants ?? []).map((v) => ({ ...v, productName: p.name })),
        );

        let found: SelectedVariant | null = null;

        if (initialVariantId) {
          found = allVariants.find((v) => v.id === initialVariantId) ?? null;
        }
        if (!found && variantSku) {
          found =
            allVariants.find(
              (v) => (v.sku ?? '').toLowerCase() === variantSku.toLowerCase(),
            ) ?? null;
        }
        if (!found && productName) {
          const exact = products.filter(
            (p) => (p.name ?? '').toLowerCase() === productName.toLowerCase(),
          );
          if (exact.length === 1) {
            const vs = exact[0].variants ?? [];
            if (vs.length === 1) {
              const v = vs[0];
              found = {
                id: v.id,
                sku: v.sku ?? null,
                attributes: v.attributes ?? [],
                productName: exact[0].name,
              };
            }
          }
        }

        if (found && mounted) {
          setSelectedVariant({
            id: found.id,
            sku: found.sku,
            productName: found.productName,
            attributes: found.attributes ?? [],
          });
        }
      } catch {
        // noop
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apollo, initialVariantId, variantSku, productName, selectedVariant]);

  return { selectedVariant, selectVariantFromSelector, setSelectedVariant };
}
