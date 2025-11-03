import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import { Button } from '@shadcn/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { Textarea } from '@shadcn/ui/textarea';
import { Separator } from '@shadcn/ui/separator';

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onConfirm: () => void;
};

export default function UpdateReasonDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  const t = useTranslations('StockDetail');
  const form = useFormContext();
  const reasonValue = form.watch('reason') || '';
  const charCount = reasonValue.trim().length;
  const minLength = 20;
  const isValid = charCount >= minLength;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('updateReasonTitle')}</DialogTitle>
          <DialogDescription>{t('updateReasonDescription')}</DialogDescription>
        </DialogHeader>
        <Separator />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                {t('updateReasonLabel')}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-50"
                  maxLength={2000}
                  placeholder={t('updateReasonPlaceholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('cancel')}
          </Button>
          <Button
            disabled={!isValid}
            className="text-accent bg-title hover:bg-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onConfirm}
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
