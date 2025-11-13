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
import { Switch } from '@shadcn/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { CreditCard, Lock } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function CardPaymentModal({
  open,
  onOpenChange,
  onSaved,
}: Props) {
  const t = useTranslations('Billing.CardPayment');
  const [provider, setProvider] = useState<'cybersource' | 'pagadito'>(
    'cybersource',
  );
  const [capture, setCapture] = useState(true);

  const handleSave = () => {
    // TODO: Implement save logic with GraphQL mutation
    console.log('Save card payment configuration', { provider });
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">{t('provider')}</Label>
            <Select
              value={provider}
              onValueChange={(value: 'cybersource' | 'pagadito') =>
                setProvider(value)
              }
            >
              <SelectTrigger id="provider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cybersource">
                  CyberSource / VisaNet
                </SelectItem>
                <SelectItem value="pagadito">Pagadito</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">{t('providerHint')}</p>
          </div>

          {/* CyberSource/VisaNet Fields */}
          {provider === 'cybersource' && (
            <>
              {/* Merchant ID */}
              <div className="space-y-2">
                <Label htmlFor="merchantId">
                  {t('merchantId')} <span className="text-error">*</span>
                </Label>
                <Input
                  id="merchantId"
                  placeholder={t('merchantIdPlaceholder')}
                  type="text"
                />
              </div>

              {/* API Key */}
              <div className="space-y-2">
                <Label htmlFor="apiKey">
                  {t('apiKey')} <span className="text-error">*</span>
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="apiKey"
                    placeholder={t('apiKeyPlaceholder')}
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Secret Key */}
              <div className="space-y-2">
                <Label htmlFor="secretKey">
                  {t('secretKey')} <span className="text-error">*</span>
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="secretKey"
                    placeholder={t('secretKeyPlaceholder')}
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Capture Mode */}
              <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="capture">{t('captureMode')}</Label>
                    <p className="text-muted-foreground text-xs">
                      {t('captureModeDescription')}
                    </p>
                  </div>
                  <Switch
                    id="capture"
                    checked={capture}
                    onCheckedChange={setCapture}
                  />
                </div>
                <p className="text-xs">
                  {capture ? t('captureModeEnabled') : t('captureModeDisabled')}
                </p>
              </div>
            </>
          )}

          {/* Pagadito Fields */}
          {provider === 'pagadito' && (
            <>
              {/* UID */}
              <div className="space-y-2">
                <Label htmlFor="uid">
                  {t('uid')} <span className="text-error">*</span>
                </Label>
                <Input id="uid" placeholder={t('uidPlaceholder')} type="text" />
                <p className="text-muted-foreground text-xs">{t('uidHint')}</p>
              </div>

              {/* WSK (Web Service Key) */}
              <div className="space-y-2">
                <Label htmlFor="wsk">
                  {t('wsk')} <span className="text-error">*</span>
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    id="wsk"
                    placeholder={t('wskPlaceholder')}
                    type="password"
                    className="pl-10"
                  />
                </div>
                <p className="text-muted-foreground text-xs">{t('wskHint')}</p>
              </div>

              {/* Pagadito Features */}
              <div className="bg-secondary/10 border-secondary/30 space-y-2 rounded-lg border p-4">
                <p className="text-sm font-medium">{t('pagaditoFeatures')}</p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• {t('pagaditoFeature1')}</li>
                  <li>• {t('pagaditoFeature2')}</li>
                  <li>• {t('pagaditoFeature3')}</li>
                  <li>• {t('pagaditoFeature4')}</li>
                </ul>
              </div>
            </>
          )}

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
