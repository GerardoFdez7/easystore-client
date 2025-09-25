import MainStockDetail from '@organisms/stock-detail/MainStockDetail';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';

export default function StockDetailTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title="Stock Detail">
        <MainStockDetail />
      </SidebarLayout>
    </div>
  );
}
