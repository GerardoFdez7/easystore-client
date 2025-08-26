import { Badge } from '@shadcn/ui/badge';

interface BagdeTagProps {
  tag: string;
  className?: string;
}

export default function BadgeTag({ tag, className = '' }: BagdeTagProps) {
  return (
    <Badge
      variant="secondary"
      className={`text-foreground bg-gray-100 text-sm dark:bg-[#d7d7d7] dark:text-[#423f3d] ${className}`}
    >
      {tag}
    </Badge>
  );
}
