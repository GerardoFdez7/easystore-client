'use client';

import { useState, ComponentProps } from 'react';
import {
  Package,
  Users,
  LayoutDashboard,
  Settings,
  Wallpaper,
  // Gift,
  // BookUser,
  ClipboardList,
  Warehouse,
  Dices,
  ChevronLeft,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@shadcn/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@shadcn/ui/collapsible';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';

export default function Sidebar(props: ComponentProps<typeof ShadcnSidebar>) {
  const t = useTranslations('Dashboard');
  const [openProducts, setOpenProducts] = useState(false);
  const { state, setOpen } = useSidebar();

  const handleExpand = () => {
    if (state === 'collapsed') {
      setOpen(true);
      setOpenProducts(true);
      return true;
    }
    return false;
  };

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
        <SidebarMenu className="gap-2 px-2">
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<LayoutDashboard className="text-title" />}
              label={t('dashboard')}
              route="dashboard"
            />
          </SidebarMenuItem>

          <Collapsible
            open={openProducts}
            onOpenChange={setOpenProducts}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <div className="flex items-center gap-2">
                <ButtonSidebar
                  icon={<Package className="text-title" />}
                  label={t('products')}
                  route="products"
                  expandOnClick={true}
                  onExpandClick={handleExpand}
                />
                <CollapsibleTrigger asChild>
                  <Button
                    aria-label={
                      openProducts ? 'hide categories' : 'show categories'
                    }
                    variant={'ghost'}
                    className="ml-auto group-data-[collapsible=icon]:hidden"
                  >
                    <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:-rotate-90" />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <ButtonSidebar
                      icon={<Dices className="text-title" />}
                      label={t('categories')}
                      route="categories"
                    />
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Warehouse className="text-title" />}
              label={t('inventory')}
              route="inventory"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<ClipboardList />}
              label={t('orders')}
              route="orders"
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Users className="text-title" />}
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
                icon={<BookUser />}
                label={t('employees')}
                route="employees"
              />
            </SidebarMenuItem> */}
          <SidebarMenuItem>
            <ButtonSidebar
              icon={<Wallpaper className="text-title" />}
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
              icon={<Settings className="text-title" />}
              label={t('settings')}
              route="settings"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
