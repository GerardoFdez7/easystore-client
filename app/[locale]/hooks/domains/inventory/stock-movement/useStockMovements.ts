import {
  FindAllMovementsQueryVariables,
  FindAllMovementsDocument,
  FindAllMovementsQuery,
} from '@graphql/generated';
import { useQuery } from '@apollo/client/react';

export interface StockMovementItem {
  id: string;
  productName: string;
  variantSku?: string;
  variantFirstAttribute?: { key: string; value: string };
  deltaQuantity: number;
  reason: string;
  createdBy: string;
  date: string;
}

export const useStockMovements = (
  variables: FindAllMovementsQueryVariables,
  skip?: boolean,
) => {
  const { data, loading, error } = useQuery<
    FindAllMovementsQuery,
    FindAllMovementsQueryVariables
  >(FindAllMovementsDocument, {
    variables,
    skip,
    fetchPolicy: 'cache-and-network',
  });

  // Map GraphQL data to StockMovementItem format
  const stockMovements: StockMovementItem[] =
    data?.getAllStockMovements?.stockMovements?.map((movement) => ({
      id: movement.id,
      productName: movement.productName || 'Unknown Product',
      variantSku: movement.variantSku || '',
      variantFirstAttribute: movement.variantFirstAttribute || undefined,
      deltaQuantity: movement.deltaQty,
      reason: movement.reason,
      createdBy: '',
      date: movement.occurredAt,
    })) || [];

  return {
    stockMovements,
    loading,
    error,
    total: data?.getAllStockMovements?.total || 0,
    hasMore: data?.getAllStockMovements?.hasMore || false,
  };
};
