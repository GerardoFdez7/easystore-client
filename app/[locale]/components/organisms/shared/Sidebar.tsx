import React from 'react';
import {
  Package,
  Users,
  BarChart3,
  Settings,
  Eye,
  // Gift,
  // UserCheck,
  Archive,
} from 'lucide-react';
import OwnerLogo from '@atoms/dashboard/OwnerLogo';
import ButtonSidebar from '@atoms/dashboard/ButtonSidebar';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@shadcn/ui/sidebar';
import { useTranslations } from 'next-intl';

export default function Sidebar({
  ...props
}: React.ComponentProps<typeof ShadcnSidebar>) {
  const t = useTranslations('Dashboard');

  return (
    <ShadcnSidebar className="mt-20 h-auto" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="mb-2">
          <OwnerLogo />
          <h3 className="text-title w-full text-center font-semibold group-data-[collapsible=icon]:hidden">
            COMPANY NAME
          </h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-3 px-2">
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<BarChart3 />}
              label={t('dashboard')}
              route="dashboard"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Archive />}
              label={t('products')}
              route="products"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Package />}
              label={t('orders')}
              route="orders"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Users />}
              label={t('customers')}
              route="customers"
            />
          </SidebarMenuItem>
          {/* <SidebarMenuItem>
              <ButtonSidebar
                icon={<Gift />}
                label={t('promotions')}
                route="promotions"
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <ButtonSidebar
                icon={<UserCheck />}
                label={t('employees')}
                route="employees"
              />
            </SidebarMenuItem> */}
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Eye />}
              label={t('preview')}
              route="preview"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Settings />}
              label={t('settings')}
              route="settings"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
