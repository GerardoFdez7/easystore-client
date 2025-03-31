# EasyStore Frontend Repository
Welcome to the frontend repository of EasyStore, the web application that empowers you to build your own e-commerce platform without any programming knowledge. This user-friendly solution provides all the tools you need to create, manage, and grow your online store with ease.

## Table of Contents
- Getting Started
  - Development Environment
  - Production Environment
  - Component Documentation
- Repository Rules
  - ESLint Rules
  - Commit Rules
  - Branch Rules
- Architecture
- Features
  - Theming
  - Internationalization
  
## Getting Started
Follow these instructions to set up and run the EasyStore frontend application:

### Development Environment
1. Navigate to the application directory:
   
   ```bash
   cd easystore-app
    ```
2. Install dependencies:
   
   ```bash
   npm run install
    ```
3. Set up Git hooks:
   
   ```bash
   npm run setup-hooks
    ```
4. Start the development server:
   
   ```bash
   npm run dev
    ```
   
   [!TIP] Alternatively, you can use Docker for development:
   
   ```bash
   docker-compose -f docker-compose.dev.yml up
    ```
### Production Environment
To run the application in production mode:

```bash
npm run build
npm run start
 ```

[!TIP] Alternatively, you can use Docker for:

```bash
docker-compose up
 ```

### Component Documentation
To explore our component library and documentation:

```bash
npm run storybook
 ```

[!NOTE] Storybook provides an isolated environment to develop and test UI components.

## Repository Rules
### ESLint Rules
Our codebase follows strict linting rules to ensure code quality and consistency:

- Base Rules :
  
  - No console logs in production code
  - Curly braces required for all control statements
  - Strict equality checks ( === and !== )
- TypeScript Rules :
  
  - No explicit any types
  - No non-null assertions
  - Proper promise handling
  - Unused variables must be prefixed with underscore
- Naming Conventions :
  
  - Variables: camelCase or PascalCase
  - Types/Interfaces: PascalCase
  - Functions: camelCase or PascalCase
- Code Organization :
  
  - Proper spacing between declarations, functions, and classes
  - Organized imports and exports
[!IMPORTANT] All code must pass ESLint checks before being committed.

### Commit Rules
We follow the Conventional Commits specification for commit messages:

```plaintext
<type>: <description>
 ```

Supported types :

- feat : New features
- fix : Bug fixes
- docs : Documentation changes
- style : Code style changes (formatting, etc.)
- refactor : Code changes that neither fix bugs nor add features
- test : Adding or modifying tests
- chore : Changes to the build process or auxiliary tools
- revert : Reverting previous changes
- perf : Performance improvements
- build : Changes affecting build system
- ci : Changes to CI configuration
- wip : Work in progress
[!WARNING] Commit descriptions must be in lowercase. For example, use "feat: add login feature" instead of "feat: Add Login Feature".

### Branch Rules
Branches must follow this naming convention:

```plaintext
<type>/<kebab-case-description>
 ```

Supported types :

- feat : Feature branches
- fix : Bug fix branches
- docs : Documentation branches
- style : Style change branches
- refactor : Refactoring branches
- test : Test-related branches
- chore : Maintenance branches
- revert : Revert branches
- perf : Performance improvement branches
- build : Build-related branches
- ci : CI configuration branches
[!CAUTION] Branches that don't follow this convention will be rejected during push.

[!TIP] To rename a branch, use: git branch -m <type/new-name>

## Architecture
EasyStore frontend is built using the following architecture and technologies:

- Design Pattern: Atomic Design methodology
- Programming Language: TypeScript
- Framework: Next.js
- UI Library: React
- CSS Framework: Tailwind CSS
- Documentation & Testing: Storybook
[!NOTE] The Atomic Design pattern organizes components into atoms, molecules, organisms, templates, and pages, creating a scalable and maintainable component hierarchy.

## Features

### Theming
EasyStore uses next-themes for theme management, allowing for:

- Light and dark mode support
- Custom theme creation
- System preference detection
- Persistent theme selection

[!TIP] Developers can easily extend the theming system to add new themes or customize existing ones.

### Internationalization
We use next-intl for multilingual support, providing:

- Multiple language support
- Locale-specific formatting
- RTL language compatibility
- Dynamic content translation

[!IMPORTANT] All user-facing text should use the internationalization system to ensure proper translation across supported languages.
