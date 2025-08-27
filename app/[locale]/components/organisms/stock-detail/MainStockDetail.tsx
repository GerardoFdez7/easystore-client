'use client';

import React, { useState } from 'react';
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@shadcn/ui/dialog';
import { Textarea } from '@shadcn/ui/textarea';

export default function MainStockDetail() {
  const t = useTranslations('StockDetail');
  const [showUpdateReasonDialog, setShowUpdateReasonDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateReason, setUpdateReason] = useState('');
  // Usamos el prefijo _ para indicar que estas variables podrían usarse en el futuro
  const [_availableQty, _setAvailableQty] = useState(6);

  const handleUpdateAvailable = () => {
    if (updateReason.trim() === '') return;
    // Aquí iría la lógica para actualizar la cantidad disponible
    setShowUpdateReasonDialog(false);
    setUpdateReason('');
  };

  const handleDeleteStock = () => {
    // Aquí iría la lógica para eliminar el stock
    setShowDeleteDialog(false);
  };

  return (
    <div className="flex-1 pt-2">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6">
          <section>
            <div className="flex flex-col space-y-5">
              {/* Color y Producto */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="color">{t('color')}</Label>
                  <div className="mt-2 rounded-md border bg-gray-50 p-2">
                    <span className="text-gray-800">red</span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="product">{t('product')}</Label>
                  <div className="mt-2 rounded-md border bg-gray-50 p-2">
                    <span className="text-gray-800">Nike t-shirts</span>
                  </div>
                </div>
              </div>

              {/* Almacén */}
              <div>
                <Label htmlFor="warehouse">{t('warehouse')}</Label>
                <div className="mt-2 rounded-md border bg-gray-50 p-2">
                  <span className="text-gray-800">Jose Warehouse</span>
                </div>
              </div>

              {/* Disponibilidad y Reservados */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="available">{t('available')}</Label>
                  <div className="mt-2 flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                      G
                    </div>
                    <Input
                      id="available"
                      type="number"
                      defaultValue="6"
                      className="ml-2"
                      onClick={() => setShowUpdateReasonDialog(true)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="reserved">{t('reserved')}</Label>
                  <Input id="reserved" type="number" className="mt-2" />
                </div>
              </div>

              {/* Ubicación del Producto */}
              <div>
                <Label htmlFor="location">{t('productLocation')}</Label>
                <Input id="location" className="mt-2" />
              </div>

              {/* Fecha de Reabastecimiento y Número de Lote */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="replenishment-date">
                    {t('replenishmentDate')}
                  </Label>
                  <Input id="replenishment-date" type="date" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="lot-number">{t('lotNumber')}</Label>
                  <Input id="lot-number" className="mt-2" />
                </div>
              </div>

              {/* Números de Serie */}
              <div>
                <Label>{t('serialNumbers')}</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-9FAK-23J7-LBO2
                  </div>
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-4M2B-7K91-H8D4
                  </div>
                  <div className="rounded bg-gray-200 px-3 py-1">
                    SN-8W7Z-5G4N-217Y
                  </div>
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

      {/* Diálogo para la razón de actualización */}
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

      {/* Diálogo para confirmar eliminación */}
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
