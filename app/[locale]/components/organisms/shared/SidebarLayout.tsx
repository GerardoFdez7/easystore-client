'use client';

import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import Sidebar from '@organisms/shared/Sidebar';
import { usePinnedSidebar } from '@hooks/utils/usePinnedSidebar';
import { ReactNode } from 'react';

interface SidebarLayoutProps {
  children: ReactNode;
  title: string;
}

export default function SidebarLayout({ children, title }: SidebarLayoutProps) {
  // Read the pinned preference before first paint so the sidebar mounts already
  // expanded instead of collapsed-then-animating open on every navigation.
  const { pinned } = usePinnedSidebar();

  return (
    <div className="pt-22 2xl:m-5">
      <SidebarProvider
        defaultOpen={pinned}
        style={
          {
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <Sidebar />
        <SidebarInset>
          <SiteHeader title={title} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="gap-section py-section flex flex-col">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
