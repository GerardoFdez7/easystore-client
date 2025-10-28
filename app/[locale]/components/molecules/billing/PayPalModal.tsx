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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Wallet, Lock } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function PayPalModal({ open, onOpenChange, onSaved }: Props) {
  const t = useTranslations('Billing.PayPal');
  const [mode, setMode] = useState<'sandbox' | 'live'>('sandbox');

  const handleSave = () => {
    // TODO: Implement save logic with GraphQL mutation
    console.log('Save PayPal configuration');
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mode Selection */}
          <div className="space-y-2">
            <Label htmlFor="mode">{t('mode')}</Label>
            <Select
              value={mode}
              onValueChange={(value: 'sandbox' | 'live') => setMode(value)}
            >
              <SelectTrigger id="mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sandbox">{t('sandbox')}</SelectItem>
                <SelectItem value="live">{t('live')}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">{t('modeHint')}</p>
          </div>

          {/* Client ID */}
          <div className="space-y-2">
            <Label htmlFor="clientId">
              {t('clientId')} <span className="text-error">*</span>
            </Label>
            <Input
              id="clientId"
              placeholder={t('clientIdPlaceholder')}
              type="text"
            />
            <p className="text-muted-foreground text-xs">{t('clientIdHint')}</p>
          </div>

          {/* Client Secret */}
          <div className="space-y-2">
            <Label htmlFor="clientSecret">
              {t('clientSecret')} <span className="text-error">*</span>
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="clientSecret"
                placeholder={t('clientSecretPlaceholder')}
                type="password"
                className="pl-10"
              />
            </div>
            <p className="text-muted-foreground text-xs">
              {t('clientSecretHint')}
            </p>
          </div>

          {/* Features Info */}
          <div className="bg-muted/40 space-y-2 rounded-lg border p-4">
            <p className="text-sm font-medium">{t('featuresTitle')}</p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• {t('feature1')}</li>
              <li>• {t('feature2')}</li>
              <li>• {t('feature3')}</li>
              <li>• {t('feature4')}</li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="bg-warning/10 border-warning/30 flex gap-3 rounded-lg border p-4">
            <Lock className="text-warning h-5 w-5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t('securityNotice')}</p>
              <p className="text-muted-foreground text-xs">
                {t('securityNoticeDescription')}
              </p>
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
