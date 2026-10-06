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
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import SingleImagePreview from '@atoms/shared/SingleImagePreview';
import SingleMediaUploader from '@molecules/shared/SingleMediaUploader';
import StoreProfileDialog from '@organisms/shared/StoreProfileDialog';
import { useStoreInfo } from '@hooks/domains/store/useStoreInfo';
import { useUpdateStore } from '@hooks/domains/store/useUpdateStore';
import {
  DefaultAcceptedFileTypes,
  DefaultMaxImageSize,
  DefaultVideoSize,
} from '@lib/consts/media-uploader';
import type { ProcessedData } from '@lib/types/media';
import { usePinnedSidebar } from '@hooks/utils/usePinnedSidebar';

const LOGO_FILE_TYPES = DefaultAcceptedFileTypes.filter((type) =>
  type.startsWith('image/'),
);

export default function Sidebar(props: ComponentProps<typeof ShadcnSidebar>) {
  const t = useTranslations('Dashboard');
  const tStore = useTranslations('StoreProfile');
  const [openProducts, setOpenProducts] = useState(false);
  const { state, setOpen } = useSidebar();
  const { store } = useStoreInfo();
  const { pinned, setPinned } = usePinnedSidebar();
  const { updateStore } = useUpdateStore();

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

  // Saves the first logo as soon as it is uploaded; the store then has a logo.
  const handleLogoProcessed = async (data?: ProcessedData | null) => {
    if (!data?.cover) return;
    const { store: saved } = await updateStore({ logo: data.cover });
    if (saved) toast.success(tStore('logoUpdated'));
  };

  return (
    <ShadcnSidebar className="mt-20 h-auto" collapsible="icon" {...props}>
      <SidebarHeader>
        {store && (
          <div className="group-data-[collapsible=icon]:hidden">
            {store.logo ? (
              <SingleImagePreview imageUrl={store.logo} viewOnly transparent />
            ) : (
              <SingleMediaUploader
                alwaysEditing
                dropZoneTitle={tStore('uploadLogo')}
                transparentPreview
                hideFormatHint
                onMediaProcessed={handleLogoProcessed}
                onUploadError={(message) => toast.error(message)}
                acceptedFileTypes={LOGO_FILE_TYPES}
                maxImageSize={DefaultMaxImageSize}
                maxVideoSize={DefaultVideoSize}
                className="[&>div]:space-y-2!"
              />
            )}
          </div>
        )}
        <div className="group-data-[collapsible=icon]:hidden">
          {store ? (
            <StoreProfileDialog store={store}>
              <Button
                variant="outline"
                aria-label={tStore('editStore')}
                className="w-full font-semibold"
              >
                <span className="truncate">
                  {store.name || tStore('defaultName')}
                </span>
              </Button>
            </StoreProfileDialog>
          ) : null}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="gap-2 px-2 pt-2">
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
            <div className="flex items-center gap-2">
              <ButtonSidebar
                icon={<Settings className="text-title" />}
                label={t('settings')}
                route="settings"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    data-sidebar-pin
                    aria-pressed={pinned}
                    aria-label={pinned ? t('sidebarUnpin') : t('sidebarPin')}
                    onClick={() => setPinned(!pinned)}
                    className="group-data-[collapsible=icon]:hidden"
                  >
                    {pinned ? (
                      <PinOff className="text-title size-6" />
                    ) : (
                      <Pin className="text-title size-6" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {pinned ? t('sidebarUnpin') : t('sidebarPin')}
                </TooltipContent>
              </Tooltip>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
