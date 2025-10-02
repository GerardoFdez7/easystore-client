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
};

export default function UpdateReasonDialog({
  open,
  onOpenChange,
  value,
  onChange,
  onConfirm,
}: Props) {
  const t = useTranslations('StockDetail');

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
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={onConfirm}>{t('confirm')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
