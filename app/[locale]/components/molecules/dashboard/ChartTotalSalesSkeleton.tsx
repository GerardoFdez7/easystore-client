import { Skeleton } from '@shadcn/ui/skeleton';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';
import { ChartTotalSalesRange } from './ChartTotalSalesRange';

export default function ChartTotalSalesSkeleton() {
  const t = useTranslations('Dashboard');

  return (
    <section aria-labelledby="total-sales-heading" aria-busy="true">
      <h2
        id="total-sales-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('totalSales')}
      </h2>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-7 w-40" />
          </CardTitle>
          <CardDescription>{t('salesOverTime')}</CardDescription>
          <CardAction>
            <ChartTotalSalesRange />
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="flex h-62.5 flex-col justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-px w-full" />
            ))}
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
