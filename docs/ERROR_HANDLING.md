# Error Handling System

## Overview

The EasyStore error handling system is a robust, scalable middleware designed to catch and display database errors, GraphQL errors, and network errors to users in a consistent and user-friendly manner.

## Quick Start

### Testing Error Handlers

```bash
# Test all existing handlers
npm run test-errors

# Check for conflicts between handlers
npm run test-errors:conflicts

# View priority distribution
npm run test-errors:distribution

# Interactive mode for testing and development
npm run test-errors:interactive
```

### Interactive Development Tool

The interactive mode provides an intuitive command-line interface for testing and developing error handlers:

```bash
npm run test-errors:interactive
```

Available commands:

- `test <message>` - Test which handler matches an error message
- `suggest <message>` - Get priority suggestion for new handler
- `template <id> <message>` - Generate complete handler template
- `conflicts` - Check for handler conflicts
- `distribution` - Show priority distribution
- `help` - Show available commands
- `exit` - Quit interactive mode

**Example workflow:**

```
> test "warehouse address already exists"
✅ Handler found: warehouse-address-exists (priority: 100)

> suggest "inventory limit exceeded"
📊 Priority Analysis:
Category: BUSINESS_LOGIC
Priority: 400
Reasoning: Contains business logic keywords (limit, exceeded)

> template "inventory-limit" "inventory limit exceeded"
📝 Generated Handler Template:
{
  id: 'inventory-limit',
  priority: 400,
  matcher: (error: GraphQLFormattedError) => {
    const message = error.message?.toLowerCase() || '';
    return message.includes('inventory limit exceeded');
  },
  handler: (error: GraphQLFormattedError, context: ErrorContext) => {
    // Implementation here
  },
}
```

## Architecture

### Core Components

1. **Error Registry** (`lib/errors/error-registry.ts`) - Centralized error matching and handling system with console logging control
2. **Error Handler** (`lib/errors/error.handler.ts`) - Main entry point for Apollo Client errors
3. **Priority Calculator** (`lib/errors/priority-calculator.ts`) - Automated priority assignment and conflict detection
4. **Apollo Link** (`lib/apollo/link.ts`) - Error middleware integration
5. **Type Definitions** (`lib/types/error.ts`) - TypeScript interfaces for type safety

### Priority-Based Error Matching

The system uses a priority-based approach to resolve error conflicts:

```typescript
DATABASE_CONSTRAINTS: 100 - 199; // Unique constraints, foreign keys, etc.
AUTHENTICATION: 200 - 299; // Login, credentials, tokens, permissions
HTTP_STATUS: 300 - 399; // Status code based errors (404, 500, etc.)
BUSINESS_LOGIC: 400 - 499; // Domain-specific validation errors
GENERIC_FALLBACK: 500 - 599; // Catch-all handlers
```

Lower numbers indicate higher priority, ensuring specific errors are matched before generic ones.

## Adding New Error Handlers

### Step-by-Step Workflow

#### 1. Use Interactive Mode for Analysis

```bash
npm run test-errors:interactive
> suggest "your error message here"
```

This will provide:

- Suggested category and priority
- Conflict warnings
- Implementation guidance

#### 2. Generate Handler Template

```bash
> template "your-handler-id" "your error message"
```

This generates a complete, ready-to-use handler template with proper priority and structure.

#### 3. Test for Conflicts

```bash
> conflicts
```

Always check for conflicts before adding your handler to the registry.

#### 4. Add to Registry

Add your handler to the appropriate category in `lib/errors/error-registry.ts`:

```typescript
const databaseConstraintHandlers: ErrorHandler[] = [
  // ... existing handlers
  {
    id: 'your-handler-id',
    priority: 120, // From interactive analysis
    allowConsoleLog: false, // Optional: control console logging (default: false)
    matcher: (error: GraphQLFormattedError) => {
      const message = error.message?.toLowerCase() || '';
      return message.includes('your specific pattern');
    },
    handler: (error: GraphQLFormattedError, context: ErrorContext) => {
      const { locale, isDevelopment } = context;

      const toastMessage = isDevelopment
        ? error.message
        : getLocalizedMessage(locale, 'yourErrorKey');

      toast.error(toastMessage, {
        description: getLocalizedMessage(locale, 'yourErrorDescription'),
      });

      return true;
    },
  },
];
```

#### 5. Add Localized Messages

Update all message files (`messages/*.json`):

```json
{
  "Errors": {
    "yourErrorKey": "Your error title",
    "yourErrorDescription": "Your error description"
  }
}
```

#### 6. Verify Implementation

```bash
npm run test-errors
```

Ensure all tests pass and no conflicts are detected.

### Priority Assignment Rules

#### Automatic Category Detection

The system automatically suggests categories based on error message patterns:

| Pattern                                     | Category             | Examples                              |
| ------------------------------------------- | -------------------- | ------------------------------------- |
| `already exists`, `constraint`, `duplicate` | DATABASE_CONSTRAINTS | address-exists, warehouse-name-exists |
| `credentials`, `unauthorized`, `login`      | AUTHENTICATION       | invalid-credentials, account-locked   |
| `statusCode` in extensions, `not found`     | HTTP_STATUS          | not-found-silent, bad-request         |
| `insufficient`, `limit exceeded`            | BUSINESS_LOGIC       | insufficient-inventory                |
| Generic patterns                            | GENERIC_FALLBACK     | fallback-handler                      |

