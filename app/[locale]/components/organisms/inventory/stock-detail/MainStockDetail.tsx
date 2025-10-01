'use client';

import { useState, useEffect } from 'react';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Textarea } from '@shadcn/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/ui/popover';
import { Calendar } from '@shadcn/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@shadcn/ui/dialog';
import { cn } from '@lib/utils';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

type MainStockDetailProps = {
  warehouseName: string | undefined;
  sku: string | undefined;
};

export default function MainStockDetail({
  warehouseName,
  sku,
}: MainStockDetailProps) {
  const t = useTranslations('StockDetail');

  const [showUpdateReasonDialog, setShowUpdateReasonDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateReason, setUpdateReason] = useState('');

  // Campos principales (ahora los inicializamos / obtenemos por fetch con warehouseName+sku)
  const [productName, setProductName] = useState('');
  const [_variantKey, setVariantKey] = useState('');
  const [variantValue, setVariantValue] = useState('');
  const [_variantSku, _setVariantSku] = useState(sku ?? '');
  const [qtyAvailable, setQtyAvailable] = useState(0);
  const [qtyReserved, setQtyReserved] = useState(0);
  const [productLocation, setProductLocation] = useState('');
  const [_estimatedReplenishmentDate, _setEstimatedReplenishmentDate] =
    useState<Date | undefined>();
  const [_serialNumbers, _setSerialNumbers] = useState<string[]>([]);
  const [_lotNumber, _setLotNumber] = useState('');
  const [_availableQty, _setAvailableQty] = useState(0);

  // ⬇️ Aquí harías tu fetch real con warehouseName + sku
  useEffect(() => {
    if (!warehouseName || !sku) return;

    // TODO: reemplaza por tu data layer real:
    // fetch(`/api/inventory/stock-detail?warehouse=${warehouseName}&sku=${sku}`)
    //   .then(r => r.json())
    //   .then(data => { ...setters });

    // Mock de ejemplo para que la UI funcione:
    setProductName('Producto de ejemplo');
    setVariantKey('color');
    setVariantValue('Azul');
    _setVariantSku(sku);
    setQtyAvailable(6);
    setQtyReserved(2);
    setProductLocation('A-12-3');
    _setSerialNumbers(['SN-001', 'SN-002']);
    _setLotNumber('LOT-ABC-99');
    _setEstimatedReplenishmentDate(new Date());
  }, [warehouseName, sku]);

  const handleUpdateAvailable = () => {
    if (updateReason.trim() === '') return;
    // TODO: actualizar qtyAvailable con razón
    setShowUpdateReasonDialog(false);
    setUpdateReason('');
  };

  const handleDeleteStock = () => {
    // TODO: eliminar stock
    setShowDeleteDialog(false);
  };

  return (
    <div className="flex-1 pt-0">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-6">
          <section>
            <div className="flex flex-col space-y-5">
              {/* Color y Warehouse */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold">
                    {t('color')}:{' '}
                    <span className="text-gray-800">{variantValue}</span>
                  </h2>
                  <h3 className="mt-1 text-lg">
                    {t('product')}{' '}
                    <span className="text-gray-800">{productName}</span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg">
                    {t('warehouse')}{' '}
                    <span className="border-primary border-b-2 px-1 font-bold text-gray-800">
                      {warehouseName ?? '—'}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Available / Reserved */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="available">{t('available')}</Label>
                  <div className="mt-2 flex items-center">
                    <Input
                      id="available"
                      type="number"
                      value={qtyAvailable}
                      className="w-full"
                      placeholder={t('availablePlaceholder')}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setQtyAvailable(value);
                        _setAvailableQty(value);
                      }}
                      onBlur={() => setShowUpdateReasonDialog(true)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="reserved">{t('reserved')}</Label>
                  <Input
                    id="reserved"
                    type="number"
                    value={qtyReserved}
                    className="w-full"
                    placeholder={t('reservedPlaceholder')}
                    onChange={(e) =>
                      setQtyReserved(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <Label htmlFor="location">{t('productLocation')}</Label>
                <Input
                  id="location"
                  className="mt-2"
                  value={productLocation}
                  placeholder={t('productLocationPlaceholder')}
                  onChange={(e) => setProductLocation(e.target.value)}
                />
              </div>

              {/* Fecha reposición / Lote */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="replenishment-date">
                    {t('replenishmentDate')}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'mt-2 w-full justify-start text-left font-normal',
                          !_estimatedReplenishmentDate &&
                            'text-muted-foreground',
                        )}
                      >
                        {_estimatedReplenishmentDate
                          ? format(_estimatedReplenishmentDate, 'PPP')
                          : t('replenishmentDatePlaceholder')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <Calendar
                        mode="single"
                        selected={_estimatedReplenishmentDate}
                        onSelect={_setEstimatedReplenishmentDate}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="lot-number">{t('lotNumber')}</Label>
                  <Input
                    id="lot-number"
                    className="mt-2"
                    value={_lotNumber}
                    placeholder={t('lotNumberPlaceholder')}
                    onChange={(e) => _setLotNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Seriales */}
              <div>
                <Label>{t('serialNumbers')}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {_serialNumbers.map(
                    (serialNumber, index) =>
                      serialNumber && (
                        <div
                          key={index}
                          className="rounded bg-gray-200 px-3 py-1"
                        >
                          {serialNumber}
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="destructive"
                  className="mr-auto"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  {t('deleteStock')}
                </Button>
                <Button variant="outline">{t('cancel')}</Button>
                <Button>{t('saveChanges')}</Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Dialog razón de cambio */}
      <Dialog
        open={showUpdateReasonDialog}
        onOpenChange={setShowUpdateReasonDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('updateReasonTitle')}</DialogTitle>
            <DialogDescription>
              {t('updateReasonDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">{t('updateReasonLabel')}</Label>
              <Textarea
                maxLength={2000}
                id="reason"
                placeholder={t('updateReasonPlaceholder')}
                value={updateReason}
                onChange={(e) => setUpdateReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowUpdateReasonDialog(false)}
            >
              {t('cancel')}
            </Button>
            <Button onClick={handleUpdateAvailable}>{t('confirm')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog eliminar */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('deleteStockTitle') || 'Delete Stock'}</DialogTitle>
            <DialogDescription>
              {t('deleteStockDescription') ||
                'Are you sure you want to delete this stock? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              {t('cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDeleteStock}>
              {t('confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
