import { SiteHeader } from '@atoms/shared/SiteHeader';
import { SidebarInset, SidebarProvider } from '@shadcn/ui/sidebar';
import Sidebar from '@organisms/shared/Sidebar';
import { ReactNode } from 'react';

interface SidebarLayoutProps {
  children: ReactNode;
  title: string;
}

export default function SidebarLayout({ children, title }: SidebarLayoutProps) {
  return (
    <div className="pt-22 2xl:m-5">
      <SidebarProvider
        defaultOpen={false}
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
