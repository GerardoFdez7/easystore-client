import { useMutation } from '@apollo/client/react';
import { Reference } from '@apollo/client/cache';
import { toast } from 'sonner';
import {
  DeleteDocument,
  DeleteMutation,
  DeleteMutationVariables,
  FindAllCategoriesDocument,
  FindCategoriesForPickerDocument,
  FindCategoriesTreeDocument,
} from '@graphql/generated';

/** Returns a mutation wrapper that deletes a category. */
export function useDeleteCategory() {
  const [mutate, { loading, error }] = useMutation<
    DeleteMutation,
    DeleteMutationVariables
  >(DeleteDocument, {
    update(cache, { data }) {
      if (data?.deleteCategory) {
        const deletedId = data.deleteCategory;

        // Update FindAllCategoriesDocument cache
        cache.modify({
          fields: {
            getAllCategories(existingData, { readField }) {
              if (!existingData?.categories) return existingData;

              return {
                ...existingData,
                categories: existingData.categories.filter(
                  (categoryRef: Reference) =>
                    readField('id', categoryRef) !== deletedId,
                ),
              };
            },
          },
        });

        // Also evict the deleted category from cache
        cache.evict({
          id: cache.identify({ __typename: 'Category', id: deletedId }),
        });
        cache.gc();
      }
    },
    refetchQueries: [
      { query: FindAllCategoriesDocument },
      { query: FindCategoriesForPickerDocument },
      { query: FindCategoriesTreeDocument },
    ],
    awaitRefetchQueries: true,
  });

  const remove = async (id: string) => {
    try {
      await mutate({ variables: { id } });
      toast.success('Category deleted');
    } catch (_e) {
      // Error handling is managed by the global error handler
    }
  };

  return { remove, loading, error };
}

export type UseDeleteCategory = ReturnType<typeof useDeleteCategory>;
export default useDeleteCategory;
