import { useTranslations } from 'next-intl';
import { Badge } from '@shadcn/ui/badge';
import { X } from 'lucide-react';

interface BadgeTagProps {
  text: string;
  onRemove: () => void;
}

export default function BadgeTag({ text, onRemove }: BadgeTagProps) {
  const t = useTranslations('Products');
  return (
    <Badge
      variant="secondary"
      className="text-foreground bg-border hover:bg-hover dark:text-foreground text-xs sm:text-sm"
    >
      {text}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2"
        aria-label={t('removeTag', { name: text })}
      >
        <X className="hover:text-destructive h-3 w-3" aria-hidden="true" />
      </button>
    </Badge>
  );
}
