'use client';

import { useEffect, useState, ComponentProps } from 'react';
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
  Pin,
  PinOff,
} from 'lucide-react';
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
import OwnerLogo from '@atoms/dashboard/OwnerLogo';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import { useTranslations } from 'next-intl';
import { useStoreInfo } from '@hooks/domains/store/useStoreInfo';
import { usePinnedSidebar } from '@hooks/utils/usePinnedSidebar';

export default function Sidebar(props: ComponentProps<typeof ShadcnSidebar>) {
  const t = useTranslations('Dashboard');
  const [openProducts, setOpenProducts] = useState(false);
  const { state, setOpen } = useSidebar();
  const { store } = useStoreInfo();
  const { pinned, setPinned } = usePinnedSidebar();

  // Pinned keeps the sidebar expanded; otherwise it keeps the default collapsed state.
  useEffect(() => {
    if (pinned) setOpen(true);
  }, [pinned, setOpen]);

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
      <SidebarHeader className="relative mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-pressed={pinned}
              aria-label={pinned ? t('sidebarUnpin') : t('sidebarPin')}
              onClick={() => setPinned(!pinned)}
              className="absolute top-0 right-2 size-8 group-data-[collapsible=icon]:hidden"
            >
              {pinned ? (
                <PinOff className="text-title size-4" />
              ) : (
                <Pin className="text-title size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {pinned ? t('sidebarUnpin') : t('sidebarPin')}
          </TooltipContent>
        </Tooltip>
        {store?.logo && <OwnerLogo logo={store.logo} />}
        <h3 className="text-title w-full text-center font-semibold group-data-[collapsible=icon]:hidden">
          {store?.name || ''}
        </h3>
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
            asChild
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
