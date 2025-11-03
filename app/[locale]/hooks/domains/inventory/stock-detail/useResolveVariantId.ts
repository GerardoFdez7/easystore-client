'use client';

import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import {
  FindAllVariantsToCreateStockDocument,
  type FindAllVariantsToCreateStockQuery,
  type FindAllVariantsToCreateStockQueryVariables,
  ProductSortBy,
  SortOrder,
} from '@graphql/generated';
import type { SelectedVariant } from './useVariantPrefetch';

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
        const variables: FindAllVariantsToCreateStockQueryVariables = {
          page: 1,
          limit: 25,
          name: undefined,
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
        const allVariants =
          products.flatMap((p) =>
            (p.variants ?? []).map((v) => ({
              ...v,
              productName: p.name,
            })),
          ) ?? [];

        const matchesBySku = allVariants.filter(
          (v) => (v.sku ?? '').toLowerCase() === skuToUse.toLowerCase(),
        );

        if (matchesBySku.length === 0) {
          throw new Error(t('variantNotFoundBySku'));
        }
        if (matchesBySku.length > 1) {
          if (variantAttributeFilter?.key && variantAttributeFilter?.value) {
            const narrowed = matchesBySku.filter((v) =>
              (v.attributes ?? []).some(
                (a) =>
                  a.key?.toLowerCase() ===
                    variantAttributeFilter.key.toLowerCase() &&
                  a.value?.toLowerCase() ===
                    variantAttributeFilter.value.toLowerCase(),
              ),
            );
            if (narrowed.length === 1) return narrowed[0].id;
          }
          throw new Error(t('variantAmbiguousSku'));
        }
        if (!selectedVariant) {
          const first = matchesBySku[0];
          setSelectedVariant({
            id: first.id,
            sku: first.sku,
            productName: first.productName,
            attributes: first.attributes ?? [],
          });
        }
        return matchesBySku[0].id;
      }

      // 2) Fallback: por nombre de producto (+ atributo opcional)
      const name = (selectedVariant?.productName ?? productName ?? '').trim();
      if (!name) {
        throw new Error(t('missingVariantIdentifier'));
      }

      const variables: FindAllVariantsToCreateStockQueryVariables = {
        page: 1,
        limit: 25,
        name,
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
        const narrowed = variants.filter((v) =>
          (v.attributes ?? []).some(
            (a) =>
              a.key?.toLowerCase() ===
                variantAttributeFilter.key.toLowerCase() &&
              a.value?.toLowerCase() ===
                variantAttributeFilter.value.toLowerCase(),
          ),
        );
        if (narrowed.length === 1) return narrowed[0].id;
        if (narrowed.length > 1) {
          throw new Error(t('variantAmbiguousAttr'));
        }
      }

      if (variants.length === 1) {
        const v = variants[0];
        if (!selectedVariant) {
          setSelectedVariant({
            id: v.id,
            sku: v.sku,
            productName: exactProducts[0].name,
            attributes: v.attributes ?? [],
          });
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
