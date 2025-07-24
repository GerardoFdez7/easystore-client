'use client';

import { Sidebar } from '@organisms/profile/Sidebar';
import { EditableField } from '@molecules/profile/EditableField';
import { Button } from '@shadcn/ui/button';
import SocialAuthButtons from '@molecules/shared/SocialAuthButtons';
import { Label } from '@shadcn/ui/label';

export default function MainProfile() {
  return (
    <div className="flex min-h-screen justify-center bg-[#f3f4f6] px-4 pt-20 md:px-8 lg:px-16">
      <div className="flex w-full max-w-[1200px] flex-col gap-6 md:flex-row">
        <Sidebar />

        <main className="max-w-[700px] flex-1 p-4 md:p-8">
          <EditableField label="Domain" value="wolvesclub.easystore.com" />
          <EditableField label="Phone (optional)" value="" />
          <EditableField label="Email" value="" />

          {/* Password Section */}
          <div className="mb-8">
            <Label className="mb-4 block font-medium text-[#423f3d]">
              Password
            </Label>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm text-[#64748b]">
                You changed your password 4 months ago
              </p>
              <Button
                variant="outline"
                className="w-full border-[#423f3d] text-[#423f3d] hover:bg-[#423f3d] hover:text-white"
              >
                Change password
              </Button>
            </div>
          </div>

          {/* Plan Section */}
          <div className="mb-8">
            <Label className="mb-4 block font-medium text-[#423f3d]">
              Plan
            </Label>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="mb-4 text-sm text-[#64748b]">Plan Basic</p>
              <Button
                variant="outline"
                className="w-full border-[#423f3d] text-[#423f3d] hover:bg-[#423f3d] hover:text-white"
              >
                Change plan
              </Button>
            </div>
          </div>

          <SocialAuthButtons />
        </main>
      </div>
    </div>
  );
}
