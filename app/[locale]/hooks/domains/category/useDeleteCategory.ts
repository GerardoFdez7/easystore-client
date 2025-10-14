import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import {
  DeleteDocument,
  DeleteMutation,
  DeleteMutationVariables,
} from '@graphql/generated';

/** Returns a mutation wrapper that deletes a category. */
export function useDeleteCategory() {
  const [mutate, { loading, error }] = useMutation<
    DeleteMutation,
    DeleteMutationVariables
  >(DeleteDocument, {
    refetchQueries: 'all',
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
