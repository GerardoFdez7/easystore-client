'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchCategory() {
  const t = useTranslations('Category');
  const [query, setQuery] = useState('');

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-full border border-gray-300 bg-white pl-9 placeholder:text-[#94a3b8]"
        />
      </div>
    </div>
  );
}
