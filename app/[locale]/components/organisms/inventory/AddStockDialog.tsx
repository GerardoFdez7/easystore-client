'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';
import { Label } from '@shadcn/ui/label';
import { Separator } from '@shadcn/ui/separator';
import { Alert, AlertDescription } from '@shadcn/ui/alert';
import { Badge } from '@shadcn/ui/badge';
import { Package, Warehouse } from 'lucide-react';
import VariantSelector from '@molecules/inventory/VariantSelector';
import WarehouseCombobox from '@molecules/inventory/WarehouseCombobox';

interface AddStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStockAdded?: () => void;
  step?: 'variant' | 'warehouse';
  selectedVariantId?: string;
  selectedProductName?: string;
  selectedVariantAttributes?: Array<{ key: string; value: string }>;
}

const AddStockDialog: FC<AddStockDialogProps> = ({
  open,
  onOpenChange,
  step: initialStep,
  selectedVariantId: initialSelectedVariantId,
  selectedProductName: initialSelectedProductName,
  selectedVariantAttributes: initialSelectedVariantAttributes,
}) => {
  const t = useTranslations('Inventory.AddStock');
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    initialSelectedVariantId || '',
  );
  const [selectedProductName, setSelectedProductName] = useState<string>(
    initialSelectedProductName || '',
  );
  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState<
    Array<{ key: string; value: string }>
  >(initialSelectedVariantAttributes || []);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [step, setStep] = useState<'variant' | 'warehouse'>(
    initialStep || 'variant',
  );

  const handleVariantSelect = (
    variantId: string,
    productName: string,
    attributes: Array<{ key: string; value: string }> = [],
  ) => {
    setSelectedVariantId(variantId);
    setSelectedProductName(productName);
    setSelectedVariantAttributes(attributes);
    setStep('warehouse');
  };

  const handleClose = () => {
    setSelectedVariantId('');
    setSelectedProductName('');
    setSelectedVariantAttributes([]);
    setSelectedWarehouseId('');
    setStep('variant');
    onOpenChange(false);
  };

  const handleBack = () => {
    if (step === 'warehouse') {
      setStep('variant');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 'variant':
        return selectedVariantId !== '';
      case 'warehouse':
        return selectedVariantId !== '' && selectedWarehouseId !== '';
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'variant':
        return t('selectVariant');
      case 'warehouse':
        return t('selectWarehouse');
      default:
        return t('addStock');
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 'variant':
        return <Package className="h-5 w-5" />;
      case 'warehouse':
        return <Warehouse className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'variant':
        return (
          <VariantSelector
            onVariantSelect={handleVariantSelect}
            selectedVariantId={selectedVariantId}
          />
        );

      case 'warehouse':
        return (
          <div className="space-y-4">
            <Alert>
              <Package className="h-6 w-6" />
              <AlertDescription className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-1">
                  {selectedVariantAttributes.length > 0 ? (
                    selectedVariantAttributes.map((attr, index) => (
                      <Badge key={index} variant="outline" className="text-md">
                        {attr.key}: {attr.value}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm font-medium">
                      {t('selectedVariant')}
                    </span>
                  )}
                </div>
                {selectedProductName}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="warehouse-select" className="text-sm font-medium">
                {t('selectWarehouseLabel')}
              </Label>
              <WarehouseCombobox
                value={selectedWarehouseId}
                onChange={setSelectedWarehouseId}
                width="100%"
                placeholder={t('selectWarehousePlaceholder')}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStepIcon()}
            {getStepTitle()}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {t('addStockDialogDescription')}
        </DialogDescription>

        <Separator />

        <div className="flex-1 overflow-y-auto py-4">{renderStepContent()}</div>

        <DialogFooter className="flex flex-row justify-between">
          <div className="flex gap-2">
            {step !== 'variant' && (
              <Button variant="outline" onClick={handleBack}>
                {t('back')}
              </Button>
            )}
            <Button variant="outline" onClick={handleClose}>
              {t('cancel')}
            </Button>
          </div>

          <Button
            onClick={() => {
              if (step === 'variant' && selectedVariantId) {
                setStep('warehouse');
              } else if (
                step === 'warehouse' &&
                selectedVariantId &&
                selectedWarehouseId
              ) {
                router.push(
                  `/inventory/stock-detail?variantId=${selectedVariantId}&warehouseId=${selectedWarehouseId}`,
                );
                onOpenChange(false);
              }
            }}
            disabled={!canProceed()}
            variant={'title'}
          >
            {t('next')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

AddStockDialog.displayName = 'AddStockDialog';

export default AddStockDialog;
