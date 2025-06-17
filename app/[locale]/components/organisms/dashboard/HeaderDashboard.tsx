import { Bell, ShieldQuestionIcon } from "lucide-react";

import Logo from "@atoms/landing/Logo";
import MenuOwnerName from "@atoms/dashboard/MenuOwnerName";

export default function HeaderDashboard() {
  return (
    <header className="px-3 py-4 sm:h-25 sm:px-10 h-20">
      <div className="flex items-center justify-between">
        <Logo></Logo>
        <div className="flex items-center gap-4">
          <ShieldQuestionIcon className="w-5 h-5 text-foreground  hover:text-title" />
          <Bell className="w-5 h-5 text-foreground  hover:text-title" />
          <MenuOwnerName />
        </div>
      </div>
    </header>
  );
}
