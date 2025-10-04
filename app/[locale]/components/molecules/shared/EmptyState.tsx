import { Button } from '@shadcn/ui/button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'title';
  buttonIcon?: LucideIcon;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  buttonVariant = 'title',
  buttonIcon: ButtonIcon,
}: EmptyStateProps) {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center gap-6 sm:mx-auto">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="dark:bg-muted rounded-full bg-gray-200 p-6">
          <Icon className="text-muted-foreground h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
        {buttonText && onButtonClick && (
          <Button
            className="text-md mt-4"
            variant={buttonVariant}
            onClick={onButtonClick}
          >
            {ButtonIcon && <ButtonIcon className="h-4 w-4" />}
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
