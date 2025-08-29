'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@shadcn/ui/button';
import { categoryTree as DATA, type CategoryNode } from '@lib/data/categories';
import { useTranslations } from 'next-intl';

function TreeItem({
  node,
  level = 0,
  forcedOpen,
}: {
  node: CategoryNode;
  level?: number;
  forcedOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.children?.length;

  useEffect(() => {
    if (forcedOpen !== undefined) setOpen(forcedOpen);
  }, [forcedOpen]);

  return (
    <div className="select-none">
      <Button
        variant="ghost"
        size="sm"
        className="text-text w-full justify-start gap-2 py-1 text-left text-sm hover:bg-gray-100"
        onClick={() => hasChildren && setOpen((v) => !v)}
        aria-expanded={hasChildren ? open : undefined}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )
        ) : (
          <span className="inline-block h-4 w-4" />
        )}
        <span className={level ? 'pl-1' : ''}>{node.label}</span>
      </Button>

      {open && node.children && (
        <div className="pl-5">
          {node.children.map((child) => (
            <TreeItem
              key={child.label}
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

      {DATA.map((n) => (
        <TreeItem key={n.label} node={n} forcedOpen={allOpen} />
      ))}
    </div>
  );
}
