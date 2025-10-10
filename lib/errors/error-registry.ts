import { GraphQLFormattedError } from 'graphql';
import { toast } from 'sonner';

import {
  ErrorHandler,
  ErrorCategory,
  ErrorRegistry,
  ErrorContext,
  ErrorMatchResult,
} from '@lib/types/error';

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
 * Utility function to get localized error messages
 */
function getLocalizedMessage(locale: string, key: keyof typeof en.Errors) {
  const messages =
    messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  return messages.Errors?.[key] || key;
  // NOTE: If you see an any error message here, please add the missing translation key to the messages file.
}

/**
 * Database constraint error handlers
 * Priority: 100-199 (highest priority for specific database constraints)
 */
const databaseConstraintHandlers: ErrorHandler[] = [
  {
    id: 'warehouse-address-exists',
    priority: 100,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('warehouse addressid already exists') ||
        (message.includes('warehouse') &&
          message.includes('addressid') &&
          message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(
        getLocalizedMessage(locale, 'warehouseAddressAlreadyExists'),
        {
          description:
            getLocalizedMessage(
              locale,
              'warehouseAddressAlreadyExistsDescription',
            ) + (isDevelopment ? ` Backend message: ${error.message}` : ''),
        },
      );
      return true;
    },
  },
  {
    id: 'address-exists',
    priority: 110,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('address name already exists');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'addressNameAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'addressNameAlreadyExistsDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'warehouse-name-exists',
    priority: 120,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('warehouse name already exists') ||
        (message.includes('warehouse') &&
          message.includes('name') &&
          message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'warehouseNameAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'warehouseNameAlreadyExistsDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'category-name-exists',
    priority: 130,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('category name already exists') ||
        (message.includes('category') &&
          message.includes('name') &&
          message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'categoryNameAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'categoryNameAlreadyExistsDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
];

/**
 * Authentication error handlers
 * Priority: 200-299
 */
const authenticationHandlers: ErrorHandler[] = [
  {
    id: 'invalid-credentials',
    priority: 200,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('invalid credentials');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'invalidCredentials'), {
        description:
          getLocalizedMessage(locale, 'invalidCredentialsDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'account-locked',
    priority: 210,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('account is temporarily locked');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'accountLocked'), {
        description:
          getLocalizedMessage(locale, 'accountLockedDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'email-already-exists',
    priority: 220,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('database create auth identity failed') &&
        message.includes('email already exists')
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'associatedAccount'), {
        description:
          getLocalizedMessage(locale, 'associatedAccountDescription') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
];

/**
 * HTTP status code error handlers
 * Priority: 300-399
 */
const httpStatusHandlers: ErrorHandler[] = [
  {
    id: 'not-found-expected',
    priority: 300,
    matcher: (error: GraphQLFormattedError) => {
      const originalError = error.extensions?.originalError as {
        error?: string;
        statusCode?: number;
      };

      // Only handle as silent if it's a known expected 404 scenario
      const isNotFound = originalError?.error === 'Not Found';
      if (!isNotFound) return false;

      // List of GraphQL operations where 404 is expected and should be silent
      // Add more operations here as needed
      const expectedNotFoundOperations = [
        'getAllWarehouses',
        'getWarehouseById',
        'findInventory',
        'getAllAddresses',
        'getAllProducts',
        'getAllCategories',
        'getCategoryById',
      ];

      // Check if this error comes from an expected operation
      const operationName = error.path?.[0];
      const isExpectedOperation =
        typeof operationName === 'string' &&
        expectedNotFoundOperations.includes(operationName);

      return isExpectedOperation;
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      // Silent handler for expected 404 errors - don't show toast
      // But still log in development for debugging context
      if (context.isDevelopment) {
        console.info('Expected 404 handled silently:', {
          operation: error.path?.[0],
          message: error.message,
        });
      }
      return true;
    },
  },
  {
    id: 'not-found-unexpected',
    priority: 310,
    allowConsoleLog: true, // Allow console logging for unexpected 404s in development
    matcher: (error: GraphQLFormattedError) => {
      const originalError = error.extensions?.originalError as {
        error?: string;
        statusCode?: number;
      };
      // Handle any remaining 404 errors that weren't caught by the expected handler
      return originalError?.error === 'Not Found';
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;

      // Show a developer-friendly warning for unexpected 404s
      if (isDevelopment) {
        toast.warning('Unexpected 404', {
          description: `Operation "${error.path?.[0]}" returned Not Found. Please handle it at your component, showing a friendly message to the user and add it to the expected operations at \"lib/errors/error-registry.ts. line 195"\.`,
        });
      } else {
        // In production, show a generic error to users
        toast.error(getLocalizedMessage(locale, 'title'), {
          description: getLocalizedMessage(locale, 'not-found-error'),
        });
      }
      return true;
    },
  },
  {
    id: 'bad-request',
    priority: 310,
    matcher: (error: GraphQLFormattedError) => {
      const originalError = error.extensions?.originalError as {
        statusCode?: number;
      };
      return originalError?.statusCode === 400;
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        description:
          getLocalizedMessage(locale, 'bad-request-error') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'unauthorized',
    priority: 320,
    matcher: (error: GraphQLFormattedError) => {
      const originalError = error.extensions?.originalError as {
        statusCode?: number;
      };
      return originalError?.statusCode === 401;
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        description:
          getLocalizedMessage(locale, 'unauthorized-error') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'internal-server-error',
    priority: 330,
    matcher: (error: GraphQLFormattedError) => {
      const originalError = error.extensions?.originalError as {
        statusCode?: number;
      };
      return originalError?.statusCode === 500;
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        description:
          getLocalizedMessage(locale, 'internal-server-error') +
          (isDevelopment ? ` Backend message: ${error.message}` : ''),
      });
      return true;
    },
  },
];

/**
 * Error categories organized by domain
 */
const errorCategories: ErrorCategory[] = [
  {
    name: 'Database Constraints',
    handlers: databaseConstraintHandlers,
  },
  {
    name: 'Authentication',
    handlers: authenticationHandlers,
  },
  {
    name: 'HTTP Status',
    handlers: httpStatusHandlers,
  },
];

/**
 * Fallback handler for unmatched errors
 */
function fallbackHandler(
  error: GraphQLFormattedError,
  context: ErrorContext,
): void {
  const { locale, isDevelopment } = context;

  if (isDevelopment) {
    console.error('Unhandled GraphQL Error:', {
      message: error.message,
      extensions: error.extensions,
      locations: error.locations,
      path: error.path,
      fullError: error,
    });
  }

  toast.error(getLocalizedMessage(locale, 'title'), {
    description:
      getLocalizedMessage(locale, 'generic-error') +
      (isDevelopment ? ` Backend message: ${error.message}` : ''),
  });
}

/**
 * Main error registry
 */
export const errorRegistry: ErrorRegistry = {
  categories: errorCategories,
  fallbackHandler,
};

/**
 * Find the best matching error handler for a given error
 */
export function findErrorHandler(
  error: GraphQLFormattedError,
): ErrorMatchResult {
  // Collect all handlers from all categories
  const allHandlers = errorRegistry.categories.flatMap(
    (category) => category.handlers,
  );

  // Sort by priority (lower number = higher priority)
  const sortedHandlers = allHandlers.sort((a, b) => a.priority - b.priority);

  // Find the first matching handler
  for (const handler of sortedHandlers) {
    if (handler.matcher(error)) {
      return {
        matched: true,
        handler,
      };
    }
  }

  return {
    matched: false,
  };
}

/**
 * Process a GraphQL error using the error registry
 */
export function processGraphQLError(
  error: GraphQLFormattedError,
  context: ErrorContext,
): boolean {
  const matchResult = findErrorHandler(error);

  // Check if this error will be handled by any specific handler (not just silent ones)
  const isHandledError = matchResult.matched;

  // Only log to console if it's handled by a specific handler that explicitly allows logging
  if (
    isHandledError &&
    context.isDevelopment &&
    matchResult.handler?.allowConsoleLog
  ) {
    console.error('GraphQL Error Debug:', {
      message: error.message,
      extensions: error.extensions,
      locations: error.locations,
      path: error.path,
      fullError: error,
    });
  }

  if (matchResult.matched && matchResult.handler) {
    return matchResult.handler.handler(error, context);
  }

  // Use fallback handler (which will log "Unhandled GraphQL Error" for unhandled errors)
  errorRegistry.fallbackHandler(error, context);
  return true;
}
