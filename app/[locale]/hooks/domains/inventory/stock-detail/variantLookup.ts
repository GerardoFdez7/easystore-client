import type { ApolloClient } from '@apollo/client';
import {
  FindAllVariantsToCreateStockDocument,
  ProductSortBy,
  SortOrder,
  type FindAllVariantsToCreateStockQuery,
  type FindAllVariantsToCreateStockQueryVariables,
} from '@graphql/generated';

type LookupProduct =
  FindAllVariantsToCreateStockQuery['getAllProducts']['products'][number];
type LookupVariant = NonNullable<LookupProduct['variants']>[number];

export type SelectedVariant = {
  id: string;
  sku?: string | null;
  productName?: string;
  attributes?: Array<{ key: string; value: string }>;
};

export async function fetchVariantLookup(apollo: ApolloClient, name?: string) {
  const variables: FindAllVariantsToCreateStockQueryVariables = {
    page: 1,
    limit: 25,
    name,
    sortBy: ProductSortBy.Name,
    sortOrder: SortOrder.Asc,
  };
  const result = await apollo.query<
    FindAllVariantsToCreateStockQuery,
    FindAllVariantsToCreateStockQueryVariables
  >({
    query: FindAllVariantsToCreateStockDocument,
    variables,
    fetchPolicy: 'network-only',
  });
  const products = result.data?.getAllProducts?.products ?? [];
  const variants = products.flatMap((product) =>
    (product.variants ?? []).map((variant) => ({
      ...variant,
      productName: product.name,
    })),
  );

  return { products, variants };
}

export function matchesVariantAttribute(
  variant: Pick<LookupVariant, 'attributes'>,
  filter: { key: string; value: string },
) {
  const key = filter.key.toLowerCase();
  const value = filter.value.toLowerCase();
  return (variant.attributes ?? []).some(
    (attribute) =>
      attribute.key?.toLowerCase() === key &&
      attribute.value?.toLowerCase() === value,
  );
}

export function toSelectedVariant(
  variant: LookupVariant,
  productName: string,
): SelectedVariant {
  return {
    id: variant.id,
    sku: variant.sku ?? null,
    attributes: variant.attributes ?? [],
    productName,
  };
}
