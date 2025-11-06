import { GraphQLFormattedError } from 'graphql';
import { toast } from 'sonner';
import { ErrorContext } from '@errors/error.types';
import { processGraphQLError } from './error-registry';

import en from '../../messages/en.json';
import es from '../../messages/es.json';
import fr from '../../messages/fr.json';
import it from '../../messages/it.json';
import pt from '../../messages/pt.json';

const messagesMap = {
  en,
  es,
  fr,
  it,
  pt,
};

/**
 * Get the current locale from the browser URL
 */
function getCurrentLocale(): string {
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/');
    const locale = pathSegments[1];
    // Validate that it's a supported locale
    if (locale && Object.keys(messagesMap).includes(locale)) {
      return locale;
    }
  }
  return 'en'; // Default fallback
}

/**
 * Get localized error message
 */
function getLocalizedMessage(
  locale: string,
  key: keyof typeof en.Errors,
): string {
  const messages =
    messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  return messages.Errors?.[key] || key;
}

/**
 * Handle network errors (connection issues, server unavailable, etc.)
 */
function handleNetworkError(networkError: Error, context: ErrorContext): void {
  const { locale, isDevelopment } = context;
  toast.error(getLocalizedMessage(locale, 'title'), {
    description:
      getLocalizedMessage(locale, 'network-error') +
      (isDevelopment ? ` Backend message: "${networkError.message}"` : ''),
    duration: Infinity,
  });
}

/**
 * Handle GraphQL errors using the error registry system
 */
function handleGraphQLErrors(
  graphQLErrors: readonly GraphQLFormattedError[],
  context: ErrorContext,
): void {
  graphQLErrors.forEach((error: GraphQLFormattedError) => {
    processGraphQLError(error, context);
  });
}

/**
 * Main Apollo error handler
 * This is the entry point for all Apollo Client errors
 */
export function handleApolloError(
  graphQLErrors?: readonly GraphQLFormattedError[] | null,
  networkError?: Error | null,
): void {
  // Early return if no errors
  if (!graphQLErrors && !networkError) {
    return;
  }

  // Create error context
  const context: ErrorContext = {
    locale: getCurrentLocale(),
    isDevelopment: process.env.NODE_ENV === 'development',
  };

  // Handle GraphQL errors
  if (graphQLErrors && graphQLErrors.length > 0) {
    handleGraphQLErrors(graphQLErrors, context);
    return;
  }

  // Handle network errors
  if (networkError) {
    handleNetworkError(networkError, context);
    return;
  }

  // Fallback for edge cases
  toast.error(getLocalizedMessage(context.locale, 'title'), {
    description: getLocalizedMessage(context.locale, 'generic-error'),
  });
}
