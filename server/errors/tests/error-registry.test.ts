import { GraphQLFormattedError } from 'graphql';
import { findErrorHandler, errorRegistry } from '../error-registry';

/**
 * Test cases for error handlers to prevent conflicts and ensure correct matching
 */
export const testCases = [
  // Database constraint errors
  {
    description: 'warehouse addressid already exists',
    errorMessage: 'warehouse addressid already exists',
    expectedHandlerId: 'warehouse-address-exists',
  },
  {
    description: 'address name already exists',
    errorMessage: 'address name already exists',
    expectedHandlerId: 'address-exists',
  },
  {
    description: 'warehouse name already exists',
    errorMessage: 'warehouse name already exists',
    expectedHandlerId: 'warehouse-name-exists',
  },
  {
    description: 'store domain already exists (shown on the form field)',
    errorMessage: 'Store domain already exists',
    expectedHandlerId: 'store-domain-exists',
  },
  {
    description: 'masked production conflict on updateStore (domain taken)',
    errorMessage: 'Resource already exists',
    extensions: { code: 'CONFLICT' },
    path: ['updateStore'],
    expectedHandlerId: 'store-domain-exists',
  },
  // Authentication errors
  {
    description: 'unauthenticated token validation (should be silent)',
    errorMessage: 'Authentication required',
    extensions: { code: 'UNAUTHENTICATED' },
    path: ['validateToken'],
    expectedHandlerId: 'unauthenticated-token-validation',
  },
  {
    description: 'invalid credentials',
    errorMessage: 'invalid credentials',
    expectedHandlerId: 'invalid-credentials',
  },
  {
    description: 'account is temporarily locked',
    errorMessage: 'account is temporarily locked',
    expectedHandlerId: 'account-locked',
  },
  {
    description: 'database create auth identity failed - email already exists',
    errorMessage: 'database create auth identity failed - email already exists',
    expectedHandlerId: 'email-already-exists',
  },
  // HTTP status errors
  {
    description: 'bad request error',
    errorMessage: 'Bad request',
    extensions: { originalError: { statusCode: 400 } },
    expectedHandlerId: 'bad-request',
  },
  {
    description: 'unauthorized error',
    errorMessage: 'Unauthorized',
    extensions: { originalError: { statusCode: 401 } },
    expectedHandlerId: 'unauthorized',
  },
  {
    description: 'internal server error',
    errorMessage: 'Internal server error',
    extensions: { originalError: { statusCode: 500 } },
    expectedHandlerId: 'internal-server-error',
  },
  // Production-shaped errors (masked by the backend: code + reason/resource only)
  {
    description: 'production invalid credentials',
    errorMessage: 'Authentication required',
    extensions: { code: 'UNAUTHENTICATED', reason: 'INVALID_CREDENTIALS' },
    path: ['login'],
    expectedHandlerId: 'invalid-credentials',
  },
  {
    description: 'production account locked',
    errorMessage: 'Operation not permitted',
    extensions: { code: 'FORBIDDEN', reason: 'ACCOUNT_LOCKED' },
    path: ['login'],
    expectedHandlerId: 'account-locked',
  },
  {
    description: 'production forbidden without reason',
    errorMessage: 'Operation not permitted',
    extensions: { code: 'FORBIDDEN' },
    expectedHandlerId: 'unauthorized',
  },
  {
    description: 'production not found with resource',
    errorMessage: 'Resource not found',
    extensions: { code: 'NOT_FOUND', resource: 'product' },
    path: ['getProductById'],
    expectedHandlerId: 'not-found',
  },
  {
    description: 'production unique conflict keeps the exposed message',
    errorMessage: 'Product sku already exists',
    extensions: { code: 'CONFLICT', field: 'sku' },
    expectedHandlerId: 'product-sku-exists',
  },
  {
    description: 'category hierarchy depth exceeded (public bad request)',
    errorMessage:
      'Category hierarchy cannot exceed 10 levels. Parent is at depth 10, adding this category would reach depth 11',
    extensions: { code: 'BAD_USER_INPUT' },
    expectedHandlerId: 'category-hierarchy-depth-exceeded',
  },
  {
    description: 'weight must be a positive value',
    errorMessage: 'Weight must be a positive value for physical products.',
    extensions: { code: 'BAD_USER_INPUT' },
    expectedHandlerId: 'weight-must-be-positive',
  },
  {
    description: 'production internal server error',
    errorMessage: 'Internal server error',
    extensions: { code: 'INTERNAL_SERVER_ERROR' },
    expectedHandlerId: 'internal-server-error',
  },
  {
    description: 'product currency locked',
    errorMessage: 'Product currency cannot change while orders use it',
    extensions: { code: 'CONFLICT' },
    expectedHandlerId: 'product-currency-locked',
  },
  {
    description: 'item already in cart',
    errorMessage: 'Item already exists in cart.',
    extensions: { code: 'BAD_USER_INPUT' },
    expectedHandlerId: 'cart-item-exists',
  },
  {
    description: 'item already in wish list',
    errorMessage: 'This variant already exist in your wishlist!',
    extensions: { code: 'BAD_USER_INPUT' },
    expectedHandlerId: 'wish-list-item-exists',
  },
];

