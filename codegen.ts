import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  documents: ['lib/graphql/**/*.gql'],
  generates: {
    './lib/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};

export default config;