#### Priority Numbering Within Categories

- **Start at category minimum**: First handler gets the base number (e.g., 100)
- **Increment by 10**: Leave gaps for future additions (100, 110, 120...)
- **More specific = Lower number**: More specific matchers get higher priority (lower numbers)

### Best Practices

#### 1. Use Specific Matchers

```typescript
// ✅ Good: Specific matching
matcher: (error) => {
  const message = error.message?.toLowerCase() || '';
  return (
    message.includes('warehouse') &&
    message.includes('address') &&
    message.includes('already exists')
  );
};

// ❌ Bad: Too generic
matcher: (error) => {
  const message = error.message?.toLowerCase() || '';
  return message.includes('exists');
};
```

#### 2. Handle Development vs Production

```typescript
handler: (error, context) => {
  const { locale, isDevelopment } = context;

  toast.error(getLocalizedMessage(locale, 'title'), {
    description:
      getLocalizedMessage(locale, 'description') +
      (isDevelopment ? ` Debug: ${error.message}` : ''),
  });

  return true;
};
```

#### 3. Always Use Localization

```typescript
// ✅ Good: Localized
toast.error(getLocalizedMessage(locale, 'errorTitle'), {
  description: getLocalizedMessage(locale, 'errorDescription'),
});

// ❌ Bad: Hardcoded
toast.error('Error occurred', {
  description: 'Something went wrong',
});
```

## Development Environment Features

### Console Logging Control

The system intelligently controls console logging to prevent Next.js error overlays for handled errors:

- **Handled Errors**: All errors with specific handlers are silenced from console logging by default
- **Selective Debugging**: Handlers can opt-in to console logging using the `allowConsoleLog` property
- **Development Mode**: Only unexpected errors or handlers with explicit logging permission show in console

### Enhanced 404 Error Handling

The system differentiates between expected and unexpected 404 errors:

- **Expected 404s** (`not-found-expected`, priority 300): Silent handling for known operations like `getAllWarehouses`, `getWarehouseById`, `findInventory`
- **Unexpected 404s** (`not-found-unexpected`, priority 310): Developer warnings for potential missing endpoints with console logging enabled

### Backend Message Display

- **Development**: Shows `error.message` from backend for debugging
- **Production**: Shows localized messages from `messages/*.json`

This helps developers quickly identify and debug backend issues during development while maintaining clean error overlays.

## Error Handler Types

### Silent Handlers

For errors that shouldn't show toast notifications or console logs:

```typescript
{
  id: 'silent-error',
  priority: 300,
  matcher: (error) => /* your condition */,
  handler: () => {
    // Log or handle silently
    return true; // Indicates error was handled
  },
}
```

### Development-Only Handlers

For errors that should only appear in development with optional console logging:

```typescript
{
  id: 'dev-only-error',
  priority: 400,
  allowConsoleLog: true, // Optional: enables console logging in development
  matcher: (error) => /* your condition */,
  handler: (error, context) => {
    if (context.isDevelopment) {
      toast.info('Development Error', {
        description: error.message,
      });
    }
    return true;
  },
}
```

### Console Logging Control

Use the `allowConsoleLog` property to control development console output:

```typescript
{
  id: 'debug-handler',
  priority: 350,
  allowConsoleLog: true, // This handler will log to console in development
  matcher: (error) => /* your condition */,
  handler: (error, context) => {
    // Handler implementation
    return true;
  },
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Generic Matchers

**Problem**: `message.includes('address')` matches too many errors

**Solution**: Use multiple conditions

```typescript
return (
  message.includes('warehouse') &&
  message.includes('address') &&
  message.includes('already exists')
);
```

### Pitfall 2: Assuming Priority Numbers

**Problem**: Guessing priority numbers without checking existing handlers

**Solution**: Always use the interactive tool

```bash
> suggest "your error message"
```

### Pitfall 3: Not Testing Edge Cases

**Problem**: Only testing the exact error message you're handling

**Solution**: Test variations and potential conflicts in interactive mode

```bash
> test "warehouse address already exists"
> test "user address already exists"
> test "address already exists"
```

## Key Features

1. **No Order Dependency**: Error matching is priority-based
2. **Better Maintainability**: Centralized error definitions
3. **Type Safety**: Full TypeScript support
4. **Extensibility**: Easy to add new error types
5. **Testing**: Interactive development tool
6. **Documentation**: Self-documenting error categories
7. **Automated Priority Assignment**: Intelligent priority suggestions
8. **Conflict Detection**: Automatic conflict detection and resolution
9. **Console Logging Control**: Selective debugging with `allowConsoleLog` property
10. **Enhanced 404 Handling**: Differentiation between expected and unexpected 404 errors

## Performance Considerations

- Error handlers are sorted once at module load
- Matching stops at first successful match
- Console logging is conditionally executed based on handler configuration
- Toast notifications are debounced by the Sonner library
- Next.js error overlays are prevented for handled errors in development mode

This implementation follows industry best practices for error handling middleware with centralized error handling, strategy pattern, priority queue, context passing, separation of concerns, and graceful degradation.
