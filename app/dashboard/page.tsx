import { AppSidebar } from "app/[locale]/components/shadcn/app-sidebar"
import { ChartAreaInteractive } from "app/[locale]/components/shadcn/chart-area-interactive"
import { DataTable } from "app/[locale]/components/shadcn/data-table"
import { SectionCards } from "app/[locale]/components/shadcn/section-cards"
import { SiteHeader } from "@molecules/dashboard/SiteHeader"
import {
  SidebarInset,
  SidebarProvider,
} from "app/[locale]/components/shadcn/ui/sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
