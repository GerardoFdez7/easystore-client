'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Card, CardTitle, CardDescription } from '@shadcn/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent } from '@shadcn/ui/tooltip';

interface CategoryCardProps {
  name: string;
  cover: string;
  count?: number;
  href: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  hideCount?: boolean;
}

export default function CategoryCard({
  name,
  cover,
  count = 0,
  href,
  onClick,
  onEdit,
  onDelete,
  hideCount = false,
}: CategoryCardProps) {
  const t = useTranslations('Category');

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onEdit?.();
    },
    [onEdit],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDelete?.();
    },
    [onDelete],
  );

  return (
    <article className="group">
      <Card className="m-0 flex h-70 w-70 flex-col gap-0 p-0 transition-transform hover:scale-105">
        <Link
          href={href}
          onClick={handleClick}
          className="group relative block aspect-square w-full overflow-hidden rounded-t-lg focus-visible:ring-2 focus-visible:outline-none"
          aria-label="view Category"
        >
          <Image
            alt="category Image"
            src={cover}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="(max-width: 640px) 280px, 320px"
            priority={false}
          />
        </Link>

        <div className="flex flex-1 flex-col justify-between">
          <Link
            href={href}
            onClick={handleClick}
            className="mt-4 flex flex-col rounded px-4 focus-visible:ring-2 focus-visible:outline-none"
            aria-label="view Category Details"
          >
            <CardTitle className="line-clamp-2 text-sm sm:text-base">
              {name}
            </CardTitle>
            {!hideCount && (
              <CardDescription className="mt-0.5 text-xs sm:text-sm">
                {count} {t('categoryCount', { count })}
              </CardDescription>
            )}
          </Link>

          <div className="mt-2 flex items-center justify-between px-4 py-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleDelete}
                  aria-label={t('delete', { category: name })}
                >
                  <Trash className="text-error h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t('delete', { category: name })}
              </TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              onClick={handleEdit}
              aria-label={t('edit', { category: name })}
              className="text-text"
              size="sm"
            >
              <Pencil className="text-text mr-1 h-4 w-4" />
              <span>{t('edit')}</span>
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}
