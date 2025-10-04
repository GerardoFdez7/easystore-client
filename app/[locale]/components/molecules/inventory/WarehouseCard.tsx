import { useTranslations } from 'next-intl';
import { Warehouse, MapPin } from 'lucide-react';
import { Card, CardContent } from '@shadcn/ui/card';
import { Label } from '@shadcn/ui/label';

import type { FindWarehousesQuery } from '@graphql/generated';

type WarehouseType = NonNullable<
  FindWarehousesQuery['getAllWarehouses']
>['warehouses'][0];

interface WarehouseCardProps {
  warehouse: WarehouseType;
  onEdit: (warehouse: WarehouseType) => void;
}

export default function WarehouseCard({
  warehouse,
  onEdit,
}: WarehouseCardProps) {
  const t = useTranslations('Inventory.WarehouseManagement');

  const handleEdit = () => {
    onEdit(warehouse);
  };

  const formatAddress = (warehouse: WarehouseType) => {
    const parts = [
      warehouse.addressLine1,
      warehouse.city,
      warehouse.countryCode,
      warehouse.postalCode,
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : t('noAddressAvailable');
  };

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md"
      onClick={handleEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleEdit();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={t('editWarehouse', { name: warehouse.name })}
    >
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start space-x-4">
            {/* Warehouse Information */}
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center space-x-2">
                <Warehouse className="h-6 w-6" aria-hidden="true" />
                <h3 className="text-title truncate text-lg font-semibold">
                  {warehouse.name}
                </h3>
              </div>

              <div className="text-text flex items-start space-x-1 text-sm">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <Label className="line-clamp-2" aria-label="Warehouse address">
                  {formatAddress(warehouse)}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
