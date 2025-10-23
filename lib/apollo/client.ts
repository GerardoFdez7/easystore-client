import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { link } from './link';

const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getAllProducts: {
              keyArgs: [
                'sortBy',
                'sortOrder',
                'categoriesIds',
                'type',
                'includeSoftDeleted',
                'name',
              ],
            },
            getAllCategories: {
              keyArgs: [
                'sortBy',
                'sortOrder',
                'parentId',
                'name',
                'includeSubcategories',
              ],
            },
          },
        },
        Category: {
          fields: {
            subCategories: {
              merge(existing = [], incoming) {
                if (
                  !incoming ||
                  (Array.isArray(incoming) && incoming.length === 0)
                ) {
                  return existing;
                }
                return incoming;
              },
            },
          },
        },
      },
    }),
    link,
  });
};

export default getClient;
