#!/usr/bin/env tsx

/**
 * Error Handler Testing Script
 *
 * This script helps developers test error handlers and detect conflicts
 * before adding new error handlers to the registry.
 *
 * Usage:
 * npm run test-errors
 * or
 * npx tsx scripts/test-error-handlers.ts
 */

import { GraphQLFormattedError } from 'graphql';
import { errorRegistry, findErrorHandler } from '../error-registry';
import {
  suggestErrorPriority,
  generateErrorHandlerTemplate,
  PRIORITY_RANGES,
} from '../priority-calculator';

// Test cases for common error scenarios
const testCases = [
  {
    name: 'Address Name Already Exists',
    error: { message: 'address name already exists' },
    expectedHandler: 'address-exists',
  },
  {
    name: 'Warehouse Address Already Exists',
    error: { message: 'warehouse addressid already exists' },
    expectedHandler: 'warehouse-address-exists',
  },
  {
    name: 'Warehouse Name Already Exists',
    error: { message: 'warehouse name already exists' },
    expectedHandler: 'warehouse-name-exists',
  },
  {
    name: 'Invalid Credentials',
    error: { message: 'invalid credentials' },
    expectedHandler: 'invalid-credentials',
  },
  {
    name: 'Account Locked',
    error: { message: 'account is temporarily locked' },
    expectedHandler: 'account-locked',
  },
  {
    name: 'Email Already Exists',
    error: {
      message: 'database create auth identity failed - email already exists',
    },
    expectedHandler: 'email-already-exists',
  },
  {
    name: 'Not Found',
    error: {
      message: 'Resource not found',
      extensions: { originalError: { error: 'Not Found', statusCode: 404 } },
    },
    expectedHandler: 'not-found-unexpected',
  },
  {
    name: 'Unexpected Not Found',
    error: {
      message: 'Resource not found',
      extensions: { originalError: { error: 'Not Found', statusCode: 404 } },
    },
    expectedHandler: 'not-found-unexpected',
  },
  {
    name: 'Bad Request',
    error: {
      message: 'Bad request',
      extensions: { originalError: { statusCode: 400 } },
    },
    expectedHandler: 'bad-request',
  },
  {
    name: 'Unauthorized',
    error: {
      message: 'Unauthorized',
      extensions: { originalError: { statusCode: 401 } },
    },
    expectedHandler: 'unauthorized',
  },
  {
    name: 'Internal Server Error',
    error: {
      message: 'Internal server error',
      extensions: { originalError: { statusCode: 500 } },
    },
    expectedHandler: 'internal-server-error',
  },
];

/**
 * Find which handler would process a given error
 */
function findMatchingHandler(error: GraphQLFormattedError) {
  const allHandlers = errorRegistry.categories
    .flatMap((category) => category.handlers)
    .sort((a, b) => a.priority - b.priority);

  return allHandlers.find((handler) => handler.matcher(error));
}

/**
 * Test all error handlers against test cases
 */
function testErrorHandlers() {
  console.log('🧪 Testing Error Handlers\n');
  console.log('='.repeat(60));

  let passedTests = 0;
  let failedTests = 0;

  testCases.forEach((testCase, index) => {
    const matchingHandler = findMatchingHandler(testCase.error);
    const isCorrect = matchingHandler?.id === testCase.expectedHandler;

    if (isCorrect) {
      console.log(`✅ Test ${index + 1}: ${testCase.name}`);
      console.log(`   Expected: ${testCase.expectedHandler}`);
      console.log(`   Got: ${matchingHandler?.id}`);
      passedTests++;
    } else {
      console.log(`❌ Test ${index + 1}: ${testCase.name}`);
      console.log(`   Expected: ${testCase.expectedHandler}`);
      console.log(`   Got: ${matchingHandler?.id || 'No handler matched'}`);
      console.log(`   Error: "${testCase.error.message}"`);
      failedTests++;
    }
    console.log('');
  });

  console.log('='.repeat(60));
  console.log(`📊 Results: ${passedTests} passed, ${failedTests} failed`);

  if (failedTests > 0) {
    console.log(
      '\n⚠️  Some tests failed. Check your error handlers for conflicts or missing matchers.',
    );
  } else {
    console.log('\n🎉 All tests passed!');
  }

  return { passedTests, failedTests };
}

/**
 * Detect conflicts between handlers
 */
