import HeaderVariant from '@organisms/variant/HeaderVariant';
import MainVariant from '@organisms/variant/MainVariant';

export default function VariantTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderVariant />
      <MainVariant />
    </div>
  );
}
