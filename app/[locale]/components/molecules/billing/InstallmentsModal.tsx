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
import { Calendar, Info, Plus, Trash2 } from 'lucide-react';

type InstallmentPlan = {
  id: string;
  months: number;
  interestRate: number;
  minAmount: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
};

export default function InstallmentsModal({
  open,
  onOpenChange,
  onSaved,
}: Props) {
  const t = useTranslations('Billing.Installments');
  const [autoApprove, setAutoApprove] = useState(false);
  const [plans, setPlans] = useState<InstallmentPlan[]>([
    { id: '1', months: 3, interestRate: 0, minAmount: 100 },
    { id: '2', months: 6, interestRate: 5, minAmount: 200 },
    { id: '3', months: 12, interestRate: 10, minAmount: 500 },
  ]);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Save installments configuration', { plans });
    onSaved?.();
    onOpenChange(false);
  };

  const addPlan = () => {
    const newPlan: InstallmentPlan = {
      id: Date.now().toString(),
      months: 3,
      interestRate: 0,
      minAmount: 50,
    };
    setPlans([...plans, newPlan]);
  };

  const removePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const updatePlan = (
    id: string,
    field: keyof InstallmentPlan,
    value: number,
  ) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id ? { ...plan, [field]: value } : plan,
      ),
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('title')}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Enable/Disable removed to avoid redundancy with outer switch */}

          {/* Payment Plans */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t('paymentPlans')}</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addPlan}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                {t('addPlan')}
              </Button>
            </div>

            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-muted/30 grid gap-3 rounded-lg border p-4 sm:grid-cols-4"
                >
                  {/* Months */}
                  <div className="space-y-2">
                    <Label className="text-xs">{t('months')}</Label>
                    <Select
                      value={plan.months.toString()}
                      onValueChange={(value) =>
                        updatePlan(plan.id, 'months', parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="18">18</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <Label className="text-xs">{t('interestRate')}</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={plan.interestRate}
                        onChange={(e) =>
                          updatePlan(
                            plan.id,
                            'interestRate',
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                      <span className="text-muted-foreground text-sm">%</span>
                    </div>
                  </div>

                  {/* Minimum Amount */}
                  <div className="space-y-2">
                    <Label className="text-xs">{t('minAmount')}</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm">$</span>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={plan.minAmount}
                        onChange={(e) =>
                          updatePlan(
                            plan.id,
                            'minAmount',
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlan(plan.id)}
                      className="text-error hover:bg-error/10 hover:text-error w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-Approve */}
          <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoApprove">{t('autoApprove')}</Label>
                <p className="text-muted-foreground text-xs">
                  {t('autoApproveDescription')}
                </p>
              </div>
              <Switch
                id="autoApprove"
                checked={autoApprove}
                onCheckedChange={setAutoApprove}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-secondary/10 border-secondary/30 flex gap-3 rounded-lg border p-4">
            <Info className="text-secondary h-5 w-5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('featuresTitle')}</p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• {t('feature1')}</li>
                <li>• {t('feature2')}</li>
                <li>• {t('feature3')}</li>
                <li>• {t('feature4')}</li>
              </ul>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-warning/10 border-warning/30 flex gap-3 rounded-lg border p-4">
            <Info className="text-warning h-5 w-5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t('infoTitle')}</p>
              <p className="text-muted-foreground text-xs">{t('infoText')}</p>
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
