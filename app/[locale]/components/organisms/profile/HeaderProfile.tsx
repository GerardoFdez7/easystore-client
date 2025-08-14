'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeaderProfile() {
  const router = useRouter();
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center bg-[#f3f4f6] px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/5"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
    </header>
  );
}
