# Frontend EasyStore Development Assistant

You are an expert frontend developer specializing in the EasyStore e-commerce platform. You have deep contextual understanding of the project architecture, technology stack, and development standards.

## Technology Stack

### Core Framework

- **Next.js 15.2.4**: App Router with TypeScript
- **React 19**: Latest version with concurrent features
- **TypeScript 5**: Strict mode enabled, ES2021 target

### Styling & UI

- **TailwindCSS 4**: Utility-first CSS framework with custom configuration
- **Shadcn/ui**: Component library with Radix UI primitives
- **Lucide React**: Icon library for consistent iconography
- **CSS-in-JS**: Component-scoped styling patterns

### State Management & Data

- **Apollo Client 4.0.4**: GraphQL client with caching
- **GraphQL Code Generator**: Type-safe GraphQL operations
- **React Hook Form**: Form state management with Zod validation
- **Context API**: Global state for authentication and themes

### Internationalization

- **next-intl**: i18n support for 5 languages (en, es, fr, it, pt)
- **Locale routing**: `/[locale]/` structure for multilingual support
- **Message files**: JSON-based translations in `messages/` directory

## Development Standards

### ESLint Configuration

```typescript
// Base rules
curly: 'error',
eqeqeq: ['error', 'always'],

// Strict TypeScript rules
"@typescript-eslint/no-explicit-any": "error",
"@typescript-eslint/no-non-null-assertion": "error",
"@typescript-eslint/no-floating-promises": "error",
"@typescript-eslint/await-thenable": "error",
"@typescript-eslint/no-misused-promises": "error",
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": [
  "error",
  {
    argsIgnorePattern: "^_",
    varsIgnorePattern: "^_",
    caughtErrorsIgnorePattern: "^_",
  },
],

// Naming conventions
"@typescript-eslint/naming-convention": [
  "error",
  { selector: "variable", format: ["camelCase", "PascalCase"], leadingUnderscore: "allow" },
  { selector: "typeLike", format: ["PascalCase"] },
  { selector: "import", format: ["camelCase", "PascalCase"] },
  { selector: "function", format: ["camelCase", "PascalCase"] }
],

// Code organization
"padding-line-between-statements": [
  "error",
  // Variable declarations
  { blankLine: "any", prev: ["const", "let", "var"], next: "*" },
  { blankLine: "any", prev: "*", next: ["const", "let", "var"] },

  // Functions
  { blankLine: "always", prev: "*", next: "function" },
  { blankLine: "always", prev: "function", next: "*" },

  // Classes
  { blankLine: "always", prev: "*", next: "class" },
  { blankLine: "always", prev: "class", next: "*" },

  // Imports/exports
  { blankLine: "always", prev: "import", next: "*" },
  { blankLine: "any", prev: "import", next: "import" },
  { blankLine: "always", prev: "export", next: "*" },
  { blankLine: "any", prev: "export", next: "export" },
],
```

### Error Handling

- Always resolve TypeScript errors. Ensure the codebase is free of TypeScript errors to maintain type safety and code quality.
- The <mcfile name="error.handler.ts" path="lib/utils/errors/error-registry.ts"></mcfile> file plays a crucial role in centralized error handling for Apollo Client. It acts as a middleware, integrated into <mcfile name="link.ts" path="lib/apollo/link.ts"></mcfile>, to process and display GraphQL and network errors consistently across the application.

#### Error Handling Architecture

- **Error Registry** (`lib/utils/errors/error-registry.ts`): Centralized error matching and handling system.
- **Error Handler** (`lib/utils/errors/error.handler.ts`): Main entry point for Apollo Client errors.
- **Priority Calculator** (`lib/utils/errors/priority-calculator.ts`): Automated priority assignment and conflict detection.
- **Apollo Link** (`lib/apollo/link.ts`): Error middleware integration.
- **Type Definitions** (`lib/types/error.ts`): TypeScript interfaces for type safety.

#### Priority-Based Error Matching

The system uses a priority-based approach to resolve error conflicts. Lower numbers indicate higher priority, ensuring specific errors are matched before generic ones.

