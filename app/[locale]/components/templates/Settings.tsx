import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import SettingsTabs from '@molecules/settings/SettingsTabs';
import type { SettingsTemplateProps } from '@lib/types/settings';
import { useTranslations } from 'next-intl';

export default function SettingsTemplate({ children }: SettingsTemplateProps) {
  const t = useTranslations('Dashboard');

  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('settings')}>
        <div className="p-page gap-section mx-auto flex w-full max-w-3xl flex-col">
          <SettingsTabs />
          {children}
        </div>
      </SidebarLayout>
    </>
  );
}
