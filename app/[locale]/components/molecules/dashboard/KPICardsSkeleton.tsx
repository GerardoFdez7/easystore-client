import { Skeleton } from '@shadcn/ui/skeleton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';

const cardTitles = [
  'sales',
  'customers',
  'orders',
  'averageOrderValue',
] as const;

export default function KPICardsSkeleton() {
  const t = useTranslations('Dashboard');

  return (
    <section
      aria-label={t('keyMetrics')}
      className="gap-card grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
    >
      {cardTitles.map((title) => (
        <Card key={title}>
          <CardHeader>
            <CardDescription>{t(title)}</CardDescription>
            <CardTitle>
              <Skeleton aria-hidden="true" className="h-8 w-20" />
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <Skeleton aria-hidden="true" className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