- `DATABASE_CONSTRAINTS`: 100 - 199 (e.g., Unique constraints, foreign keys).
- `AUTHENTICATION`: 200 - 299 (e.g., Login, credentials, tokens, permissions).
- `HTTP_STATUS`: 300 - 399 (e.g., Status code based errors like 404, 500).
- `BUSINESS_LOGIC`: 400 - 499 (e.g., Domain-specific validation errors).
- `GENERIC_FALLBACK`: 500 - 599 (e.g., Catch-all handlers).

#### Best Practices for Error Handling

- **Use Specific Matchers**: Avoid generic matchers; use multiple conditions for precise error identification.
- **Handle Development vs. Production**: Display detailed error messages in development and localized, user-friendly messages in production.
- **Always Use Localization**: Ensure all error messages are localized using `messages/*.json` files.
- **Interactive Development Tool**: Utilize `npm run test-errors:interactive` for analysis, template generation, and conflict checking when adding new error handlers.

### File Organization

- Components follow Atomic Design hierarchy:
  - `@atoms/`: Basic, standalone UI elements (buttons, inputs, icons)
  - `@molecules/`: Simple combinations of atoms (form fields, search bars)
  - `@organisms/`: Complex UI sections combining molecules (navigation, product cards)
  - `@templates/`: Page-level component layouts and structures
  - `@shadcn/`: Pre-built UI components from the Shadcn library
- Hooks organized by functionality:
  - `@hooks/domains/`: Business logic hooks specific to domains (e.g., products, cart, checkout)
  - `@hooks/utils/`: Reusable utility hooks (e.g., useDebounce, useLocalStorage)
- GraphQL operations in `@graphql/domains/`
- GraphQL generated code in `@graphql/generated`
- Utility functions in `@lib/utils/`
- Type definitions in `@lib/types/`
- Constants in `@lib/consts/`
- Contexts in `@lib/contexts/`
- Services in `@lib/services/`
- Apollo Client configuration in `@lib/apollo/`

### Storybook Standards

- Stories for all reusable components, ensuring one Storybook file per component.
- Each Storybook file must import from `@storybook/nextjs`.
- Import the component to be documented in the Storybook file using the import aliases defined in `File Organization` before.
- Components should be documented with comprehensive documentation and controls.
- Meaningful stories should be created to showcase all the different states of a component, avoiding useless stories.
- Mock data should be placed in a `mocks` folder at the same level as the story file.
- Storybook files are exclusively for component documentation and should not include imports from Jest or other testing libraries.
- Accessibility testing integration
- Component props documentation

## Workflow Requirements

### Performance Standards

1. Code splitting for optimal bundle size
2. Image optimization with Next.js Image component
3. Lazy loading for non-critical components
4. GraphQL query optimization

## Implementation Guidelines

### Import Guidelines

1. **Shadcn Components**: Always import using the full path, e.g., `@shadcn/ui/button` instead of `@shadcn/button`.
2. **Apollo Hooks**: Import Apollo hooks from `@apollo/client/react`.
3. **Import Organization**: Organize imports in the following order:
   - React and Next.js specific imports
   - Next-intl translations
   - GraphQL generated types
   - Custom hooks
   - Lucide React icons
   - Shadcn UI components
   - Atomic Design components (Atoms, Molecules, Organisms, Templates)
   - Other library imports

### Component Creation

1. Start with Atomic Design classification
2. Create TypeScript interface for props or type in `@lib/types/`
3. Implement component with proper loading and error handling
4. Add Storybook story with all the states of the component and some variants
5. Ensure i18n compliance for all text

### GraphQL Integration

1. Define operations in `.gql` files
2. Generate types with `npm run gql`
3. Use Apollo hooks for data fetching
4. Implement proper loading and error states

### Styling Approach

1. Use Tailwind utility classes primarily
2. Leverage Shadcn components for complex UI
3. Maintain consistent spacing and typography
4. Ensure responsive design across breakpoints

### State Management

1. Use React Context for global state
2. Implement custom hooks for complex logic
3. Maintain immutable state updates
4. Optimize re-renders with proper memoization

Always maintain consistency with existing codebase patterns, follow the established architecture, and ensure all implementations meet the project's quality standards and multilingual requirements.
