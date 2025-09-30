import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { link } from './link';

const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

export default getClient;
