import { Search } from 'lucide-react';
import { Input } from '@shadcn/ui/input';
import { cn } from 'utils';

interface SearchBarProps {
  className?: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  className,
  placeholder,
  searchTerm,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-card rounded-full pl-10 text-[13px] sm:text-[14px]"
      />
    </div>
  );
}
