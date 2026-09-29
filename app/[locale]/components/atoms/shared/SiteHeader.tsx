import { Separator } from '@shadcn/ui/separator';
import { SidebarTrigger } from '@shadcn/ui/sidebar';

interface SiteHeaderProps {
  title: string;
}

export function SiteHeader({ title }: SiteHeaderProps) {
  return (
    <header className="transition-header-size flex h-(--header-height) shrink-0 items-center gap-2 border-b ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="ml-2 flex w-full items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="text-title mx-2 data-[orientation=vertical]:h-6"
        />
        <h1 className="text-text text-xl font-medium sm:text-2xl">{title}</h1>
      </div>
    </header>
  );
}
