import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import MainBilling from '@organisms/billing/MainBilling';
import { useTranslations } from 'next-intl';

export default function BillingTemplate() {
  const t = useTranslations('Billing');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('title')}>
        <MainBilling />
      </SidebarLayout>
    </>
  );
}
