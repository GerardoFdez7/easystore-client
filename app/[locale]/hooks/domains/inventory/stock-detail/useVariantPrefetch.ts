'use client';

import { useEffect, useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  fetchVariantLookup,
  toSelectedVariant,
  type SelectedVariant,
} from './variantLookup';

export type { SelectedVariant } from './variantLookup';

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

        const { products, variants } = await fetchVariantLookup(
          apollo,
          productName || undefined,
        );

        let found: SelectedVariant | null = null;

        if (initialVariantId) {
          found = variants.find((v) => v.id === initialVariantId) ?? null;
        }
        if (!found && variantSku) {
          found =
            variants.find(
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
              found = toSelectedVariant(v, exact[0].name);
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
