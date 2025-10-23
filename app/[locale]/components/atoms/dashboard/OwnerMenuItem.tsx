'use client';

import { DropdownMenuItem } from '@shadcn/ui/dropdown-menu';
import { LucideIcon } from 'lucide-react';

interface OwnerMenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  onSelect?: (event: Event) => void;
  className?: string;
}

export default function OwnerMenuItem({
  icon: Icon,
  label,
  onClick,
  onSelect,
  className = 'cursor-pointer sm:text-base',
}: OwnerMenuItemProps) {
  return (
    <DropdownMenuItem
      className={className}
      onClick={onClick}
      onSelect={onSelect}
    >
      <Icon className="h-4 w-4" />
      {label}
    </DropdownMenuItem>
  );
}
