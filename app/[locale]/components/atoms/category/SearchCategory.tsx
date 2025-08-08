'use client';

import { Input } from '@shadcn/ui/input';

export default function SearchCategory() {
  return (
    <Input
      placeholder="Search category"
      className="w-full max-w-md border border-gray-300 bg-white text-sm text-[#423f3d]"
    />
  );
}
