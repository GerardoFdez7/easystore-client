import { FC, useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@shadcn/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@hooks/utils/useDebounce';
import { cn } from '@lib/utils';

interface SearchBarProps {
  placeholder?: string;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder,
  searchTerm,
  onSearchChange,
  className,
  inputClassName,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue !== searchTerm) {
      onSearchChange(debouncedInputValue);
    }
  }, [debouncedInputValue, onSearchChange, searchTerm]);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={cn(
        'relative w-full disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
    >
      <Search
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        className={cn('pl-10', inputClassName)}
        aria-label={placeholder || 'Search'}
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
