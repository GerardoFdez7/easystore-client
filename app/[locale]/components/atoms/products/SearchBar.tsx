import { Search } from 'lucide-react';
import { Input } from '@shadcn/ui/input';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({
  placeholder = 'Search products',
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative max-w-md flex-1">
      <Search className="text-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-card rounded-full pl-10"
      />
    </div>
  );
}
