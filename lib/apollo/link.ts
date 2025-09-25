import { HttpLink } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { handleApolloError } from '@lib/errors/error.handler';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';

/**
 * HTTP Link configuration for GraphQL requests
 */
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Error Link middleware for handling GraphQL and network errors
 * Uses the centralized error handling system with registry-based matching
 */
const errorLink = new ErrorLink(({ error }) => {
  let graphQLErrors = null;
  let networkError = null;

  // Extract GraphQL errors from different error types
  if (CombinedGraphQLErrors.is(error)) {
    graphQLErrors = error.errors;
  } else if (CombinedProtocolErrors.is(error)) {
    graphQLErrors = error.errors;
  } else {
    // Treat as network error if not a GraphQL error
    networkError = error;
  }

  // Delegate to centralized error handler
  handleApolloError(graphQLErrors, networkError);
});

/**
 * Combined Apollo Link chain
 * Error handling middleware is applied before HTTP requests
 */
export const link = errorLink.concat(httpLink);
