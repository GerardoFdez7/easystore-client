import { SortBy, SortOrder } from '@graphql/generated';

type NestedCategory = {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
  subCategories?: NestedCategory[];
};

/** Variables sent by useCategoriesTree (key order matters to ApolloMswMocks). */
export const categoriesTreeVariables = (sortOrder: SortOrder) => ({
  page: 1,
  limit: 50,
  sortBy: SortBy.Name,
  sortOrder,
});

/** findCategoriesTree returns a flat list; the hook rebuilds the tree. */
export const flattenCategories = (
  nodes: NestedCategory[],
  parentId: string | null = null,
): { id: string; name: string; parentId: string | null }[] =>
  nodes.flatMap((node) => [
    { id: node.id, name: node.name, parentId: node.parentId ?? parentId },
    ...flattenCategories(node.subCategories ?? [], node.id),
  ]);

export const categoriesTreeResult = (nodes: NestedCategory[]) => {
  const categories = flattenCategories(nodes);
  return {
    data: {
      getAllCategories: {
        categories,
        total: categories.length,
        hasMore: false,
      },
    },
  };
};
