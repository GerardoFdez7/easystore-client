import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { link } from './link';

const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
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
