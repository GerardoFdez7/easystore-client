import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { cn } from 'utils';

interface NotificationButtonProps {
  className?: string;
  disabled?: boolean;
}

export default function NotificationButton({
  className,
  disabled,
}: NotificationButtonProps) {
  const t = useTranslations('Shared');

  return (
    <Button
      type="button"
      disabled={disabled}
      aria-label={t('notifications')}
      className={cn(
        'hover:bg-hover bg-background h-10 w-10 rounded-lg p-2 shadow-none',
        className,
      )}
    >
      <Bell className="text-title size-6" aria-hidden="true" />
    </Button>
  );
}
