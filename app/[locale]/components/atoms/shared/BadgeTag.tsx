import { Badge } from '@shadcn/ui/badge';

interface BagdeTagProps {
  tag: string;
  className?: string;
}

export default function BadgeTag({ tag, className = '' }: BagdeTagProps) {
  return (
    <Badge
      variant="secondary"
      className={`text-foreground bg-background dark:bg-border dark:text-foreground text-sm ${className}`}
    >
      {tag}
    </Badge>
  );
}
