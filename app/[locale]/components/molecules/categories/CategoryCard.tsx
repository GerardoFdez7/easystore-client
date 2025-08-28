'use client';

import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  name: string;
  imageUrl: string;
  count?: number;
  href: string;
  onEdit?: () => void;
};

export default function CategoryCard({
  name,
  imageUrl,
  count = 0,
  href,
  onEdit,
}: Props) {
  const t = useTranslations('Category');
  return (
    <div className="w-full rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
        <Link
          href={href}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
        >
          <Image
            alt={name}
            src={imageUrl}
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
      </div>

      <p className="text-text mt-0.5 text-xs">
        {count} {t('categoryCount', { count })}
      </p>
    </div>
  );
}
