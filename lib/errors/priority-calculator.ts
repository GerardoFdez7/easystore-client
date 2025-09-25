/* eslint-disable */
import { GraphQLFormattedError } from 'graphql';
import { errorRegistry } from './error-registry';

/**
 * Priority ranges for different error categories
 */
export const PRIORITY_RANGES = {
  DATABASE_CONSTRAINTS: { min: 100, max: 199 },
  AUTHENTICATION: { min: 200, max: 299 },
  HTTP_STATUS: { min: 300, max: 399 },
  BUSINESS_LOGIC: { min: 400, max: 499 },
  GENERIC_FALLBACK: { min: 500, max: 599 },
} as const;

/**
 * Error category types
 */
export type ErrorCategory = keyof typeof PRIORITY_RANGES;

/**
 * Analyze error message to suggest appropriate category and priority
 */
export function suggestErrorPriority(
  errorMessage: string,
  errorExtensions?: any,
): {
  suggestedCategory: ErrorCategory;
  suggestedPriority: number;
  reasoning: string;
  conflictWarnings: string[];
} {
  const message = errorMessage.toLowerCase();
  const conflictWarnings: string[] = [];

  // Determine category based on error message patterns
  let suggestedCategory: ErrorCategory;
  let reasoning: string;

  if (
    message.includes('already exists') ||
    message.includes('constraint') ||
    message.includes('duplicate') ||
    message.includes('unique violation')
  ) {
    suggestedCategory = 'DATABASE_CONSTRAINTS';
    reasoning =
      'Contains database constraint keywords (already exists, constraint, duplicate)';
  } else if (
    message.includes('credentials') ||
    message.includes('authentication') ||
    message.includes('unauthorized') ||
    message.includes('login') ||
    message.includes('token')
  ) {
    suggestedCategory = 'AUTHENTICATION';
    reasoning =
      'Contains authentication keywords (credentials, unauthorized, login)';
  } else if (
    errorExtensions?.originalError?.statusCode ||
    message.includes('not found') ||
    message.includes('bad request') ||
    message.includes('server error')
  ) {
    suggestedCategory = 'HTTP_STATUS';
    reasoning =
      'Contains HTTP status indicators or has statusCode in extensions';
  } else if (
    message.includes('insufficient') ||
    message.includes('limit exceeded') ||
    message.includes('invalid operation') ||
    message.includes('business rule')
  ) {
    suggestedCategory = 'BUSINESS_LOGIC';
    reasoning =
      'Contains business logic keywords (insufficient, limit, invalid operation)';
  } else {
    suggestedCategory = 'GENERIC_FALLBACK';
    reasoning = 'Does not match specific patterns, categorized as generic';
  }

  // Calculate suggested priority within the category
  const range = PRIORITY_RANGES[suggestedCategory];
  const existingHandlers = errorRegistry.categories
    .flatMap((cat) => cat.handlers)
    .filter(
      (handler) =>
        handler.priority >= range.min && handler.priority <= range.max,
    )
    .sort((a, b) => a.priority - b.priority);

  let suggestedPriority: number;

  if (existingHandlers.length === 0) {
    // First handler in this category
    suggestedPriority = range.min;
  } else {
    // Find the next available priority (increment by 10)
    const lastPriority = existingHandlers[existingHandlers.length - 1].priority;
    suggestedPriority = Math.min(lastPriority + 10, range.max);

    if (suggestedPriority > range.max) {
      suggestedPriority = range.max;
      conflictWarnings.push(
        `Priority range for ${suggestedCategory} is full. Consider using a different category or reorganizing priorities.`,
      );
    }
  }

  // Check for potential conflicts with existing handlers
  const testError: GraphQLFormattedError = {
    message: errorMessage,
    extensions: errorExtensions,
  };

  existingHandlers.forEach((handler) => {
    if (handler.matcher(testError)) {
      conflictWarnings.push(
        `Potential conflict with existing handler "${handler.id}" (priority ${handler.priority}). Make your matcher more specific.`,
      );
    }
  });

  return {
    suggestedCategory,
    suggestedPriority,
    reasoning,
    conflictWarnings,
  };
}

/**
 * Generate a complete error handler template with suggested priority
 */
export function generateErrorHandlerTemplate(
  handlerId: string,
  errorMessage: string,
  errorExtensions?: any,
): {
  template: string;
  analysis: ReturnType<typeof suggestErrorPriority>;
} {
  const analysis = suggestErrorPriority(errorMessage, errorExtensions);

  const template = `{
  id: '${handlerId}',
  priority: ${analysis.suggestedPriority}, // ${analysis.reasoning}
  matcher: (error: GraphQLFormattedError) => {
    const message = error.message?.toLowerCase() || '';
    // TODO: Make this matcher more specific to avoid conflicts
    return message.includes('${errorMessage.toLowerCase()}');
  },
  handler: (error: GraphQLFormattedError, context: ErrorContext) => {
    const { locale, isDevelopment } = context;
    
    // Show backend message in development, localized message in production
    const toastMessage = isDevelopment 
      ? error.message 
      : getLocalizedMessage(locale, 'your-error-key');
    
    const toastDescription = isDevelopment 
      ? 'Backend Error (Development Mode)' 
      : getLocalizedMessage(locale, 'your-error-description');
    
    toast.error(toastMessage, {
      description: toastDescription,
    });
    
    return true;
  },
}`;

  return { template, analysis };
}

/**
 * Validate that a new handler won't conflict with existing ones
 */
export function validateNewHandler(
  handlerId: string,
  priority: number,
  matcher: (error: GraphQLFormattedError) => boolean,
  testMessages: string[] = [],
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if handler ID already exists
  const existingHandlers = errorRegistry.categories.flatMap(
    (cat) => cat.handlers,
  );
  if (existingHandlers.some((handler) => handler.id === handlerId)) {
    errors.push(
      `Handler ID "${handlerId}" already exists. Choose a unique ID.`,
    );
  }

  // Check if priority is already used
  if (existingHandlers.some((handler) => handler.priority === priority)) {
    warnings.push(
      `Priority ${priority} is already used. Consider using a different priority to avoid confusion.`,
    );
  }

  // Test against common error messages to detect conflicts
  const defaultTestMessages = [
    'address already exists',
    'warehouse addressid already exists',
    'warehouse name already exists',
    'invalid credentials',
    'account is temporarily locked',
    'database create auth identity failed - email already exists',
    'Resource not found',
    'Bad request',
    'Unauthorized',
    'Internal server error',
  ];

  const messagesToTest = [...defaultTestMessages, ...testMessages];

  messagesToTest.forEach((message) => {
    const testError: GraphQLFormattedError = { message };

    if (matcher(testError)) {
      // Check if any existing handler also matches this message
      const conflictingHandlers = existingHandlers.filter((handler) =>
        handler.matcher(testError),
      );

      if (conflictingHandlers.length > 0) {
        const conflictIds = conflictingHandlers.map((h) => h.id).join(', ');
        errors.push(
          `New handler conflicts with existing handlers [${conflictIds}] for message: "${message}"`,
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).errorPriorityCalculator = {
    suggestErrorPriority,
    generateErrorHandlerTemplate,
    validateNewHandler,
    PRIORITY_RANGES,
  };
}
