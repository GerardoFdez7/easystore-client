'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';
import { Label } from '@shadcn/ui/label';
import { Textarea } from '@shadcn/ui/textarea';

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  value: string;
  onChange: (v: string) => void;
  onConfirm: () => void;
  /** Longitud mínima permitida para la razón */
  minLength?: number;
};

export default function UpdateReasonDialog({
  open,
  onOpenChange,
  value,
  onChange,
  onConfirm,
  minLength = 10,
}: Props) {
  const t = useTranslations('StockDetail');

  const trimmed = (value ?? '').trim();
  const isValid = trimmed.length >= (minLength ?? 10);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('updateReasonTitle')}</DialogTitle>
          <DialogDescription>{t('updateReasonDescription')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">{t('updateReasonLabel')}</Label>
            <Textarea
              id="reason"
              maxLength={2000}
              placeholder={t('updateReasonPlaceholder')}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            {/* Validación mínima: mostramos mensaje si es demasiado corta */}
            {!isValid && (
              <p className="text-destructive mt-2 text-sm">
                {t('updateReasonTooShort') ||
                  `Short description must be at least ${minLength} characters`}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button
            className="text-accent bg-title hover:bg-accent-foreground"
            onClick={onConfirm}
            disabled={!isValid}
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
