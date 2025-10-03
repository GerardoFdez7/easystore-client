'use client';

import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { useCategoriesTree, CategoryTreeNode } from '@hooks/domains/category';

function TreeItem({
  node,
  level = 0,
  forcedOpen,
}: {
  node: CategoryTreeNode;
  level?: number;
  forcedOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.subCategories?.length;

  useEffect(() => {
    if (forcedOpen !== undefined) setOpen(forcedOpen);
  }, [forcedOpen]);

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="text-text hover:bg-hover w-full justify-start gap-2 py-1 text-left"
        onClick={() => hasChildren && setOpen((v) => !v)}
        aria-expanded={hasChildren ? open : undefined}
      >
        {hasChildren ? (
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          />
        ) : (
          <span className="inline-block h-4 w-4" />
        )}
        <span className={level ? 'pl-1' : ''}>{node.name}</span>
      </Button>

      {open && hasChildren && (
        <div className="pl-5">
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
}

export default function CategoryTree() {
  const [allOpen, setAllOpen] = useState(false);
  const t = useTranslations('Category');

  const { categories: nodes, loading, error } = useCategoriesTree();

  const handleToggleAll = () => setAllOpen((v) => !v);

  return (
    <div className="rounded-lg p-4">
      <div className="-mt-4 mb-2 flex items-center justify-items-start">
        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleAll}
          aria-pressed={allOpen}
        >
          {allOpen ? t('collapseAll') : t('expandAll')}
        </Button>
      </div>

      {loading && (
        <div className="space-y-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="bg-muted h-7 animate-pulse rounded"
            />
          ))}
        </div>
      )}
      {!loading &&
        !error &&
        nodes.map((n) => <TreeItem key={n.id} node={n} forcedOpen={allOpen} />)}
    </div>
  );
}
