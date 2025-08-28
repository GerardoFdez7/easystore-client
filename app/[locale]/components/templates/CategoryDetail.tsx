import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import MainDetailCategory from '@organisms/detail-category/MainDetailCategory';

export default function CategoryDetail({ id }: { id: string }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <MainDetailCategory id={id} />
    </div>
  );
}
