'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import type { OrderTimelinePoint } from '@hooks/domains/dashboard';
import { formatMoney, isDecimalString } from '@lib/utils/money';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@shadcn/ui/chart';
import {
  ChartTotalSalesRange,
  salesRanges as ranges,
  type SalesRange as Range,
} from './ChartTotalSalesRange';

interface ChartTotalSalesProps {
  ordersTimeline: OrderTimelinePoint[];
  totalRevenue: OrderTimelinePoint['revenue'];
  locale: string;
}

type ChartPoint = OrderTimelinePoint & { revenueCents: number };

/** Recharts needs numeric coordinates; the displayed Money stays a decimal string. */
function toSafeChartCoordinate(amount: string): number | null {
  if (!isDecimalString(amount) || amount.endsWith('.')) return null;

  const [whole, fraction = ''] = amount.split('.');
  const cents = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  if (cents > BigInt(Number.MAX_SAFE_INTEGER)) return null;

  return Number(cents);
}

function formatDate(date: string, locale: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function ChartTotalSales({
  ordersTimeline,
  totalRevenue,
  locale,
}: ChartTotalSalesProps) {
  const t = useTranslations('Dashboard');
  const [timeRange, setTimeRange] = useState<Range>('90d');
  const gradientId = `revenue-${useId().replace(/:/g, '')}`;
  const lastDate = ordersTimeline.at(-1)?.date;
  const cutoff = lastDate ? new Date(`${lastDate}T00:00:00Z`) : null;
  cutoff?.setUTCDate(cutoff.getUTCDate() - ranges[timeRange] + 1);
  const cutoffDate = cutoff?.toISOString().slice(0, 10);
  const visiblePoints = ordersTimeline.filter(
    (point) => !cutoffDate || point.date >= cutoffDate,
  );
  const chartData = visiblePoints.map((point) => {
    const revenueCents = toSafeChartCoordinate(point.revenue.amount);
    return revenueCents === null ? null : { ...point, revenueCents };
  });
  const canPlot = chartData.every(
    (point): point is ChartPoint => point !== null,
  );
  const config = {
    revenueCents: { label: t('revenue'), color: 'var(--foreground)' },
  } satisfies ChartConfig;

  return (
    <section aria-labelledby="total-sales-heading">
      <h2
        id="total-sales-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('totalSales')}
      </h2>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl tabular-nums">
            {formatMoney(totalRevenue, locale)}
          </CardTitle>
          <CardDescription>{t('salesOverTime')}</CardDescription>
          <CardAction>
            <ChartTotalSalesRange
              value={timeRange}
              onValueChange={setTimeRange}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {visiblePoints.length === 0 ? (
            <p className="text-muted-foreground py-card text-center text-sm">
              {t('noOrdersTitle')}
            </p>
          ) : canPlot ? (
            <ChartContainer
              config={config}
              className="aspect-auto h-62.5 w-full"
              role="img"
              aria-label={t('salesOverTime')}
            >
              <AreaChart data={chartData} accessibilityLayer>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenueCents)"
                      stopOpacity={0.75}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenueCents)"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(date: string) => formatDate(date, locale)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_label, payload) =>
                        formatDate(String(payload[0]?.payload.date), locale)
                      }
                      formatter={(_value, _name, item) => {
                        const point = item.payload as ChartPoint;
                        return (
                          <span className="text-foreground tabular-nums">
                            {formatMoney(point.revenue, locale)}
                          </span>
                        );
                      }}
                    />
                  }
                />
                <Area
                  dataKey="revenueCents"
                  name={t('revenue')}
                  type="natural"
                  fill={`url(#${gradientId})`}
                  stroke="var(--color-revenueCents)"
                  strokeWidth={2}
                  dot={chartData.length === 1 ? { r: 5 } : false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <ol className="divide-border divide-y">
              {visiblePoints.map((point) => (
                <li
                  key={point.date}
                  className="gap-control py-control flex items-center justify-between text-sm"
                >
                  <time dateTime={point.date} className="text-muted-foreground">
                    {formatDate(point.date, locale)}
                  </time>
                  <span className="text-title font-medium tabular-nums">
                    {formatMoney(point.revenue, locale)}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
