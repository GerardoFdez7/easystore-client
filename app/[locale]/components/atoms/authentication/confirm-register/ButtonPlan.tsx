import { Button } from '@shadcn/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'utils';

type ButtonPlanProps = {
  text: string;
  selected?: boolean;
  onSelect: () => void;
  mode?: 'confirm' | 'landing';
  recommended?: boolean;
};

export default function ButtonPlan({
  text,
  selected,
  onSelect,
  mode = 'confirm',
  recommended,
}: ButtonPlanProps) {
  const content = (
    <div className="flex items-center justify-between gap-x-4 text-lg">
      <span>{text}</span>
      {mode === 'confirm' && selected && (
        <Check className="text-secondary h-6 w-6" />
      )}
    </div>
  );

  // Only the recommended plan gets the filled button; the rest are outlined.
  const variant = recommended ? 'plans' : 'outline';
  const baseClass = 'w-full rounded-full py-6 hover:cursor-pointer';

  if (mode === 'landing') {
    return (
      <Link href="/register">
        <Button className={baseClass} variant={variant}>
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className={cn(baseClass, selected && 'border-primary border-2')}
      variant={variant}
      onClick={onSelect}
    >
      {content}
    </Button>
  );
}
