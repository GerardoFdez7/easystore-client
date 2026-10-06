import { GraphQLFormattedError } from 'graphql';
import { toast } from 'sonner';

import {
  ErrorHandler,
  ErrorCategory,
  ErrorRegistry,
  ErrorContext,
  ErrorMatchResult,
} from '@errors/error.types';

import en from '../../messages/en.json';
import es from '../../messages/es.json';
import pt from '../../messages/pt.json';

const messagesMap = {
  en,
  es,
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
 * Production responses are masked: the backend only sends `extensions.code`
 * plus, for some failures, `extensions.reason` / `extensions.resource`.
 * Development responses additionally carry `extensions.originalError`.
 */
function getExtension(error: GraphQLFormattedError, key: string): unknown {
  return error.extensions?.[key];
}

function isNotFound(error: GraphQLFormattedError): boolean {
  const originalError = getExtension(error, 'originalError') as
    | { error?: string }
    | undefined;
  return (
    getExtension(error, 'code') === 'NOT_FOUND' ||
    originalError?.error === 'Not Found'
  );
}

function getHttpStatus(error: GraphQLFormattedError): number | undefined {
  const originalError = getExtension(error, 'originalError') as
    | { statusCode?: number }
    | undefined;
  return originalError?.statusCode;
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
            ) + (isDevelopment ? ` Development message: ${error.message}` : ''),
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
          (isDevelopment ? ` Development message: ${error.message}` : ''),
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
          (isDevelopment ? ` Development message: ${error.message}` : ''),
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
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'category-hierarchy-depth-exceeded',
    priority: 140,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('category hierarchy cannot exceed') &&
        message.includes('levels')
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(
        getLocalizedMessage(locale, 'categoryHierarchyDepthExceeded'),
        {
          description:
            getLocalizedMessage(
              locale,
              'categoryHierarchyDepthExceededDescription',
            ) + (isDevelopment ? ` Development message: ${error.message}` : ''),
        },
      );
      return true;
    },
  },
  {
    id: 'product-name-exists',
    priority: 130,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product name already exists') ||
        (message.includes('product') &&
          message.includes('name') &&
          message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productNameAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'productNameAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-sku-exists',
    priority: 140,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product sku already exists') ||
        (message.includes('sku') && message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productSkuAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'productSkuAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-upc-exists',
    priority: 141,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product upc already exists') ||
        message.includes('upc already exists') ||
        (message.includes('upc') && message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productUpcAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'productUpcAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-ean-exists',
    priority: 142,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product ean already exists') ||
        message.includes('ean already exists') ||
        (message.includes('ean') && message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productEanAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'productEanAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-isbn-exists',
    priority: 143,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product isbn already exists') ||
        message.includes('isbn already exists') ||
        (message.includes('isbn') && message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productIsbnAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'productIsbnAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-barcode-exists',
    priority: 144,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('product barcode already exists') ||
        message.includes('barcode already exists') ||
        (message.includes('barcode') && message.includes('exists'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(
        getLocalizedMessage(locale, 'productBarcodeAlreadyExists'),
        {
          description:
            getLocalizedMessage(
              locale,
              'productBarcodeAlreadyExistsDescription',
            ) + (isDevelopment ? ` Development message: ${error.message}` : ''),
        },
      );
      return true;
    },
  },
  {
    id: 'store-domain-exists',
    priority: 147,
    matcher: (error: GraphQLFormattedError) => {
      // Production masks the message as "Resource already exists" (CONFLICT), so
      // match the operation too: the domain is the only unique field of a store.
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('store domain already exists') ||
        (error.extensions?.code === 'CONFLICT' &&
          error.path?.[0] === 'updateStore')
      );
    },
    handler: () => {
      // The store form shows this on the domain field (see useUpdateStore),
      // so no toast is surfaced here.
      return true;
    },
  },
  {
    id: 'dimension-required-physical',
    priority: 145,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes(
          'dimension property is required for physical products',
        ) ||
        (message.includes('dimension') &&
          message.includes('required') &&
          message.includes('physical'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'dimensionRequiredForPhysical'), {
        description:
          getLocalizedMessage(
            locale,
            'dimensionRequiredForPhysicalDescription',
          ) + (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'weight-required-physical',
    priority: 146,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        message.includes('weight property is required for physical products') ||
        (message.includes('weight') &&
          message.includes('required') &&
          message.includes('physical'))
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'weightRequiredForPhysical'), {
        description:
          getLocalizedMessage(locale, 'weightRequiredForPhysicalDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'weight-must-be-positive',
    priority: 148,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('weight must be a positive value');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'weightMustBePositive'), {
        description:
          getLocalizedMessage(locale, 'weightMustBePositiveDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'product-currency-locked',
    priority: 149,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('product currency cannot change');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'productCurrencyLocked'), {
        description:
          getLocalizedMessage(locale, 'productCurrencyLockedDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'cart-item-exists',
    priority: 150,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('item already exists in cart');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'cartItemAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'cartItemAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'wish-list-item-exists',
    priority: 151,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('already exist in your wishlist');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'wishListItemAlreadyExists'), {
        description:
          getLocalizedMessage(locale, 'wishListItemAlreadyExistsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
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
    id: 'unauthenticated-token-validation',
    priority: 200,
    matcher: (error: GraphQLFormattedError) => {
      const operationName = error.path?.[0];

      return (
        error.extensions?.code === 'UNAUTHENTICATED' &&
        operationName === 'validateToken'
      );
    },
    handler: () => {
      // AuthContext handles this expected result by redirecting protected routes
      // to the login page. Do not surface a toast or development console error.
      return true;
    },
  },
  {
    id: 'invalid-credentials',
    priority: 210,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        getExtension(error, 'reason') === 'INVALID_CREDENTIALS' ||
        message.includes('invalid credentials')
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'invalidCredentials'), {
        description:
          getLocalizedMessage(locale, 'invalidCredentialsDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'account-locked',
    priority: 220,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return (
        getExtension(error, 'reason') === 'ACCOUNT_LOCKED' ||
        message.includes('account is temporarily locked')
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'accountLocked'), {
        description:
          getLocalizedMessage(locale, 'accountLockedDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'email-already-exists',
    priority: 230,
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('email already exists');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.warning(getLocalizedMessage(locale, 'associatedAccount'), {
        description:
          getLocalizedMessage(locale, 'associatedAccountDescription') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
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
    id: 'not-found',
    priority: 300,
    allowConsoleLog: true,
    matcher: (error: GraphQLFormattedError) => isNotFound(error),
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      const backendMessage = isDevelopment
        ? ` Development message: ${error.message}`
        : '';

      // Name the missing resource when the backend exposes it
      const resource = getExtension(error, 'resource');
      const key = `${String(resource)}NotFound` as keyof typeof en.Errors;
      if (typeof resource === 'string' && key in en.Errors) {
        toast.error(getLocalizedMessage(locale, key), {
          description:
            getLocalizedMessage(
              locale,
              `${key}Description` as keyof typeof en.Errors,
            ) + backendMessage,
        });
      } else {
        toast.error(getLocalizedMessage(locale, 'title'), {
          description:
            getLocalizedMessage(locale, 'not-found-error') + backendMessage,
        });
      }
      return true;
    },
  },
  {
    id: 'bad-request',
    priority: 310,
    matcher: (error: GraphQLFormattedError) => {
      return (
        getHttpStatus(error) === 400 ||
        getExtension(error, 'code') === 'BAD_USER_INPUT'
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        // BAD_USER_INPUT messages are public by contract: show them as-is.
        description:
          getExtension(error, 'code') === 'BAD_USER_INPUT' && error.message
            ? error.message
            : getLocalizedMessage(locale, 'bad-request-error') +
              (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'unauthorized',
    priority: 320,
    matcher: (error: GraphQLFormattedError) => {
      const code = getExtension(error, 'code');
      return (
        getHttpStatus(error) === 401 ||
        code === 'UNAUTHENTICATED' ||
        code === 'FORBIDDEN'
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        description:
          getLocalizedMessage(locale, 'unauthorized-error') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
      });
      return true;
    },
  },
  {
    id: 'internal-server-error',
    priority: 330,
    matcher: (error: GraphQLFormattedError) => {
      return (
        getHttpStatus(error) === 500 ||
        getExtension(error, 'code') === 'INTERNAL_SERVER_ERROR'
      );
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;
      toast.error(getLocalizedMessage(locale, 'title'), {
        description:
          getLocalizedMessage(locale, 'internal-server-error') +
          (isDevelopment ? ` Development message: ${error.message}` : ''),
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
      (isDevelopment ? ` Development message: ${error.message}` : ''),
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
