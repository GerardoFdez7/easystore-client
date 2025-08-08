'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@shadcn/ui/input';
import { Button } from '@shadcn/ui/button';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchCategory() {
  const t = useTranslations('Category');
  const [query, setQuery] = useState('');

  return (
    <div className="px-5">
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto]">
        {/* Search */}
        <div className="relative w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-full border border-gray-300 bg-white pl-9 placeholder:text-[#94a3b8]"
          />
        </div>

        {/* Button */}
        <Button
          type="button"
          className="hover:bg-primary justify-self-end rounded-full bg-black px-4 py-2 whitespace-nowrap text-white"
          onClick={() => alert(t('addCategory'))}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('addCategory')}
        </Button>
      </div>
    </div>
  );
}
