import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CreateAddressMutationVariables,
  AddressTypeEnum,
} from '@graphql/generated';
import { useAddressForm } from '@hooks/domains/address/useAddressForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shadcn/ui/form';
import { Input } from '@shadcn/ui/input';
import { Textarea } from '@shadcn/ui/textarea';
import CountryCombobox from '../shared/CountryCombobox';
import StateCombobox from '../shared/StateCombobox';
import FormActions from '@molecules/shared/FormActions';

interface AddressFormProps {
  onSubmit: (address: CreateAddressMutationVariables['input']) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function AddressForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: AddressFormProps) {
  const t = useTranslations('Inventory.WarehouseManagement');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  const { form, handleSubmit: handleFormSubmit } = useAddressForm({
    onSuccess: async (data) => {
      const addressInput: CreateAddressMutationVariables['input'] = {
        name: data.name,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || undefined,
        city: data.city,
        postalCode: data.postalCode,
        countryId: data.countryId,
        stateId: data.stateId,
        deliveryNum: data.deliveryNum,
        deliveryInstructions: data.deliveryInstructions || undefined,
        addressType: AddressTypeEnum.Warehouse, // Fixed to warehouse type
      };
      await onSubmit(addressInput);
    },
    onCancel,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit(handleFormSubmit)(e);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('addressNamePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Line 1 */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('streetAddress')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('streetAddressPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Line 2 */}
          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('addressLine2')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('addressLine2Placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Number */}
          <FormField
            control={form.control}
            name="deliveryNum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('deliveryNumber')}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t('deliveryNumberPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('city')}</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('postalCode')}</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('country')}</FormLabel>
                <FormControl>
                  <CountryCombobox
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCountryId(value);
                    }}
                    placeholder={t('selectCountry')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control}
            name="stateId"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start md:col-span-2 md:items-center">
                <FormLabel>{t('state')}</FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <StateCombobox
                      countryId={selectedCountryId}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('selectState')}
                      className="w-full max-w-md"
                      key={selectedCountryId} // Force re-render when country changes
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Delivery Instructions */}
        <FormField
          control={form.control}
          name="deliveryInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('deliveryInstructions')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('deliveryInstructionsPlaceholder')}
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormActions
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          className="flex justify-end space-x-2"
        />
      </form>
    </Form>
  );
}
