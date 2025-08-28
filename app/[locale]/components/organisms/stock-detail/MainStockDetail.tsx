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
import { Calendar } from '@shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/ui/popover';
import { cn } from 'utils';
import { format } from 'date-fns';

export default function MainStockDetail() {
  const t = useTranslations('StockDetail');
  const [showUpdateReasonDialog, setShowUpdateReasonDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateReason, setUpdateReason] = useState('');
  // We use the _ prefix to indicate that these variables might be used in the future
  const [_availableQty, _setAvailableQty] = useState(6);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleUpdateAvailable = () => {
    if (updateReason.trim() === '') return;
    // Here would be the logic to update the available quantity
    setShowUpdateReasonDialog(false);
    setUpdateReason('');
  };

  const handleDeleteStock = () => {
    // Here would be the logic to delete the stock
    setShowDeleteDialog(false);
  };

  return (
    <div className="flex-1 pt-0">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-6">
          <section>
            <div className="flex flex-col space-y-5">
              {/* Color and Warehouse - Two columns */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold">
                    {t('color')}: <span className="text-gray-800">red</span>
                  </h2>
                  {/* Product - Reduced space */}
                  <h3 className="mt-1 text-lg">
                    {t('product')}{' '}
                    <span className="text-gray-800">Nike t-shirts</span>
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg">
                    {t('warehouse')}{' '}
                    <span className="border-primary border-b-2 px-1 font-bold text-gray-800">
                      Jose Warehouse
                    </span>
                  </h3>
                </div>
              </div>

              {/* Availability and Reserved */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="available">{t('available')}</Label>
                  <div className="mt-2 flex items-center">
                    <Input
                      id="available"
                      type="number"
                      defaultValue="6"
                      className="w-full"
                      placeholder={t('availablePlaceholder')}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        _setAvailableQty(parseInt(e.target.value))
                      }
                      onBlur={() => setShowUpdateReasonDialog(true)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="reserved">{t('reserved')}</Label>
                  <Input
                    id="reserved"
                    type="number"
                    className="mt-2"
                    placeholder={t('reservedPlaceholder')}
                  />
                </div>
              </div>

              {/* Product Location */}
              <div>
                <Label htmlFor="location">{t('productLocation')}</Label>
                <Input
                  id="location"
                  className="mt-2"
                  placeholder={t('productLocationPlaceholder')}
                />
              </div>

              {/* Replenishment Date and Lot Number */}
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
                          !date && 'text-muted-foreground',
                        )}
                      >
                        {date
                          ? format(date, 'PPP')
                          : t('replenishmentDatePlaceholder')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md border"
                        classNames={{
                          months:
                            'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                          month: 'space-y-4',
                          caption:
                            'flex justify-center pt-1 relative items-center',
                          caption_label: 'text-sm font-medium',
                          nav: 'space-x-1 flex items-center',
                          nav_button:
                            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                          nav_button_previous: 'absolute left-1',
                          nav_button_next: 'absolute right-1',
                          table: 'w-full border-collapse space-y-1',
                          head_row: 'flex',
                          head_cell:
                            'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] text-center',
                          row: 'flex w-full mt-2',
                          cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
                          day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                          day_range_end: 'day-range-end',
                          day_selected:
                            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                          day_today: 'bg-accent text-accent-foreground',
                          day_outside:
                            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                          day_disabled: 'text-muted-foreground opacity-50',
                          day_range_middle:
                            'aria-selected:bg-accent aria-selected:text-accent-foreground',
                          day_hidden: 'invisible',
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="lot-number">{t('lotNumber')}</Label>
                  <Input
                    id="lot-number"
                    className="mt-2"
                    placeholder={t('lotNumberPlaceholder')}
                  />
                </div>
              </div>

              {/* Serial Numbers */}
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

              {/* Buttons */}
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

      {/* Update reason dialog */}
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUpdateReason(e.target.value)
                }
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

      {/* Delete confirmation dialog */}
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
