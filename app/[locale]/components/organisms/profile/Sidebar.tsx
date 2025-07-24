'use client';

import { ArrowLeft, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProfileLogo } from '@atoms/profile/ProfileLogo';
import { DescriptionEditor } from '@molecules/profile/DescriptionEditor';

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[320px] shrink-0 border-r border-gray-200 bg-white px-6 pt-4 pb-6">
      <div className="mt-6 mb-8">
        <ArrowLeft
          className="mb-6 h-6 w-6 cursor-pointer text-[#423f3d]"
          onClick={() => router.back()}
        />
      </div>

      <ProfileLogo />
      <DescriptionEditor />

      <div className="mb-8 text-center">
        <h3 className="mb-2 font-medium text-[#423f3d]">Store Profile</h3>
        <p className="text-sm leading-relaxed text-[#64748b]">
          Customers will see your store&apos;s logo, name, and description when
          they visit your main profile. Make sure everything is up to date.
        </p>
      </div>

      <div className="flex cursor-pointer items-center gap-2 text-[#423f3d]">
        <LogOut className="h-4 w-4" />
        <span className="font-medium">Log out</span>
      </div>
    </div>
  );
}
