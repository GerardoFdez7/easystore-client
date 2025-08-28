'use client';

import { Input } from '@shadcn/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from 'utils';

type UseSearchReturn = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDebouncing: boolean;
  reset?: () => void;
};

type Props = {
  placeholder: string;
  useSearch: () => UseSearchReturn;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  'aria-label'?: string;
};

export default function Search({
  placeholder,
  useSearch,
  disabled,
  className,
  inputClassName,
  'aria-label': ariaLabel = 'Search',
}: Props) {
  const { query, onChange } = useSearch();

  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full">
        <SearchIcon className="text-text pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled}
          className={cn(
            'placeholder:text-text w-full rounded-full border border-gray-300 bg-white pl-9 selection:bg-blue-500',
            inputClassName,
          )}
        />
      </div>
    </div>
  );
}
