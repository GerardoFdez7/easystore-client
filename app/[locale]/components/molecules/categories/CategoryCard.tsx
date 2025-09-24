'use client';

import Image from 'next/image';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  name: string;
  cover: string;
  count?: number;
  href: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CategoryCard({
  name,
  cover,
  count = 0,
  href,
  onEdit,
  onDelete,
}: Props) {
  const t = useTranslations('Category');
  return (
    <div className="bg-card w-full rounded-lg p-2 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
        <Link
          href={href}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <Image
            alt={name}
            src={cover}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <Link
          href={href}
          className="text-text min-w-0 flex-1 truncate rounded text-sm font-medium hover:underline focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
          title={name}
        >
          {name}
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0 rounded-full"
          onClick={onEdit}
          aria-label="Edit category"
        >
          <Pencil className="text-text h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="-ml-3 shrink-0 rounded-full"
          onClick={onDelete}
          aria-label="Delete category"
        >
          <Trash className="text-text h-4 w-4" />
        </Button>
      </div>

      <p className="text-text mt-0.5 text-xs">
        {count} {t('categoryCount', { count })}
      </p>
    </div>
  );
}
