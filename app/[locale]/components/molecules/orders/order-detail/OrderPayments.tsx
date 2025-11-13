import { Badge } from '@shadcn/ui/badge';
import { useTranslations } from 'next-intl';

export default function OrderPayments() {
  const t = useTranslations('Orders');
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold">{t('payments')}</h3>
      <div className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <svg
            className="text-muted-foreground h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <div>
            <div className="font-medium">Credit Card (Visa **** 2422)</div>
            <div className="text-muted-foreground text-sm">
              TXN123 - May 15, 2025
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-6 sm:flex-col sm:items-end sm:gap-2">
          <span className="font-bold">GTO 490.00</span>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            {t('confirmed')}
          </Badge>
        </div>
      </div>
    </div>
  );
}
