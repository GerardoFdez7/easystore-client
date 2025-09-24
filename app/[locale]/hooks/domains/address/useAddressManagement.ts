import { useState, useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import {
  FindAllAddressesDocument,
  CreateAddressDocument,
  FindAllCountriesDocument,
  FindStatesByCountryIdDocument,
  type FindAllAddressesQuery,
  type FindAllAddressesQueryVariables,
  type CreateAddressMutation,
  type CreateAddressMutationVariables,
  type FindAllCountriesQuery,
  type FindStatesByCountryIdQuery,
} from '@graphql/generated';

interface UseAddressManagementReturn {
  // Address data
  addresses: NonNullable<FindAllAddressesQuery['getAllAddresses']>['addresses'];
  addressesLoading: boolean;
  addressesError: Error | null;

  // Geo data
  countries: NonNullable<FindAllCountriesQuery['getAllCountries']>;
  countriesLoading: boolean;
  states: NonNullable<FindStatesByCountryIdQuery['getStatesByCountryId']>;
  statesLoading: boolean;

  // Actions
  refetchAddresses: () => Promise<void>;
  createAddress: (
    input: CreateAddressMutationVariables['input'],
  ) => Promise<CreateAddressMutation['createAddress'] | null>;
  loadStatesByCountry: (countryId: string) => Promise<void>;

  // Loading states
  isCreatingAddress: boolean;
}

export function useAddressManagement(): UseAddressManagementReturn {
  const t = useTranslations('Inventory.WarehouseManagement');

  // State for selected country
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  // Query variables
  const addressVariables: FindAllAddressesQueryVariables = useMemo(
    () => ({
      addressType: undefined,
    }),
    [],
  );

  // Queries
  const {
    data: addressData,
    loading: addressesLoading,
    error: addressesError,
    refetch: apolloRefetchAddresses,
  } = useQuery(FindAllAddressesDocument, {
    variables: addressVariables,
    errorPolicy: 'all',
  });

  const { data: countriesData, loading: countriesLoading } = useQuery(
    FindAllCountriesDocument,
    {
      errorPolicy: 'all',
    },
  );

  const {
    data: statesData,
    loading: statesLoading,
    refetch: refetchStates,
  } = useQuery(FindStatesByCountryIdDocument, {
    variables: { countryId: selectedCountryId },
    skip: !selectedCountryId,
    errorPolicy: 'all',
  });

  // Mutations
  const [createAddressMutation, { loading: isCreatingAddress }] = useMutation(
    CreateAddressDocument,
    {
      refetchQueries: [
        { query: FindAllAddressesDocument, variables: addressVariables },
      ],
      awaitRefetchQueries: true,
    },
  );

  // Derived data
  const addresses = addressData?.getAllAddresses?.addresses || [];
  const countries = countriesData?.getAllCountries || [];
  const states = statesData?.getStatesByCountryId || [];

  // Actions
  const refetchAddresses = useCallback(async () => {
    try {
      await apolloRefetchAddresses();
    } catch (err) {
      console.error('Error refetching addresses:', err);
      toast.error(t('errorLoadingAddresses'));
    }
  }, [apolloRefetchAddresses, t]);

  const createAddress = useCallback(
    async (input: CreateAddressMutationVariables['input']) => {
      try {
        const result = await createAddressMutation({ variables: { input } });
        if (result.data?.createAddress) {
          toast.success(t('addressCreatedSuccessfully'));
          return result.data.createAddress;
        }
        return null;
      } catch (err) {
        console.error('Error creating address:', err);
        return null;
      }
    },
    [createAddressMutation, t],
  );

  const loadStatesByCountry = useCallback(
    async (countryId: string) => {
      try {
        setSelectedCountryId(countryId);
        if (countryId) {
          await refetchStates({ countryId });
        }
      } catch (err) {
        console.error('Error loading states:', err);
      }
    },
    [refetchStates],
  );

  return {
    // Address data
    addresses,
    addressesLoading,
    addressesError: addressesError || null,

    // Geo data
    countries,
    countriesLoading,
    states,
    statesLoading,

    // Actions
    refetchAddresses,
    createAddress,
    loadStatesByCountry,

    // Loading states
    isCreatingAddress,
  };
}
