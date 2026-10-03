import MainProductDetail from '@organisms/products/product-detail/MainProductDetail';
import { useTranslations } from 'next-intl';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';

interface ProductDetailTemplateProps {
  param?: string;
  isNew: boolean;
}
export default function ProductDetailTemplate({
  param,
  isNew,
}: ProductDetailTemplateProps) {
  const t = useTranslations('Products');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('productDetailTitle')}>
        <MainProductDetail param={param ?? ''} isNew={isNew} />
      </SidebarLayout>
    </div>
  );
}
