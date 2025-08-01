import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import MainProducts from '@organisms/products/MainProducts';

export default function ProductsTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <MainProducts />
    </div>
  );
}
