import HeaderDashboard from '@organisms/dashboard/HeaderDashboard';
import MainDashboard from '@organisms/dashboard/MainDashboard';

export default function DashboardTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <MainDashboard />
    </div>
  );
}
