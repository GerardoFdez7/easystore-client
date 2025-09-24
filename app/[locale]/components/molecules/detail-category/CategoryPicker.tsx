'use client';

import Image from 'next/image';
import { Button } from '@shadcn/ui/button';
import { Badge } from '@shadcn/ui/badge';
import { Trash2 } from 'lucide-react';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';

import AddSubcategoriesPicker, {
  type CategoryItem as CatalogItem,
} from '@molecules/detail-category/AddSubcategory';

export type CategoryItem = {
  id: string;
  name: string;
  cover: string;
  description?: string;
  tags?: string[];
  selected?: boolean;
  count?: number;
};

type Props = {
  items: CategoryItem[];
  catalog?: CatalogItem[];
  disabled?: boolean;
  onAdd?: (ids: string[]) => void;
  onRemove: (id: string) => void;
  onOrderChange?: (order: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onToggleSelect?: (id: string, value: boolean) => void;
};

export default function CategoryPicker({
  items,
  catalog = [],
  disabled,
  onAdd,
  onRemove,
}: Props) {
  const t = useTranslations('CategoryDetail');
  const excludeIds = items.map((i) => i.id);

  return (
    <div className="space-y-3">
      <div className="flex w-full items-center justify-end">
        <AddSubcategoriesPicker
          className="w-full sm:w-auto"
          catalog={catalog}
          excludeIds={excludeIds}
          disabled={disabled}
          onAdd={onAdd}
        />
      </div>

      {items.length === 0 ? (
        <div
          role="status"
          className="text-text/60 bg-muted/30 w-full rounded-md border py-6 text-center"
        >
          {t('noCategories')}
        </div>
      ) : (
        <div className="overflow-hidden rounded-md">
          {items.map((c) => {
            const count = typeof c.count === 'number' ? c.count : 0;
            return (
              <div
                key={c.id}
                className={cn(
                  'bg-muted grid grid-cols-[40px_1fr] items-center gap-2 border-b px-3 py-2 last:border-none',
                  'sm:grid-cols-[40px_1fr_auto_40px]',
                  'hover:bg-muted/80 transition',
                )}
              >
                <div className="flex items-center sm:justify-center">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-text truncate text-sm">{c.name}</span>

                  {c.description ? (
                    <span className="text-text/70 line-clamp-1 text-xs">
                      {c.description}
                    </span>
                  ) : null}

                  {c.tags?.length ? (
                    <div className="flex flex-wrap gap-1">
                      {c.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-foreground/10 text-text rounded-full px-2 py-0.5 text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="hidden sm:flex sm:justify-end">
                  <Badge
                    className="rounded-full px-3 py-1 text-[11px]"
                    variant="outline"
                  >
                    {t('itemsCount', { count })}
                  </Badge>
                </div>

                <div className="hidden items-center justify-end sm:flex">
                  <Button
                    variant="ghost"
                    onClick={() => onRemove(c.id)}
                    disabled={disabled}
                    className="hover:bg-destructive/10 gap-2 rounded-full px-3 py-1"
                  >
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </div>

                <div className="col-span-2 flex items-center justify-between sm:hidden">
                  <Badge
                    className="rounded-full px-3 py-1 text-[11px]"
                    variant="outline"
                  >
                    {t('itemsCount', { count })}
                  </Badge>
                  <Button
                    variant="ghost"
                    onClick={() => onRemove(c.id)}
                    disabled={disabled}
                    className="hover:bg-destructive/10 gap-2 rounded-full px-3 py-1"
                  >
                    <Trash2 className="text-destructive h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
