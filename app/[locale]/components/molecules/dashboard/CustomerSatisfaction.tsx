import { Card, CardContent, CardHeader } from '@shadcn/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@shadcn/ui/chart';
import { useTranslations } from 'next-intl';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const data = [
  { rating: '1', count: 2 },
  { rating: '2', count: 5 },
  { rating: '3', count: 12 },
  { rating: '4', count: 30 },
  { rating: '5', count: 80 },
];

const chartConfig = {
  count: {
    label: 'Cantidad',
    color: '#bd5cf5',
  },
};

export default function CustomerSatisfaction() {
  const t = useTranslations('Dashboard');

  return (
    <section>
      <h1 className="text-title mb-4 text-2xl font-bold">
        {t('customerSatisfaction')}
      </h1>

      <Card className="border-[#e2e8f0] bg-[#ffffff]">
        <CardHeader>
          <div className="text-foreground text-sm">{t('avarageRating')}</div>
          <div className="text-title text-3xl font-bold">4.5</div>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <BarChart data={data} margin={{ left: -25 }}>
              <XAxis dataKey="rating" />
              <YAxis allowDecimals={false} />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[6, 6, 0, 0]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
}
