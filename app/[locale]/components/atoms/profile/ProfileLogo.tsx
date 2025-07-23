import { Edit2 } from 'lucide-react';

export function ProfileLogo() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#423f3d]">
            <span className="text-xs font-bold text-white">
              WOLVES
              <br />
              CLUB
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-[#423f3d]">Wolves Club</span>
        <Edit2 className="h-4 w-4 cursor-pointer text-[#10b981]" />
      </div>
    </div>
  );
}
