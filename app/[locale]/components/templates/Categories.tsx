import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import MainCategory from '@organisms/categories/MainCategory';

export default function CategoryTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <MainCategory />
    </div>
  );
}
