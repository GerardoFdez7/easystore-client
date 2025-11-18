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
import { Input } from '@shadcn/ui/input';
import { Label } from '@shadcn/ui/label';

import { Landmark, Lock } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function PagaditoModal({ open, onOpenChange, onSaved }: Props) {
  const t = useTranslations('Billing.Pagadito');

  const handleSave = () => {
    // TODO: Implement save logic with GraphQL mutation
    console.log('Save Pagadito configuration');
    onSaved?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* UID */}
          <div className="space-y-2">
            <Label htmlFor="uid">{t('uid')}</Label>
            <Input id="uid" placeholder={t('uidPlaceholder')} type="text" />
            <p className="text-muted-foreground text-xs">{t('uidHint')}</p>
          </div>

          {/* WSK (Web Service Key) */}
          <div className="space-y-2">
            <Label htmlFor="wsk">{t('wsk')}</Label>
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
            <Lock className="text-warning h-5 w-5 shrink-0" />
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
