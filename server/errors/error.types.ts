import { GraphQLFormattedError } from 'graphql';

export interface ErrorContext {
  locale: string;
  isDevelopment: boolean;
}

export interface ErrorHandler {
  id: string;
  priority: number;
  matcher: (error: GraphQLFormattedError) => boolean;
  handler: (error: GraphQLFormattedError, context: ErrorContext) => boolean;
  allowConsoleLog?: boolean;
}

export interface ErrorCategory {
  name: string;
  handlers: ErrorHandler[];
}

export interface ErrorRegistry {
  categories: ErrorCategory[];
  fallbackHandler: (
    error: GraphQLFormattedError,
    context: ErrorContext,
  ) => void;
}

export interface ErrorMatchResult {
  matched: boolean;
  handler?: ErrorHandler;
}

export interface ToastConfig {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description?: string;
}

export interface ErrorMessages {
  [key: string]: {
    title: string;
    description?: string;
  };
}

export type ErrorMatcher = (error: GraphQLFormattedError) => boolean;
export type ErrorHandlerFunction = (
  error: GraphQLFormattedError,
  context: ErrorContext,
) => boolean;
