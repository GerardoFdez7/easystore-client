import MainProductDetail from '@organisms/product-detail/MainProductDetail';
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
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title="Product Detail">
        <MainProductDetail param={param ?? ''} isNew={isNew} />
      </SidebarLayout>
    </div>
  );
}
