'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { Badge } from '@shadcn/ui/badge';
import { X } from 'lucide-react';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';
import { useSearch } from '@hooks/useSearch';
import SearchBar from '@atoms/shared/Search';

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  selected: boolean;
};

type Props = {
  items: Product[];
  disabled?: boolean;
  onToggleSelect: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
  onExplore?: () => void;
  onOrderChange?: (order: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onShowMore?: () => void;
};

export default function ProductPicker({
  items,
  disabled,
  onToggleSelect,
  onRemove,
  onOrderChange,
  onShowMore,
}: Props) {
  const t = useTranslations('CategoryDetail');
  const [query] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const useProductSearch = () =>
    useSearch((q) => {
      console.log('search:', q);
    }, 500);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const data = q
      ? items.filter((p) => p.name.toLowerCase().includes(q))
      : items;
    return order === 'asc' ? data : [...data].reverse();
  }, [items, query, order]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <SearchBar
          placeholder={t('searchProducts')}
          useSearch={useProductSearch}
          disabled={disabled}
        />

        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <Select
            value={order}
            onValueChange={(val: 'asc' | 'desc') => {
              setOrder(val);
              onOrderChange?.(val);
            }}
            disabled={disabled}
          >
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder={t('order')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">{t('orderAsc')}</SelectItem>
              <SelectItem value="desc">{t('orderDesc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md ring-1 ring-gray-200">
        {filtered.map((p, idx) => (
          <div
            key={p.id}
            className={cn(
              'flex flex-col gap-2 border-b border-gray-100 bg-white px-3 py-2 last:border-none',
              'md:grid md:grid-cols-[40px_1fr_auto_auto_40px] md:items-center md:gap-2',
            )}
          >
            <div className="flex items-center md:justify-center">
              <Checkbox
                checked={p.selected}
                onCheckedChange={(v) => onToggleSelect(p.id, Boolean(v))}
                disabled={disabled}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="truncate text-sm text-[#423f3d]">{p.name}</span>
            </div>

            <div className="md:justify-end">
              <Badge
                className={cn(
                  'rounded-full px-3 py-1 text-[11px]',
                  p.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-200 text-gray-600',
                )}
                variant="secondary"
              >
                {p.status === 'active'
                  ? t('statusActive')
                  : t('statusInactive')}
              </Badge>
            </div>

            <div className="hidden text-right text-xs text-slate-400 md:block">
              #{idx + 1}
            </div>

            <div className="flex items-center justify-end md:justify-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onRemove(p.id)}
                disabled={disabled}
                aria-label="Remove"
              >
                <X className="h-4 w-4 text-slate-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowMore}
          disabled={disabled}
        >
          {t('showMore')}
        </Button>
      </div>
    </div>
  );
}
