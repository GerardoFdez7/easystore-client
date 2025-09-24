import { useTranslations } from 'next-intl';
import { Combobox } from '@shadcn/ui/combobox';
import { useAddressCombobox } from '@hooks/domains/address/useAddressCombobox';

interface AddressComboboxProps {
  value?: string;
  onChange?: (addressId: string) => void;
  disabled?: boolean;
  width?: string | number;
  placeholder?: string;
  className?: string;
}

export const AddressCombobox: React.FC<AddressComboboxProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder,
  className,
}) => {
  const t = useTranslations('Inventory.WarehouseManagement');
  const {
    addressOptions,
    loading,
    setSearchTerm,
    hasMore,
    loadMore,
    isLoadingMore,
  } = useAddressCombobox();

  // Transform options to include icon
  const comboboxOptions = addressOptions.map((option) => ({
    value: option.value,
    label: option.label,
    disabled: false,
  }));

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      void loadMore();
    }
  };

  return (
    <Combobox
      options={comboboxOptions}
      value={value}
      onValueChange={onChange}
      disabled={disabled || loading}
      placeholder={placeholder || t('selectAddress')}
      searchPlaceholder={t('searchAddresses')}
      emptyMessage={loading ? t('loading') : t('noAddressesFound')}
      className={className}
      serverSide={true}
      onSearchChange={setSearchTerm}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
      onLoadMore={handleLoadMore}
    />
  );
};

AddressCombobox.displayName = 'AddressCombobox';

export default AddressCombobox;
