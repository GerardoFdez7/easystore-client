// hooks/domains/category/useDeleteCategory.ts
import * as Apollo from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import {
  DeleteDocument,
  DeleteMutation,
  DeleteMutationVariables,
} from '@graphql/generated';

/** Returns a mutation wrapper that deletes a category and keeps the cache consistent. */
export function useDeleteCategory() {
  const [mutate, { loading, error }] = useMutation<
    DeleteMutation,
    DeleteMutationVariables
  >(DeleteDocument, {
    update(cache, _result, { variables }) {
      const id = variables?.id as string | undefined;
      if (!id) return;

      // 1) Evict normalized entity Category:{id}
      cache.evict({ id: cache.identify({ __typename: 'Category', id }) });

      // 2) Remove it from every getAllCategories list
      cache.modify({
        fields: {
          /**
           * Apollo passes here the current field value (StoreObject or array).
           * We return a StoreObject (PaginatedCategoriesType) with the item filtered out.
           */
          getAllCategories(existing, { readField }) {
            // Guard: nothing to do if field missing
            if (!existing) return existing;

            // Coerce to StoreObject to access its shape safely
            const obj = existing as Apollo.StoreObject & {
              __typename?: string;
              categories?: ReadonlyArray<Apollo.Reference>;
              total?: number;
              hasMore?: boolean;
            };

            const before = Array.isArray(obj.categories)
              ? obj.categories.length
              : 0;

            const nextCategories = (obj.categories ?? []).filter(
              (ref) => readField<string>('id', ref) !== id,
            );

            const removed = before - nextCategories.length;

            // Return a StoreObject (what cache.modify expects)
            return {
              __typename: obj.__typename ?? 'PaginatedCategoriesType',
              ...obj,
              categories: nextCategories,
              total:
                typeof obj.total === 'number'
                  ? Math.max(0, obj.total - removed)
                  : obj.total,
            } as Apollo.StoreObject;
          },
        },
      });

      // 3) GC to purge orphans
      cache.gc();
    },
  });

  const remove = async (id: string) => {
    try {
      await mutate({ variables: { id } });
      toast.success('Category deleted');
    } catch (e) {
      toast.error('Could not delete category');
      throw e;
    }
  };

  return { remove, loading, error };
}

export type UseDeleteCategory = ReturnType<typeof useDeleteCategory>;
export default useDeleteCategory;
