'use client';

import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import {
  fetchVariantLookup,
  matchesVariantAttribute,
  toSelectedVariant,
  type SelectedVariant,
} from './variantLookup';

type Options = {
  initialVariantId?: string;
  variantSku?: string;
  productName?: string;
  variantAttributeFilter?: { key: string; value: string };
  selectedVariant: SelectedVariant | null;
  setSelectedVariant: (v: SelectedVariant) => void;
};

export function useResolveVariantId(opts: Options) {
  const {
    initialVariantId,
    variantSku,
    productName,
    variantAttributeFilter,
    selectedVariant,
    setSelectedVariant,
  } = opts;
  const apollo = useApolloClient();
  const t = useTranslations('StockDetail');

  return useCallback(
    async (providedId?: string): Promise<string> => {
      if (providedId) return providedId;
      if (selectedVariant?.id) return selectedVariant.id;
      if (initialVariantId) return initialVariantId;

      // 1) Resolver por SKU exacto
      const skuToUse = selectedVariant?.sku ?? variantSku ?? '';
      if (skuToUse && skuToUse.trim()) {
        const { variants } = await fetchVariantLookup(apollo);

        const matchesBySku = variants.filter(
          (v) => (v.sku ?? '').toLowerCase() === skuToUse.toLowerCase(),
        );

        if (matchesBySku.length === 0) {
          throw new Error(t('variantNotFoundBySku'));
        }
        if (matchesBySku.length > 1) {
          if (variantAttributeFilter?.key && variantAttributeFilter?.value) {
            const narrowed = matchesBySku.filter((variant) =>
              matchesVariantAttribute(variant, variantAttributeFilter),
            );
            if (narrowed.length === 1) return narrowed[0].id;
          }
          throw new Error(t('variantAmbiguousSku'));
        }
        if (!selectedVariant) {
          const first = matchesBySku[0];
          setSelectedVariant(toSelectedVariant(first, first.productName));
        }
        return matchesBySku[0].id;
      }

      // 2) Fallback: por nombre de producto (+ atributo opcional)
      const name = (selectedVariant?.productName ?? productName ?? '').trim();
      if (!name) {
        throw new Error(t('missingVariantIdentifier'));
      }

      const { products } = await fetchVariantLookup(apollo, name);
      const exactProducts = products.filter(
        (p) => (p.name ?? '').toLowerCase() === name.toLowerCase(),
      );

      if (exactProducts.length === 0) {
        throw new Error(t('productNotFound'));
      }
      if (exactProducts.length > 1) {
        throw new Error(t('productAmbiguous'));
      }

      const variants = exactProducts[0].variants ?? [];
      if (variants.length === 0) {
        throw new Error(
          t('productHasNoVariants') ||
            `El producto "${name}" no tiene variantes.`,
        );
      }

      if (variantAttributeFilter?.key && variantAttributeFilter?.value) {
        const narrowed = variants.filter((variant) =>
          matchesVariantAttribute(variant, variantAttributeFilter),
        );
        if (narrowed.length === 1) return narrowed[0].id;
        if (narrowed.length > 1) {
          throw new Error(t('variantAmbiguousAttr'));
        }
      }

      if (variants.length === 1) {
        const v = variants[0];
        if (!selectedVariant) {
          setSelectedVariant(toSelectedVariant(v, exactProducts[0].name));
        }
        return v.id;
      }

      throw new Error(t('variantAmbiguous'));
    },
    [
      apollo,
      initialVariantId,
      productName,
      selectedVariant,
      setSelectedVariant,
      t,
      variantAttributeFilter,
      variantSku,
    ],
  );
}
