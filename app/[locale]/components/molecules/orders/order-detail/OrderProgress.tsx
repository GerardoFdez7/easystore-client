import { Package, Truck, MapPin, Home } from 'lucide-react';
import { Progress } from '@shadcn/ui/progress';
import { cn } from '@lib/utils';

export default function OrderProgress() {
  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={75} className="h-2" />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-4">
        {/* Step 1 - Completed */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-primary text-primary-foreground',
            )}
          >
            <Package className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Processed</p>
            <p className="text-muted-foreground text-xs">Oct 20, 2025</p>
          </div>
        </div>

        {/* Step 2 - Completed */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-primary text-primary-foreground',
            )}
          >
            <Truck className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Shipped</p>
            <p className="text-muted-foreground text-xs">Oct 21, 2025</p>
          </div>
        </div>

        {/* Step 3 - Current */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-primary text-primary-foreground',
            )}
          >
            <MapPin className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">En Route</p>
            <p className="text-muted-foreground text-xs">In transit</p>
          </div>
        </div>

        {/* Step 4 - Pending */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-muted text-muted-foreground',
            )}
          >
            <Home className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">
              Delivered
            </p>
            <p className="text-muted-foreground text-xs">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
