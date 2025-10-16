'use client';
import { builder, Builder } from '@builder.io/react';
import Counter from './components/Counter/Counter';

// Guarded init to avoid crashes and re-initialization
const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (builderApiKey) {
  const alreadyInitialized = (builder as unknown as { apiKey?: string }).apiKey;
  if (!alreadyInitialized) {
    builder.init(builderApiKey);
  }
} else if (process.env.NODE_ENV !== 'production') {
  console.warn(
    'Builder.io API key missing. Set NEXT_PUBLIC_BUILDER_API_KEY to enable Builder component registry.',
  );
}

Builder.registerComponent(Counter, {
  name: 'Counter',
  inputs: [
    {
      name: 'initialCount',
      type: 'number',
    },
  ],
});
