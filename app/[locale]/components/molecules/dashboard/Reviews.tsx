import { Card, CardContent, CardHeader } from '@shadcn/ui/card';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Reviews() {
  const t = useTranslations('Dashboard');

  return (
    <section className="py-10" data-tour="reviews">
      <h1 className="text-title mb-4 text-2xl font-bold">{t('reviews')}</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-title text-3xl font-bold">5.0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="fill-foreground text-foreground h-4 w-4"
                />
              ))}
            </div>
          </div>
          <div className="text-foreground text-sm">100 {t('reviews')}</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { stars: 5, percentage: 50 },
              { stars: 4, percentage: 30 },
              { stars: 3, percentage: 10 },
              { stars: 2, percentage: 5 },
              { stars: 1, percentage: 5 },
            ].map((review) => (
              <div key={review.stars} className="flex items-center gap-3">
                <span className="text-foreground w-2 text-sm">
                  {review.stars}
                </span>
                <div className="h-2 flex-1 rounded-full bg-[#e2e8f0]">
                  <div
                    className="bg-secondary h-2 rounded-full"
                    style={{ width: `${review.percentage}%` }}
                  ></div>
                </div>
                <span className="text-foreground w-8 text-sm">
                  {review.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
