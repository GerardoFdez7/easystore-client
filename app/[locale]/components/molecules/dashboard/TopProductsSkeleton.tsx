import { Skeleton } from '@shadcn/ui/skeleton';
import { Card, CardContent } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';

export default function TopProductsSkeleton() {
  const t = useTranslations('Dashboard');

  return (
    <section aria-labelledby="top-products-heading" aria-busy="true">
      <h2
        id="top-products-heading"
        className="text-title mb-4 text-xl font-semibold"
      >
        {t('topProducts')}
      </h2>
      <Card>
        <CardContent>
          <div className="gap-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <Skeleton className="mb-3 h-32 w-40 max-w-full rounded-lg" />
                <Skeleton className="mb-1 h-4 w-20" />
                <Skeleton className="mb-1 h-3 w-16" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