function detectConflicts() {
  console.log('\n🔍 Detecting Handler Conflicts\n');
  console.log('='.repeat(60));

  const allHandlers = errorRegistry.categories
    .flatMap((category) => category.handlers)
    .sort((a, b) => a.priority - b.priority);

  const conflicts: Array<{
    message: string;
    handlers: Array<{ id: string; priority: number }>;
  }> = [];

  // Test each error message against all handlers
  const testMessages = testCases.map((tc) => tc.error.message);

  testMessages.forEach((message) => {
    const testError: GraphQLFormattedError = { message };
    const matchingHandlers = allHandlers.filter((handler) =>
      handler.matcher(testError),
    );

    if (matchingHandlers.length > 1) {
      conflicts.push({
        message,
        handlers: matchingHandlers.map((h) => ({
          id: h.id,
          priority: h.priority,
        })),
      });
    }
  });

  if (conflicts.length === 0) {
    console.log('✅ No conflicts detected between handlers.');
  } else {
    console.log(`❌ Found ${conflicts.length} conflicts:\n`);

    conflicts.forEach((conflict, index) => {
      console.log(`${index + 1}. Message: "${conflict.message}"`);
      console.log('   Matching handlers:');
      conflict.handlers.forEach((handler) => {
        console.log(`   - ${handler.id} (priority: ${handler.priority})`);
      });
      console.log(
        '   ⚠️  Only the first handler (lowest priority) will be executed.\n',
      );
    });
  }

  return conflicts;
}

/**
 * Show priority distribution
 */
function showPriorityDistribution() {
  console.log('\n📈 Priority Distribution\n');
  console.log('='.repeat(60));

  const allHandlers = errorRegistry.categories
    .flatMap((category) => category.handlers)
    .sort((a, b) => a.priority - b.priority);

  Object.entries(PRIORITY_RANGES).forEach(([category, range]) => {
    const handlersInRange = allHandlers.filter(
      (h) => h.priority >= range.min && h.priority <= range.max,
    );

    console.log(`${category} (${range.min}-${range.max}):`);
    if (handlersInRange.length === 0) {
      console.log('  (no handlers)');
    } else {
      handlersInRange.forEach((handler) => {
        console.log(`  ${handler.priority}: ${handler.id}`);
      });
    }
    console.log('');
  });
}

/**
 * Interactive mode for testing new handlers
 */
