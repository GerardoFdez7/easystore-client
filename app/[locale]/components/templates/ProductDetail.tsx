import MainProductDetail from '@organisms/product-detail/MainProductDetail';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';

export default function ProductDetailTemplate() {
  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title="Product Detail">
        <MainProductDetail />
      </SidebarLayout>
    </>
  );
}