/**
 * Test function to validate error handler matching
 */
export function testErrorHandlers(): {
  passed: number;
  failed: number;
  results: Array<{
    description: string;
    passed: boolean;
    expected: string;
    actual: string | null | undefined;
    errorMessage: string;
  }>;
} {
  const results = testCases.map((testCase) => {
    const error: GraphQLFormattedError = {
      message: testCase.errorMessage,
      extensions: testCase.extensions,
      path: testCase.path,
    };

    const matchResult = findErrorHandler(error);
    const actualHandlerId = matchResult.matched
      ? matchResult.handler?.id
      : null;
    const passed = actualHandlerId === testCase.expectedHandlerId;

    return {
      description: testCase.description,
      passed,
      expected: testCase.expectedHandlerId,
      actual: actualHandlerId,
      errorMessage: testCase.errorMessage,
    };
  });

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return { passed, failed, results };
}

/**
 * Detect potential conflicts between error handlers
 */
export function detectHandlerConflicts(): Array<{
  testMessage: string;
  conflictingHandlers: Array<{
    id: string;
    priority: number;
    matched: boolean;
  }>;
}> {
  const conflicts: Array<{
    testMessage: string;
    conflictingHandlers: Array<{
      id: string;
      priority: number;
      matched: boolean;
    }>;
  }> = [];

  // Test messages that could potentially match multiple handlers
  const potentialConflictMessages = [
    'address already exists',
    'warehouse addressid already exists',
    'warehouse name already exists',
    'user address already exists',
    'customer address already exists',
    'invalid user credentials',
    'authentication failed',
    'database constraint violation',
  ];

  potentialConflictMessages.forEach((message) => {
    const error: GraphQLFormattedError = { message };
    const allHandlers = errorRegistry.categories.flatMap((cat) => cat.handlers);

    const matchingHandlers = allHandlers
      .map((handler) => ({
        id: handler.id,
        priority: handler.priority,
        matched: handler.matcher(error),
      }))
      .filter((result) => result.matched);

    if (matchingHandlers.length > 1) {
      conflicts.push({
        testMessage: message,
        conflictingHandlers: matchingHandlers,
      });
    }
  });

  return conflicts;
}

/**
 * Run comprehensive error handler validation
 */
export function validateErrorHandlers(): {
  testResults: ReturnType<typeof testErrorHandlers>;
  conflicts: ReturnType<typeof detectHandlerConflicts>;
  summary: {
    allTestsPassed: boolean;
    hasConflicts: boolean;
    recommendations: string[];
  };
} {
  const testResults = testErrorHandlers();
  const conflicts = detectHandlerConflicts();

  const allTestsPassed = testResults.failed === 0;
  const hasConflicts = conflicts.length > 0;

  const recommendations: string[] = [];

  if (!allTestsPassed) {
    recommendations.push(
      'Some error handlers are not matching expected test cases. Review the matchers.',
    );
  }

  if (hasConflicts) {
    recommendations.push(
      'Multiple handlers match the same error messages. Make matchers more specific.',
    );
  }

  if (allTestsPassed && !hasConflicts) {
    recommendations.push('All error handlers are working correctly! ✅');
  }

  return {
    testResults,
    conflicts,
    summary: {
      allTestsPassed,
      hasConflicts,
      recommendations,
    },
  };
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).errorHandlerTesting = {
    testErrorHandlers,
    detectHandlerConflicts,
    validateErrorHandlers,
  };
}
