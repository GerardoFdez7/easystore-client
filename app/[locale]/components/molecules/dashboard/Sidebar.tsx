'use client';

import * as React from 'react';
import {
  Package,
  Users,
  BarChart3,
  Settings,
  Eye,
  Gift,
  UserCheck,
  Archive,
} from 'lucide-react';
import ImageDashboard from '@atoms/dashboard/ImageDashboard';
import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@shadcn/ui/sidebar';

export function SiderbarDashboard({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="mt-20 h-auto" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="mb-2">
          <ImageDashboard />
          <h3 className="text-title w-full text-center font-semibold">
            COMPANY NAME
          </h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex h-full flex-col px-6 py-2">
          <nav className="space-y-2">
            <ButtonSidebar
              icon={<BarChart3 />}
              label="Dashboard"
              route="dashboard"
            />
            <ButtonSidebar icon={<Package />} label="Orders" route="orders" />
            <ButtonSidebar
              icon={<Archive />}
              label="Products"
              route="products"
            />
            <ButtonSidebar
              icon={<Users />}
              label="Customers"
              route="customers"
            />
            <ButtonSidebar
              icon={<Gift />}
              label="Promotions"
              route="promotions"
            />
            <ButtonSidebar
              icon={<UserCheck />}
              label="Employees"
              route="employees"
            />
            <ButtonSidebar icon={<Eye />} label="Preview" route="preview" />
          </nav>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4">
          <ButtonSidebar
            icon={<Settings />}
            label="Settings"
            route="settings"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
