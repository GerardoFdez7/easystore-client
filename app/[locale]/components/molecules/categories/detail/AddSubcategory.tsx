'use client';

import { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Search, Plus } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Checkbox } from '@shadcn/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@shadcn/ui/drawer';
import { Separator } from '@shadcn/ui/separator';
import SearchBar from '@atoms/shared/SearchBar';
import LoadMoreButton from '@atoms/shared/LoadMoreButton';
import { useIsMobile } from '@hooks/utils/useMobile';
import { useCategoriesForPicker } from '@hooks/domains/category';
import { cn } from 'utils';

export type CategoryItem = {
  id: string;
  name: string;
  cover: string;
  count?: number;
  status?: 'active' | 'inactive';
};

type Props = {
  excludeIds?: string[];
  currentCategoryId?: string; // Add current category ID to prevent self-selection
  disabled?: boolean;
  onAdd?: (categories: CategoryItem[]) => void;
  className?: string;
  open?: boolean; // External control of open state
  onOpenChange?: (open: boolean) => void; // External control of open state
  mode?: 'category-management' | 'product-selection'; // New prop to control behavior
};

export default function AddSubcategoriesPicker({
  excludeIds = [],
  currentCategoryId,
  disabled,
  onAdd,
  className,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  mode = 'category-management', // Default to category management mode
}: Props) {
  const t = useTranslations('CategoryDetail');
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);

  // Use external open state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : open;
  const handleOpenChange = externalOnOpenChange || setOpen;
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Combine excludeIds with currentCategoryId to prevent self-selection
  const allExcludeIds = useMemo(() => {
    const ids = [...excludeIds];
    if (currentCategoryId) {
      ids.push(currentCategoryId);
    }
    return ids;
  }, [excludeIds, currentCategoryId]);

  const exclude = useMemo(() => new Set(allExcludeIds), [allExcludeIds]);

  // Fetch categories with includeSubcategories=false using the new picker hook
  const {
    items: categories,
    loading,
    hasMore,
    handleLoadMore,
  } = useCategoriesForPicker({
    name: q.trim(),
    includeSubcategories: false,
  });

  const list = useMemo(() => {
    return categories.filter((c) => !exclude.has(c.id));
  }, [categories, exclude]);

  const toggle = useCallback((id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const addSelected = useCallback(() => {
    if (selected.size === 0) {
      return;
    }

    // Map selected IDs to full category objects
    const selectedCategories = Array.from(selected)
      .map((id) => categories.find((cat) => cat.id === id))
      .filter((cat): cat is CategoryItem => Boolean(cat));

    onAdd?.(selectedCategories);
    setSelected(new Set());
    handleOpenChange(false);
  }, [selected, categories, onAdd, handleOpenChange]);

  const handleSearchChange = useCallback((value: string) => {
    setQ(value);
  }, []);

  const handleLoadMoreClick = useCallback(() => {
    void handleLoadMore();
  }, [handleLoadMore]);

  const Body = (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col space-y-3">
      <SearchBar
        placeholder={t('searchSubcategories')}
        searchTerm={q}
        onSearchChange={handleSearchChange}
        aria-label={t('searchSubcategories')}
      />

      <div className="flex-1 overflow-auto rounded-md border" role="listbox">
        {list.length === 0 ? (
          <div className="text-text p-6 text-center text-sm" role="status">
            {t('noResults')}
          </div>
        ) : (
          <>
            {list.map((c) => (
              <label
                key={c.id}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 border-b bg-transparent px-3 py-2 transition last:border-none',
                )}
                htmlFor={`category-${c.id}`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`category-${c.id}`}
                    checked={selected.has(c.id)}
                    onCheckedChange={(v) => toggle(c.id, Boolean(v))}
                    disabled={disabled || loading}
                    aria-describedby={`category-name-${c.id}`}
                  />
                  <div className="ring-foreground/10 relative h-8 w-8 overflow-hidden rounded-full ring-1">
                    <Image
                      src={c.cover || ''}
                      alt={`${c.name} category cover`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span
                    id={`category-name-${c.name}`}
                    className="text-text truncate text-sm"
                  >
                    {c.name}
                  </span>
                </div>
              </label>
            ))}
            {hasMore && (
              <LoadMoreButton
                onClick={handleLoadMoreClick}
                isLoading={loading}
                disabled={!hasMore}
                size="sm"
                className="m-4"
              />
            )}
          </>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">
        <span className="text-text text-sm" role="status" aria-live="polite">
          {selected.size > 0
            ? mode === 'product-selection'
              ? t('categoriesCount', { count: selected.size })
              : t('itemsCount', { count: selected.size })
            : '\u00A0'}
        </span>
        <Button
          onClick={addSelected}
          disabled={disabled || selected.size === 0 || loading}
          className="text-accent bg-title hover:bg-accent-foreground w-full sm:w-auto"
          aria-describedby="selected-count"
        >
          {t('add')}
        </Button>
      </div>
    </div>
  );

  const Trigger = (
    <Button
      variant={'title'}
      disabled={disabled || loading}
      className={cn(isMobile && 'w-full')}
      aria-label={
        mode === 'product-selection' ? t('addCategory') : t('addSubcategories')
      }
    >
      {mode === 'product-selection' ? (
        <Plus className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Search className="h-4 w-4" aria-hidden="true" />
      )}
      {mode === 'product-selection' ? t('addCategory') : t('addSubcategories')}
    </Button>
  );

  return (
    <div className={className}>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
          <DrawerContent className="flex h-[85vh] flex-col">
            <DrawerHeader className="text-left">
              <DrawerTitle>
                {mode === 'product-selection'
                  ? t('addCategory')
                  : t('addSubcategories')}
              </DrawerTitle>
              <DrawerDescription>
                {t('addCategoryDescription')}
              </DrawerDescription>
              <Separator className="mt-4" />
            </DrawerHeader>
            <div className="flex h-full flex-col overflow-hidden px-4 pb-4">
              {Body}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>{Trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>
                {mode === 'product-selection'
                  ? t('addCategory')
                  : t('addSubcategories')}
              </DialogTitle>
              {t('addCategoryDescription')}
              <Separator className="mt-4" />
            </DialogHeader>
            {Body}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