async function interactiveMode() {
  const readline = await import('readline');

  console.log('\n🎯 Interactive Error Handler Tool\n');
  console.log('='.repeat(60));
  console.log('Available commands:');
  console.log(
    '  test <message>     - Test which handler matches an error message',
  );
  console.log('  suggest <message>  - Get priority suggestion for new handler');
  console.log('  template <id> <message> - Generate handler template');
  console.log('  conflicts          - Check for handler conflicts');
  console.log('  distribution       - Show priority distribution');
  console.log('  help               - Show this help');
  console.log('  exit               - Quit interactive mode\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', (input) => {
    const trimmed = input.trim();

    if (!trimmed) {
      rl.prompt();
      return;
    }

    const [command, ...args] = trimmed.split(' ');
    const restOfInput = args.join(' ');

    try {
      switch (command.toLowerCase()) {
        case 'exit':
        case 'quit':
          console.log('Goodbye! 👋');
          rl.close();
          return;

        case 'help':
          console.log('\nAvailable commands:');
          console.log(
            '  test <message>     - Test which handler matches an error message',
          );
          console.log(
            '  suggest <message>  - Get priority suggestion for new handler',
          );
          console.log('  template <id> <message> - Generate handler template');
          console.log('  conflicts          - Check for handler conflicts');
          console.log('  distribution       - Show priority distribution');
          console.log('  help               - Show this help');
          console.log('  exit               - Quit interactive mode\n');
          break;

        case 'test':
          if (!restOfInput) {
            console.log('Usage: test <error message>');
            console.log('Example: test "warehouse address already exists"');
          } else {
            const testError: GraphQLFormattedError = { message: restOfInput };
            const result = findErrorHandler(testError);

            if (result.matched && result.handler) {
              console.log(
                `✅ Handler found: ${result.handler.id} (priority: ${result.handler.priority})`,
              );
            } else {
              console.log('❌ No handler matches this error message');
            }
          }
          break;

        case 'suggest':
          if (!restOfInput) {
            console.log('Usage: suggest <error message>');
            console.log('Example: suggest "new error type occurred"');
          } else {
            const analysis = suggestErrorPriority(restOfInput);
            console.log('\n📊 Priority Analysis:');
            console.log(`Category: ${analysis.suggestedCategory}`);
            console.log(`Priority: ${analysis.suggestedPriority}`);
            console.log(`Reasoning: ${analysis.reasoning}`);

            if (analysis.conflictWarnings.length > 0) {
              console.log('\n⚠️  Warnings:');
              analysis.conflictWarnings.forEach((warning) => {
                console.log(`  - ${warning}`);
              });
            }
          }
          break;

        case 'template':
          const templateArgs = restOfInput.split(' ');
          if (templateArgs.length < 2) {
            console.log('Usage: template <handler-id> <error message>');
            console.log('Example: template "my-error" "something went wrong"');
          } else {
            const handlerId = templateArgs[0].replace(/['"]/g, '');
            const errorMessage = templateArgs
              .slice(1)
              .join(' ')
              .replace(/['"]/g, '');
            const { template, analysis } = generateErrorHandlerTemplate(
              handlerId,
              errorMessage,
            );

            console.log('\n📝 Generated Handler Template:');
            console.log('='.repeat(40));
            console.log(template);
            console.log('='.repeat(40));
            console.log(`\nSuggested Category: ${analysis.suggestedCategory}`);
            console.log(`Priority: ${analysis.suggestedPriority}`);

            if (analysis.conflictWarnings.length > 0) {
              console.log('\n⚠️  Potential Conflicts:');
              analysis.conflictWarnings.forEach((warning) => {
                console.log(`  - ${warning}`);
              });
            }
          }
          break;

        case 'conflicts':
          console.log('\n🔍 Checking for conflicts...');
          const conflicts = detectConflicts();
          if (conflicts.length === 0) {
            console.log('✅ No conflicts detected!');
          }
          break;

        case 'distribution':
          showPriorityDistribution();
          break;

        default:
          console.log(`Unknown command: ${command}`);
          console.log('Type "help" for available commands');
          break;
      }
    } catch (error) {
      console.error('Error executing command:', error);
    }

    console.log('');
    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Error Handler Testing Script

Usage:
  npm run test-errors [options]

Options:
  --test          Run all test cases
  --conflicts     Detect handler conflicts
  --distribution  Show priority distribution
  --interactive   Interactive testing mode
  --all           Run all checks (default)
  --help, -h      Show this help

Examples:
  npm run test-errors --test
  npm run test-errors --conflicts
  npm run test-errors --all
    `);
    return;
  }

  const runTest = args.includes('--test');
  const runConflicts = args.includes('--conflicts');
  const runDistribution = args.includes('--distribution');
  const runInteractive = args.includes('--interactive');
  const runAll =
    args.includes('--all') ||
    (!runTest &&
      !runConflicts &&
      !runDistribution &&
      !runInteractive &&
      args.length === 0);

  if (runTest) {
    const results = testErrorHandlers();
    if (results.failedTests > 0) {
      process.exit(1);
    }
    return; // Exit early to prevent runAll from executing
  }

  if (runConflicts) {
    const conflicts = detectConflicts();
    if (conflicts.length > 0) {
      process.exit(1);
    }
    return; // Exit early to prevent runAll from executing
  }

  if (runDistribution) {
    showPriorityDistribution();
    return; // Exit early to prevent runAll from executing
  }

  if (runInteractive) {
    await interactiveMode();
    return; // Exit early to prevent runAll from executing
  }

  if (runAll) {
    console.log('🔍 Running all error handler checks...\n');

    const results = testErrorHandlers();
    console.log('');

    const conflicts = detectConflicts();
    console.log('');

    showPriorityDistribution();

    if (results.failedTests > 0 || conflicts.length > 0) {
      process.exit(1);
    }
  }
}

// Example usage functions for developers
export function testNewHandler(
  handlerId: string,
  errorMessage: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorExtensions?: any,
) {
  console.log(`\n🔧 Testing New Handler: ${handlerId}\n`);

  // Get priority suggestion
  const analysis = suggestErrorPriority(errorMessage, errorExtensions);
  console.log('Priority Analysis:');
  console.log(`  Suggested Category: ${analysis.suggestedCategory}`);
  console.log(`  Suggested Priority: ${analysis.suggestedPriority}`);
  console.log(`  Reasoning: ${analysis.reasoning}`);

  if (analysis.conflictWarnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    analysis.conflictWarnings.forEach((warning) => {
      console.log(`  - ${warning}`);
    });
  }

  // Generate template
  const { template } = generateErrorHandlerTemplate(
    handlerId,
    errorMessage,
    errorExtensions,
  );
  console.log('\n📝 Generated Template:');
  console.log(template);

  return analysis;
}

// Run if called directly
if (require.main === module) {
  main().catch((err) => {
    console.error('Unhandled error in main():', err);
    process.exit(1);
  });
}
