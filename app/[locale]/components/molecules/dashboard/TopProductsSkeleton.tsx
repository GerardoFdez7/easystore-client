import { Skeleton } from '@shadcn/ui/skeleton';
import { Card, CardContent, CardHeader } from '@shadcn/ui/card';

export default function TopProductsSkeleton() {
  return (
    <section className="py-10">
      <Skeleton className="mb-4 h-8 w-32" />
      <Card className="mb-8">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 @min-7xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Skeleton className="mb-2 h-24 w-24 rounded-lg" />
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
