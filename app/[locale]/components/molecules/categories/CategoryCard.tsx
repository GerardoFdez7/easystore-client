'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Card, CardTitle, CardDescription } from '@shadcn/ui/card';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipTrigger, TooltipContent } from '@shadcn/ui/tooltip';

type Props = {
  name: string;
  cover: string;
  count?: number;
  href: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CategoryCard({
  name,
  cover,
  count = 0,
  href,
  onClick,
  onEdit,
  onDelete,
}: Props) {
  const t = useTranslations('Category');

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card className="m-0 flex flex-col gap-0 p-0">
      <Link
        href={href}
        onClick={handleClick}
        className="group relative block aspect-square w-full overflow-hidden focus-visible:ring-2 focus-visible:outline-none"
      >
        <Image alt={name} src={cover} fill className="object-cover" />
      </Link>
      <Link
        href={href}
        onClick={handleClick}
        className="mt-4 flex flex-col px-4"
      >
        <CardTitle>{name}</CardTitle>
        <CardDescription className="mt-0.5">
          {count} {t('categoryCount', { count })}
        </CardDescription>
      </Link>
      <div className="flex items-center justify-between px-4 py-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              aria-label={t('delete')}
            >
              <Trash className="text-error h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t('delete')}</TooltipContent>
        </Tooltip>
        <Button
          variant="ghost"
          onClick={onEdit}
          aria-label={t('edit')}
          className="text-text"
        >
          <Pencil className="text-text h-4 w-4" />
          {t('edit')}
        </Button>
      </div>
    </Card>
  );
}
