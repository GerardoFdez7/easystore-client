'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { FindAllCountriesDocument } from '@graphql/generated';
import { ComboboxOption } from '@shadcn/ui/combobox';

export interface CountryOption {
  id: string;
  name: string;
  code: string;
}

interface UseCountryComboboxReturn {
  countries: CountryOption[];
  options: ComboboxOption[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
}

export function useCountryCombobox(): UseCountryComboboxReturn {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Query for countries
  const { data, loading, error } = useQuery(FindAllCountriesDocument, {
    errorPolicy: 'all',
  });

  const countries = useMemo(() => {
    return data?.getAllCountries || [];
  }, [data]);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!debouncedSearchTerm) {
      return countries;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower),
    );
  }, [countries, debouncedSearchTerm]);

  // Convert countries to combobox options
  const options: ComboboxOption[] = useMemo(
    () =>
      filteredCountries.map((country) => ({
        value: country.id,
        label: `${country.name} (${country.code})`,
      })),
    [filteredCountries],
  );

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    countries,
    options,
    loading,
    error: error || null,
    searchTerm,
    updateSearchTerm,
  };
}
