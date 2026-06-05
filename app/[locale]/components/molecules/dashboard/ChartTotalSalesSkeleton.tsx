import { Skeleton } from '@shadcn/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';

export default function ChartTotalSalesSkeleton() {
  return (
    <section className="pb-10">
      <Skeleton className="mb-4 h-8 w-32" />
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-3xl">
            <Skeleton className="h-9 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="mt-2 h-4 w-32" />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="flex h-[250px] w-full items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
