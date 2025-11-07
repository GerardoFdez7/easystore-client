'use client';

import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { useCategoriesTree, CategoryTreeNode } from '@hooks/domains/category';
import { nameToSlug } from '@lib/utils/path-utils';
import { Button } from '@shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@shadcn/ui/sheet';

interface TreeItemProps {
  node: CategoryTreeNode;
  level?: number;
  forcedOpen?: boolean;
}

const TreeItem = memo(function TreeItem({
  node,
  level = 0,
  forcedOpen,
}: TreeItemProps) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.subCategories?.length;
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;

  useEffect(() => {
    if (forcedOpen !== undefined) setOpen(forcedOpen);
  }, [forcedOpen]);

  const handleToggleExpand = useCallback(() => {
    if (hasChildren) {
      setOpen((v) => !v);
    }
  }, [hasChildren]);

  const handleCategoryClick = useCallback(() => {
    const categorySlug = nameToSlug(node.name);
    const href = locale
      ? `/${locale}/categories/${categorySlug}`
      : `/categories/${categorySlug}`;
    router.push(href);
  }, [node.name, locale, router]);

  const paddingLeft = useMemo(() => (level ? 'pl-1' : ''), [level]);

  return (
    <div
      role="treeitem"
      aria-expanded={hasChildren ? open : undefined}
      aria-selected={false}
    >
      <div className="flex w-full items-center">
        <Button
          variant="ghost"
          size="sm"
          className={`text-text shrink-0 justify-start gap-2 py-1 ${
            hasChildren ? 'hover:bg-hover cursor-pointer' : 'cursor-default'
          }`}
          onClick={handleToggleExpand}
          aria-expanded={hasChildren ? open : undefined}
          aria-label={
            hasChildren
              ? open
                ? 'Collapse category'
                : 'Expand category'
              : undefined
          }
          disabled={!hasChildren}
          type="button"
        >
          {hasChildren ? (
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
              aria-hidden="true"
            />
          ) : (
            <span className="inline-block h-4 w-4" aria-hidden="true" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-text hover:bg-hover flex-1 justify-start py-1 text-left"
          onClick={handleCategoryClick}
          aria-label={`Navigate to ${node.name} category`}
          type="button"
        >
          <span className={paddingLeft}>{node.name}</span>
        </Button>
      </div>

      {open && hasChildren && (
        <div className="pl-5" role="group">
          {(node.subCategories ?? []).map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              forcedOpen={forcedOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
});

interface CategoryTreeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryTree({
  open,
  onOpenChange,
}: CategoryTreeProps) {
  const [allOpen, setAllOpen] = useState(true);
  const t = useTranslations('Category');

  const { categories: nodes, loading, error } = useCategoriesTree();

  const handleToggleAll = useCallback(() => {
    setAllOpen((v) => !v);
  }, []);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="flex h-full flex-col"
        role="dialog"
        aria-labelledby="category-tree-title"
        aria-describedby="category-tree-description"
      >
        <SheetHeader className="shrink-0">
          <SheetTitle
            id="category-tree-title"
            data-tour="categories-tree-title"
          >
            {t('categoryTree')}
          </SheetTitle>
          <SheetDescription id="category-tree-description">
            {t('categoryTreeDescription')}
          </SheetDescription>
        </SheetHeader>
        <div className="ml-4 flex-1 overflow-y-auto pb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleAll}
            aria-pressed={allOpen}
            aria-label={allOpen ? t('collapseAll') : t('expandAll')}
            type="button"
            className="mb-4"
            data-tour="categories-tree-toggle-all"
          >
            {allOpen ? t('collapseAll') : t('expandAll')}
          </Button>

          {!loading && !error && (
            <nav
              role="tree"
              aria-label="category Navigation"
              className="space-y-1"
            >
              {nodes.map((n) => (
                <TreeItem key={n.id} node={n} forcedOpen={allOpen} />
              ))}
            </nav>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
