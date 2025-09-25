import { useState, useCallback, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useInfiniteScroll } from '@hooks/utils/useInfiniteScroll';
import {
  FindWarehousesDocument,
  CreateWarehouseDocument,
  UpdateWarehouseDocument,
  DeleteWarehouseDocument,
  SortBy,
  SortOrder,
  type FindWarehousesQuery,
  type FindWarehousesQueryVariables,
  type CreateWarehouseMutation,
  type CreateWarehouseMutationVariables,
  type UpdateWarehouseMutation,
  type UpdateWarehouseMutationVariables,
} from '@graphql/generated';

interface UseWarehouseManagementReturn {
  // Data
  warehouses: NonNullable<
    FindWarehousesQuery['getAllWarehouses']
  >['warehouses'];
  loading: boolean;
  error: Error | null;
  isLoadingMore: boolean;
  hasMore: boolean;
  total: number;

  // Search and filters
  searchTerm: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  page: number;

  // Actions
  updateSearchTerm: (term: string) => void;
  updateSortBy: (sortBy: SortBy) => void;
  updateSortOrder: (sortOrder: SortOrder) => void;
  handleLoadMore: () => Promise<void>;
  refetch: () => Promise<void>;

  // CRUD operations
  createWarehouse: (
    input: CreateWarehouseMutationVariables['input'],
  ) => Promise<CreateWarehouseMutation['createWarehouse'] | null>;
  updateWarehouse: (
    id: string,
    input: UpdateWarehouseMutationVariables['input'],
  ) => Promise<UpdateWarehouseMutation['updateWarehouse'] | null>;
  deleteWarehouse: (id: string) => Promise<boolean>;

  // Loading states
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

const LIMIT = 10;

export function useWarehouseManagement(): UseWarehouseManagementReturn {
  const t = useTranslations('Inventory.WarehouseManagement');

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);

  // Stable callback functions for infinite scroll
  const getItems = useCallback(
    (data: FindWarehousesQuery | undefined) =>
      data?.getAllWarehouses?.warehouses || [],
    [],
  );

  const getHasMore = useCallback(
    (data: FindWarehousesQuery | undefined) =>
      data?.getAllWarehouses?.hasMore || false,
    [],
  );

  const getTotal = useCallback(
    (data: FindWarehousesQuery | undefined) =>
      data?.getAllWarehouses?.total || 0,
    [],
  );

  // Initialize infinite scroll hook
  const {
    page,
    allItems: warehouses,
    isLoadingMore,
    hasMore,
    total,
    loadMore: infiniteLoadMore,
    resetPagination,
    handleDataUpdate,
  } = useInfiniteScroll<FindWarehousesQuery, FindWarehousesQueryVariables>({
    getItems,
    getHasMore,
    getTotal,
  });

  // Query variables
  const variables: FindWarehousesQueryVariables = useMemo(
    () => ({
      page,
      limit: LIMIT,
      name: searchTerm || undefined,
      sortBy,
      sortOrder,
    }),
    [page, searchTerm, sortBy, sortOrder],
  );

  // Query
  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
    fetchMore,
  } = useQuery(FindWarehousesDocument, {
    variables,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  // Connect query data to infinite scroll
  useEffect(() => {
    if (data) {
      handleDataUpdate(data, page);
    }
  }, [data, page, handleDataUpdate]);

  // Mutations
  const [createWarehouseMutation, { loading: isCreating }] = useMutation(
    CreateWarehouseDocument,
    {
      refetchQueries: [{ query: FindWarehousesDocument, variables }],
      awaitRefetchQueries: true,
    },
  );

  const [updateWarehouseMutation, { loading: isUpdating }] = useMutation(
    UpdateWarehouseDocument,
    {
      refetchQueries: [{ query: FindWarehousesDocument, variables }],
      awaitRefetchQueries: true,
    },
  );

  const [deleteWarehouseMutation, { loading: isDeleting }] = useMutation(
    DeleteWarehouseDocument,
    {
      refetchQueries: [{ query: FindWarehousesDocument, variables }],
      awaitRefetchQueries: true,
    },
  );

  // Data provided by infinite scroll hook: warehouses, hasMore, total

  // Actions
  const updateSearchTerm = useCallback(
    (term: string) => {
      setSearchTerm(term);
      resetPagination();
    },
    [resetPagination],
  );

  const updateSortBy = useCallback(
    (newSortBy: SortBy) => {
      setSortBy(newSortBy);
      resetPagination();
    },
    [resetPagination],
  );

  const updateSortOrder = useCallback(
    (newSortOrder: SortOrder) => {
      setSortOrder(newSortOrder);
      resetPagination();
    },
    [resetPagination],
  );

  const handleLoadMore = useCallback(async () => {
    if (!hasMore || loading || isLoadingMore) return;

    try {
      // Create a wrapper for fetchMore to handle Apollo Client v4 compatibility
      const fetchMoreWrapper = (
        options: Parameters<
          NonNullable<useQuery.Result<FindWarehousesQuery>['fetchMore']>
        >[0],
      ) => fetchMore(options) as Promise<useQuery.Result<FindWarehousesQuery>>;
      await infiniteLoadMore(fetchMoreWrapper, variables, loading);
    } catch (_err) {}
  }, [hasMore, loading, isLoadingMore, infiniteLoadMore, fetchMore, variables]);

  const refetch = useCallback(async () => {
    try {
      resetPagination();
      await apolloRefetch();
    } catch (_err) {}
  }, [resetPagination, apolloRefetch]);

  // CRUD operations
  const createWarehouse = useCallback(
    async (input: CreateWarehouseMutationVariables['input']) => {
      try {
        const result = await createWarehouseMutation({ variables: { input } });
        if (result.data?.createWarehouse) {
          toast.success(t('warehouseCreatedSuccessfully'));
          return result.data.createWarehouse;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [createWarehouseMutation, t],
  );

  const updateWarehouse = useCallback(
    async (id: string, input: UpdateWarehouseMutationVariables['input']) => {
      try {
        const result = await updateWarehouseMutation({
          variables: { id, input },
        });
        if (result.data?.updateWarehouse) {
          toast.success(t('warehouseUpdatedSuccessfully'));
          return result.data.updateWarehouse;
        }
        return null;
      } catch (_err) {
        return null;
      }
    },
    [updateWarehouseMutation, t],
  );

  const deleteWarehouse = useCallback(
    async (id: string) => {
      try {
        const result = await deleteWarehouseMutation({ variables: { id } });
        if (result.data?.deleteWarehouse) {
          toast.success(t('warehouseDeletedSuccessfully'));
          return true;
        }
        return false;
      } catch (_err) {
        return false;
      }
    },
    [deleteWarehouseMutation, t],
  );

  return {
    // Data
    warehouses: warehouses as NonNullable<
      FindWarehousesQuery['getAllWarehouses']
    >['warehouses'],
    loading,
    error: error || null,
    isLoadingMore,
    hasMore,
    total,

    // Search and filters
    searchTerm,
    sortBy,
    sortOrder,
    page,

    // Actions
    updateSearchTerm,
    updateSortBy,
    updateSortOrder,
    handleLoadMore,
    refetch,

    // CRUD operations
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,

    // Loading states
    isCreating,
    isUpdating,
    isDeleting,
  };
}
