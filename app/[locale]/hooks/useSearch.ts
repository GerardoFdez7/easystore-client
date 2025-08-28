'use client';

import * as React from 'react';

export function useSearch(onSearch: (q: string) => void, delay = 500) {
  const [query, setQuery] = React.useState('');
  const [isDebouncing, setIsDebouncing] = React.useState(false);

  React.useEffect(() => {
    setIsDebouncing(true);
    const id = window.setTimeout(() => {
      onSearch(query.trim());
      setIsDebouncing(false);
    }, delay);

    return () => window.clearTimeout(id);
  }, [query, delay, onSearch]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const reset = React.useCallback(() => setQuery(''), []);

  return { query, onChange, isDebouncing, reset };
}
