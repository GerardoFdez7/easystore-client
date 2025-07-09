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
import OwnerLogo from '@atoms/dashboard/OwnerLogo';
import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@shadcn/ui/sidebar';
import { useTranslations } from 'next-intl';

export function SiderbarDashboard({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('Dashboard');

  return (
    <Sidebar className="mt-20 h-auto" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="mb-2">
          <OwnerLogo />
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
              label={t('dashboard')}
              route="dashboard"
            />
            <ButtonSidebar
              icon={<Package />}
              label={t('orders')}
              route="orders"
            />
            <ButtonSidebar
              icon={<Archive />}
              label={t('products')}
              route="products"
            />
            <ButtonSidebar
              icon={<Users />}
              label={t('customers')}
              route="customers"
            />
            <ButtonSidebar
              icon={<Gift />}
              label={t('promotions')}
              route="promotions"
            />
            <ButtonSidebar
              icon={<UserCheck />}
              label={t('employees')}
              route="employees"
            />
            <ButtonSidebar
              icon={<Eye />}
              label={t('preview')}
              route="preview"
            />
          </nav>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4">
          <ButtonSidebar
            icon={<Settings />}
            label={t('settings')}
            route="settings"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
