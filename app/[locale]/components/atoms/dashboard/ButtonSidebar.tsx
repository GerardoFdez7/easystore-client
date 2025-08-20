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
};

export default function ButtonSidebar({
  icon,
  label,
  route,
  variant = 'default',
  className = '',
}: SidebarButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split('/');
  const basePath = pathParts.slice(0, -1).join('/') || '';

  const fullPath = `${basePath}/${route}`;

  const isSelected = pathname === fullPath;

  return (
    <SidebarMenuButton
      variant={variant}
      isActive={isSelected}
      tooltip={label}
      onClick={() => router.push(fullPath)}
      className={cn(
        'h-12 w-full cursor-pointer justify-start text-base',
        className,
      )}
    >
      <div className="flex h-7 w-7 items-center justify-center [&>svg]:h-7 [&>svg]:w-7">
        {icon}
      </div>
      <span className="text-base font-medium">{label}</span>
    </SidebarMenuButton>
  );
}
