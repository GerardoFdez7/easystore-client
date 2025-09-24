'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { FindStatesByCountryIdDocument } from '@graphql/generated';
import { ComboboxOption } from '@shadcn/ui/combobox';

export interface StateOption {
  id: string;
  name: string;
  code: string;
}

interface UseStateComboboxProps {
  countryId?: string;
}

interface UseStateComboboxReturn {
  states: StateOption[];
  options: ComboboxOption[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  enabled: boolean;
}

export function useStateCombobox({
  countryId,
}: UseStateComboboxProps): UseStateComboboxReturn {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const enabled = Boolean(countryId);

  // Query for states based on country
  const { data, loading, error } = useQuery(FindStatesByCountryIdDocument, {
    variables: { countryId: countryId || '' },
    skip: !enabled,
    errorPolicy: 'all',
  });

  const states = useMemo(() => {
    return data?.getStatesByCountryId || [];
  }, [data]);

  // Filter states based on search term
  const filteredStates = useMemo(() => {
    if (!debouncedSearchTerm) {
      return states;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return states.filter(
      (state) =>
        state.name.toLowerCase().includes(searchLower) ||
        state.code.toLowerCase().includes(searchLower),
    );
  }, [states, debouncedSearchTerm]);

  // Convert states to combobox options
  const options: ComboboxOption[] = useMemo(
    () =>
      filteredStates.map((state) => ({
        value: state.id,
        label: `${state.name} (${state.code})`,
      })),
    [filteredStates],
  );

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Reset search term when country changes
  useEffect(() => {
    setSearchTerm('');
  }, [countryId]);

  return {
    states,
    options,
    loading,
    error: error || null,
    searchTerm,
    updateSearchTerm,
    enabled,
  };
}
