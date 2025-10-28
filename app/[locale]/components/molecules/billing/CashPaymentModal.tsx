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
import { Banknote, Info } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function CashPaymentModal({
  open,
  onOpenChange,
  onSaved,
}: Props) {
  const t = useTranslations('Billing.CashPayment');

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save cash payment configuration');
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Info Section */}
          <div className="bg-secondary/10 border-secondary/30 flex gap-3 rounded-lg border p-4">
            <Info className="text-secondary h-5 w-5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('infoTitle')}</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• {t('info1')}</li>
                <li>• {t('info2')}</li>
                <li>• {t('info3')}</li>
              </ul>
            </div>
          </div>

          {/* Best Practices */}
          <div className="space-y-2">
            <p className="text-sm font-medium">{t('bestPracticesTitle')}</p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• {t('bestPractice1')}</li>
              <li>• {t('bestPractice2')}</li>
              <li>• {t('bestPractice3')}</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button variant="title" onClick={handleSave}>
            {t('saveConfiguration')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
