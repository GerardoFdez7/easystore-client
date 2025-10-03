'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { cn } from 'utils';
import { SidebarMenuButton } from '@shadcn/ui/sidebar';

type SidebarButtonProps = {
  icon: ReactNode;
  label: string;
  variant?: 'default' | 'outline';
  className?: string;
  route: string;
  expandOnClick?: boolean;
  onExpandClick?: () => void;
};

export default function ButtonSidebar({
  icon,
  label,
  route,
  variant = 'default',
  className = '',
  expandOnClick = false,
  onExpandClick,
}: SidebarButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Get the locale from the path (first segment after the domain)
  const locale = pathname.split('/')[1];
  // Create the full path by combining the locale with the route
  const fullPath = `/${locale}${route.startsWith('/') ? '' : '/'}${route}`;

  const handleClick = () => {
    if (expandOnClick && onExpandClick) {
      onExpandClick();
    } else {
      router.push(fullPath);
    }
  };

  const isSelected = pathname === fullPath;

  return (
    <SidebarMenuButton
      variant={variant}
      isActive={isSelected}
      tooltip={label}
      onClick={handleClick}
      className={cn(
        'text-text h-12 w-full cursor-pointer justify-start',
        isSelected
          ? 'dark:!bg-hover dark:hover:!bg-hover !bg-[#d7d7d7] hover:!bg-[#d7d7d7]'
          : 'text-foreground hover:text-title dark:hover:bg-hover hover:bg-[#d7d7d7]',
        className,
      )}
    >
      <div className="text-tile flex items-center justify-center [&>svg]:h-6 [&>svg]:w-6 lg:[&>svg]:h-6 lg:[&>svg]:w-6">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </SidebarMenuButton>
  );
}
