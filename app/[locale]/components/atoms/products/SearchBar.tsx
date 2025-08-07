import { Search } from 'lucide-react';
import { Input } from '@shadcn/ui/input';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-[550px] min-w-[200px] flex-1 sm:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl">
      <Search className="text-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="bg-card rounded-full pl-10 text-[13px] sm:text-[14px]"
      />
    </div>
  );
}
