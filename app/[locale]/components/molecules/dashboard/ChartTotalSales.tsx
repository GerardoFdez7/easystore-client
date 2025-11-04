'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@shadcn/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@shadcn/ui/toggle-group';
import { useIsMobile } from '@hooks/utils/useMobile';
import { useTranslations } from 'next-intl';
import type { OrderTimelinePoint } from '@hooks/domains/dashboard';

export const description = 'An interactive area chart';

interface ChartTotalSalesProps {
  ordersTimeline: OrderTimelinePoint[];
  totalRevenue: number;
}

export function ChartTotalSales({
  ordersTimeline,
  totalRevenue,
}: ChartTotalSalesProps) {
  const t = useTranslations('Dashboard');
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState('90d');
  const currency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';

  const chartConfig = {
    revenue: {
      label: t('revenue'),
      color: 'var(--foreground)',
    },
  } satisfies ChartConfig;

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  // Transformar los datos para el gráfico
  const chartData = React.useMemo(() => {
    return ordersTimeline.map((item) => ({
      date: item.date,
      revenue: item.revenue,
    }));
  }, [ordersTimeline]);

  const filteredData = React.useMemo(() => {
    if (chartData.length === 0) {
      return [];
    }

    const date = new Date(chartData[chartData.length - 1].date);
    let daysToSubtract = 90;

    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }

    const startDateFilter = new Date(date);
    startDateFilter.setDate(startDateFilter.getDate() - daysToSubtract);

    return chartData.filter((item) => new Date(item.date) >= startDateFilter);
  }, [chartData, timeRange]);

  return (
    <section className="pb-10">
      <h1 className="text-title mb-4 text-2xl font-bold">{t('totalSales')}</h1>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-3xl">
            {`${currency}${totalRevenue.toLocaleString()}`}
          </CardTitle>
          <CardDescription>
            <span className="text-secondary hidden @[767px]/card:block">
              {t('salesOverTime')}
            </span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-full **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  {t('3months')}
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  {t('30days')}
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  {t('7days')}
                </SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">{t('3months')}</ToggleGroupItem>
              <ToggleGroupItem value="30d">{t('30days')}</ToggleGroupItem>
              <ToggleGroupItem value="7d">{t('7days')}</ToggleGroupItem>
            </ToggleGroup>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.1}
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
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                defaultIndex={isMobile ? -1 : 10}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
