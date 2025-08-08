'use client';

import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { Button } from '@shadcn/ui/button';

type Props = {
  name: string;
  imageUrl: string;
  count?: number;
  onEdit?: () => void;
};

export default function CategoryCard({
  name,
  imageUrl,
  count = 0,
  onEdit,
}: Props) {
  return (
    <div className="w-full rounded-lg bg-white p-2 shadow-sm ring-1 ring-gray-200">
      {/* Imagen con relación 4:3 para consistencia */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
        <Image
          alt={name}
          src={imageUrl}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#423f3d]">
          {name}
        </p>
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0 rounded-full"
          onClick={onEdit}
          aria-label="Edit category"
        >
          <Pencil className="h-4 w-4 text-[#423f3d]" />
        </Button>
      </div>

      <p className="mt-0.5 text-xs text-[#94a3b8]">{count} categories</p>
    </div>
  );
}
