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
      productName: 'Product Name', // TODO: Get from variant/product data
      variantSku: 'SKU-123', // TODO: Get from variant data
      deltaQuantity: movement.deltaQty,
      reason: movement.reason,
      createdBy: 'User', // TODO: Get from user data
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
