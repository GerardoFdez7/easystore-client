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
import { Building2, Info } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function BankTransferModal({
  open,
  onOpenChange,
  onSaved,
}: Props) {
  const t = useTranslations('Billing.BankTransfer');
  const [requireProof, setRequireProof] = useState(true);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save bank transfer configuration');
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bank Name */}
          <div className="space-y-2">
            <Label htmlFor="bankName">{t('bankName')}</Label>
            <Input
              id="bankName"
              placeholder={t('bankNamePlaceholder')}
              type="text"
            />
          </div>

          {/* Account Holder */}
          <div className="space-y-2">
            <Label htmlFor="accountHolder">{t('accountHolder')}</Label>
            <Input
              id="accountHolder"
              placeholder={t('accountHolderPlaceholder')}
              type="text"
            />
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <Label htmlFor="accountNumber">{t('accountNumber')}</Label>
            <Input
              id="accountNumber"
              placeholder={t('accountNumberPlaceholder')}
              type="text"
            />
          </div>

          {/* SWIFT/BIC (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="swift">{t('swift')}</Label>
            <Input id="swift" placeholder={t('swiftPlaceholder')} type="text" />
            <p className="text-muted-foreground text-xs">{t('swiftHint')}</p>
          </div>

          {/* Transfer Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">{t('instructions')}</Label>
            <Textarea
              id="instructions"
              placeholder={t('instructionsPlaceholder')}
              rows={4}
              maxLength={500}
            />
            <p className="text-muted-foreground text-xs">
              {t('instructionsHint')}
            </p>
          </div>

          {/* Require Proof of Payment */}
          <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="requireProof">{t('requireProof')}</Label>
                <p className="text-muted-foreground text-xs">
                  {t('requireProofDescription')}
                </p>
              </div>
              <Switch
                id="requireProof"
                checked={requireProof}
                onCheckedChange={setRequireProof}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-secondary/10 border-secondary/30 flex gap-3 rounded-lg border p-4">
            <Info className="text-secondary h-5 w-5 shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('infoTitle')}</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• {t('info1')}</li>
                <li>• {t('info2')}</li>
                <li>• {t('info3')}</li>
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
