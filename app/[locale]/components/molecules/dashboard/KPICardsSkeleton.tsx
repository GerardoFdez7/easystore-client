import { Skeleton } from '@shadcn/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';

export default function KPICardsSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-6 px-5 pb-10 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
            <Skeleton className="h-4 w-4 rounded-none" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="h-8 w-28" />
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              <Skeleton className="h-3 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
