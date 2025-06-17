import { Button } from "@shadcn/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "utils";

type SidebarButtonProps = {
  icon: ReactNode;
  label: string;
  variant?: "default" | "ghost";
  className?: string;
  route: string;
};

export default function ButtonSidebar({
  icon,
  label,
  route,
  variant = "ghost",
  className = "",
}: SidebarButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split("/"); 
  const basePath = pathParts.slice(0, -1).join("/") || "";

  const fullPath = `${basePath}/${route}`;

  const isSelected = pathname === fullPath;

  return (
    <Button
      variant={variant}
      onClick={() => router.push(fullPath)}
      className={cn(
        "w-full justify-start",
        isSelected
          ? "bg-title text-white hover:bg-title hover:text-white"
          : "text-foreground hover:text-title hover:bg-[#d7d7d7]",
        className
      )}
    >
      <span className="w-4 h-4 mr-3">{icon}</span>
      {label}
    </Button>
  );
}
