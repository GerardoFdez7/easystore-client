import MainVariant from '@organisms/products/variant/MainVariant';
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { useTranslations } from 'next-intl';
import BackButton from '@atoms/shared/BackButton';

interface VariantTemplateProps {
  productId: string;
  variantId?: string;
  isNew: boolean;
  isNewProduct?: boolean;
}

export default function VariantTemplate({
  productId,
  variantId,
  isNew,
  isNewProduct = false,
}: VariantTemplateProps) {
  const t = useTranslations('Variant');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <SidebarLayout title={t('welcomeVariant')}>
        <BackButton />
        <MainVariant
          productId={productId}
          variantId={variantId}
          isNew={isNew}
          isNewProduct={isNewProduct}
        />
      </SidebarLayout>
    </div>
  );
}
