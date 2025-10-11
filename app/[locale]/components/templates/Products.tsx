import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import MainProducts from '@organisms/products/MainProducts';
import { useTranslations } from 'next-intl';
import SidebarLayout from '@organisms/shared/SidebarLayout';

export default function ProductsTemplate() {
  const t = useTranslations('Products');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('products')}>
        <MainProducts />
      </SidebarLayout>
    </div>
  );
}
