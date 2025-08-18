import MainVariant from '@organisms/variant/MainVariant';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';

export default function VariantTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <MainVariant />
    </div>
  );
}
