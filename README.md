<p align="center">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg" alt="nextjs" width="40" height="40"/>
  </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a>  
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://cdn.creazilla.com/icons/3254431/tailwindcss-icon-icon-lg.png" alt="tailwind" width="52" height="35"/>
  </a>
  <a href="https://storybook.js.org/" target="_blank" rel="noreferrer">
    <img src="https://cms.digitalpolygon.com/sites/default/files/2022-07/storybook-logo.png" alt="storybook" width="40" height="40"/>  
  <a href="https://graphql.org/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="40" height="40"/>
  </a>  
    <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
    <img src="https://upload.vectorlogo.zone/logos/nodejs/images/eca9ff97-5734-46c4-b8a1-621819eaeaa9.svg" alt="nodejs" width="50" height="50"/>
  </a>
  <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="npm" width="60" height="40"/>
  </a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="docker" width="50" height="50"/>
  </a>
</p>

# EasyStore Frontend Repository

## Table of Contents

- [Getting Started](#getting-started)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
  - [Component Documentation](#component-documentation)
- [Architecture and Patterns](#architecture-and-patterns)

## Getting Started

Follow these instructions to set up and run the EasyStore frontend application:

### Development Environment

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

3. Generate typescript types from GraphQL schema and operations:

   ```bash
   npm run gql
   ```

   > [!IMPORTANT]
   > Run this command after adding new queries or when the backend schema changes.

4. Start the development server:

   ```bash
   npm run dev
   ```

> [!TIP]
> Alternatively, you can use Docker for development:

```bash
npm run docker:dev
```

### Production Environment

To run the application in production mode:

```bash
npm run build
npm run start
```

> [!TIP]
> Alternatively, you can use Docker for production:

```bash
npm run docker
```

### Component Documentation

To explore our component library and documentation:

```bash
npm run storybook
```

> [!NOTE]
> Storybook provides an isolated environment to develop and test UI components.

## Architecture and Patterns

- **Next.js File-System Based Architecture**

  - Next.js encourages a file-system based routing and API routing architecture, where the structure of files and folders directly dictates the application's routes.
  - Key aspects include Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR) for optimized rendering.

- **Atomic Design Pattern**
  - Organizes UI components into Atoms, Molecules, Organisms, Templates, and Pages.
  - Promotes reusability, consistency, and a clear hierarchy for UI development.

## Contributing

We welcome contributions to the EasyStore project! Please make sure to review our [Contributing Guidelines](./CONTRIBUTING.md) before you start.
