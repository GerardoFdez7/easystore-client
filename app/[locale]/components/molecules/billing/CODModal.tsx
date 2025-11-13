'use client';

import { useState } from 'react';
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
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';
import { Textarea } from '@shadcn/ui/textarea';
import { Switch } from '@shadcn/ui/switch';
import { Truck, Info } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function CODModal({ open, onOpenChange, onSaved }: Props) {
  const t = useTranslations('Billing.COD');
  const [allowPartialPayment, setAllowPartialPayment] = useState(false);
  const [requirePhoneVerification, setRequirePhoneVerification] =
    useState(true);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save COD configuration');
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Extra Fee/Service Charge */}
          <div className="space-y-2">
            <Label htmlFor="extraFee">{t('extraFee')}</Label>
            <div className="flex gap-2">
              <Input
                id="extraFee"
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
              />
              <Button variant="outline" className="w-20">
                USD
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">{t('extraFeeHint')}</p>
          </div>

          {/* Maximum Order Amount */}
          <div className="space-y-2">
            <Label htmlFor="maxAmount">{t('maxAmount')}</Label>
            <div className="flex gap-2">
              <Input
                id="maxAmount"
                placeholder="1000.00"
                type="number"
                min="0"
                step="0.01"
              />
              <Button variant="outline" className="w-20">
                USD
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              {t('maxAmountHint')}
            </p>
          </div>

          {/* Delivery Instructions */}
          <div className="space-y-2">
            <Label htmlFor="deliveryInstructions">
              {t('deliveryInstructions')}
            </Label>
            <Textarea
              id="deliveryInstructions"
              placeholder={t('deliveryInstructionsPlaceholder')}
              rows={3}
              maxLength={500}
            />
            <p className="text-muted-foreground text-xs">
              {t('deliveryInstructionsHint')}
            </p>
          </div>

          {/* Allow Partial Payment */}
          <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="partialPayment">{t('partialPayment')}</Label>
                <p className="text-muted-foreground text-xs">
                  {t('partialPaymentDescription')}
                </p>
              </div>
              <Switch
                id="partialPayment"
                checked={allowPartialPayment}
                onCheckedChange={setAllowPartialPayment}
              />
            </div>
          </div>

          {/* Require Phone Verification */}
          <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="phoneVerification">
                  {t('phoneVerification')}
                </Label>
                <p className="text-muted-foreground text-xs">
                  {t('phoneVerificationDescription')}
                </p>
              </div>
              <Switch
                id="phoneVerification"
                checked={requirePhoneVerification}
                onCheckedChange={setRequirePhoneVerification}
              />
            </div>
          </div>

          {/* Best Practices Info */}
          <div className="bg-secondary/10 border-secondary/30 flex gap-3 rounded-lg border p-4">
            <Info className="text-secondary h-5 w-5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('bestPracticesTitle')}</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• {t('bestPractice1')}</li>
                <li>• {t('bestPractice2')}</li>
                <li>• {t('bestPractice3')}</li>
                <li>• {t('bestPractice4')}</li>
              </ul>
            </div>
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
