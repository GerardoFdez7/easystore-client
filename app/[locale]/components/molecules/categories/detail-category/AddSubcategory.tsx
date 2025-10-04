'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Button } from '@shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@shadcn/ui/drawer';
import { Checkbox } from '@shadcn/ui/checkbox';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@hooks/utils/useMobile';
import SearchBar from '@atoms/shared/SearchBar';

export type CategoryItem = {
  id: string;
  name: string;
  cover: string;
  count?: number;
  status?: 'active' | 'inactive';
};

type Props = {
  catalog: CategoryItem[];
  excludeIds?: string[];
  disabled?: boolean;
  onAdd?: (ids: string[]) => void;
  className?: string;
};

export default function AddSubcategoriesPicker({
  catalog,
  excludeIds = [],
  disabled,
  onAdd,
  className,
}: Props) {
  const t = useTranslations('CategoryDetail');
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const exclude = useMemo(() => new Set(excludeIds), [excludeIds]);

  const list = useMemo(() => {
    const base = catalog.filter((c) => !exclude.has(c.id));
    const query = q.trim().toLowerCase();
    return query
      ? base.filter((c) => c.name.toLowerCase().includes(query))
      : base;
  }, [catalog, exclude, q]);

  const toggle = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const addSelected = () => {
    if (selected.size === 0) return;
    onAdd?.(Array.from(selected));
    setSelected(new Set());
    setOpen(false);
  };

  const Body = (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <SearchBar
        placeholder={t('searchCategories')}
        searchTerm={q}
        onSearchChange={setQ}
      />

      <div className="max-h-[60vh] overflow-auto rounded-md border">
        {list.length === 0 ? (
          <div className="text-text p-6 text-center text-sm">
            {t('noResults')}
          </div>
        ) : (
          list.map((c) => (
            <label
              key={c.id}
              className={cn(
                'bg-muted hover:bg-muted/80 flex cursor-pointer items-center justify-between gap-3 border-b px-3 py-2 transition last:border-none',
              )}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selected.has(c.id)}
                  onCheckedChange={(v) => toggle(c.id, Boolean(v))}
                  disabled={disabled}
                  className="bg-white"
                />
                <div className="ring-foreground/10 relative h-8 w-8 overflow-hidden rounded-full ring-1">
                  <Image
                    src={c.cover}
                    alt={c.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-text truncate text-sm">{c.name}</span>
              </div>
            </label>
          ))
        )}
      </div>

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <span className="text-text text-sm">
          {selected.size > 0
            ? t('itemsCount', { count: selected.size })
            : '\u00A0'}
        </span>
        <Button
          onClick={addSelected}
          disabled={disabled || selected.size === 0}
          className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
        >
          {t('add')}
        </Button>
      </div>
    </div>
  );

  const Trigger = (
    <Button
      className="text-accent bg-title hover:bg-accent-foreground h-9 w-full sm:w-auto"
      disabled={disabled}
    >
      {t('addSubcategories')}
    </Button>
  );

  return (
    <div className={className}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
          <DrawerContent className="flex h-[85vh] flex-col">
            <DrawerHeader className="text-left">
              <DrawerTitle>{t('addSubcategories')}</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-4">{Body}</div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">{t('close')}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{Trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>{t('addSubcategories')}</DialogTitle>
            </DialogHeader>
            {Body}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
