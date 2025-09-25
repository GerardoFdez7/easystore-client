import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainStockMovement from '@organisms/inventory/stock-movement/MainStockMovement';

export default function StockMovementTemplate() {
  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title="Stock Movement History">
        <MainStockMovement />
      </SidebarLayout>
    </>
  );
}
