export const mockAddresses = [
  {
    id: 'addr-1',
    streetAddress: '123 Storage Street',
    city: 'Warehouse City',
    postalCode: '12345',
    additionalInfo: 'Building A, Floor 2',
    country: {
      id: 'us',
      name: 'United States',
      code: 'US',
    },
    state: {
      id: 'ca',
      name: 'California',
      code: 'CA',
    },
  },
  {
    id: 'addr-2',
    streetAddress: '456 Distribution Ave',
    city: 'Commerce Town',
    postalCode: '67890',
    additionalInfo: null,
    country: {
      id: 'us',
      name: 'United States',
      code: 'US',
    },
    state: {
      id: 'ny',
      name: 'New York',
      code: 'NY',
    },
  },
];

export const mockWarehouse = {
  id: '1',
  name: 'Main Warehouse',
  description: 'Primary storage facility for all products',
  isActive: true,
  addressId: 'addr-1',
  addressLine1: mockAddresses[0].streetAddress,
  city: mockAddresses[0].city,
  postalCode: mockAddresses[0].postalCode,
  countryCode: mockAddresses[0].country.code,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-20T14:45:00Z',
};
