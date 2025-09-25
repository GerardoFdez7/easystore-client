import { GraphQLFormattedError } from 'graphql';
import { findErrorHandler, errorRegistry } from './error-registry';

/**
 * Test cases for error handlers to prevent conflicts and ensure correct matching
 */
const testCases = [
  // Database constraint errors
  {
    description: 'warehouse addressid already exists',
    errorMessage: 'warehouse addressid already exists',
    expectedHandlerId: 'warehouse-address-exists',
  },
  {
    description: 'address already exists (generic)',
    errorMessage: 'address already exists',
    expectedHandlerId: 'address-exists',
  },
  {
    description: 'warehouse name already exists',
    errorMessage: 'warehouse name already exists',
    expectedHandlerId: 'warehouse-name-exists',
  },
  // Authentication errors
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
    description: 'not found error (should be silent)',
    errorMessage: 'Resource not found',
    extensions: { originalError: { error: 'Not Found' } },
    expectedHandlerId: 'not-found-silent',
  },
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
