'use client';

import Image from 'next/image';
import { Pencil } from 'lucide-react';

export default function CategoryCard() {
  return (
    <div className="relative flex w-36 flex-col items-center gap-1 text-center">
      <div className="h-36 w-36 overflow-hidden rounded-md bg-gray-100">
        <Image
          src="/placeholder.jpg"
          alt="Category"
          width={144}
          height={144}
          className="object-cover"
        />
      </div>
      <p className="text-sm font-medium text-[#423f3d]">Tecnología</p>
      <span className="text-xs text-gray-500">10 categories</span>
      <button className="absolute right-2 bottom-2 rounded-full bg-white p-1 shadow hover:bg-gray-100">
        <Pencil className="h-4 w-4 text-[#423f3d]" />
      </button>
    </div>
  );
}
