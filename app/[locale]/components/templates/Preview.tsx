// components/templates/Preview.tsx
import HeaderDashboard from '@organisms/shared/HeaderDashboard';
import SidebarLayout from '@organisms/shared/SidebarLayout';
import { RenderBuilderContent } from '../../../../components/builder';
import type { BuilderContent } from '@builder.io/sdk';
import { useTranslations } from 'next-intl';

export default function PreviewTemplate({
  content,
}: {
  content: BuilderContent | undefined;
}) {
  const t = useTranslations('Preview');
  return (
    <>
      <HeaderDashboard />
      <SidebarLayout title={t('preview')}>
        <RenderBuilderContent content={content} model="page" />
      </SidebarLayout>
    </>
  );
}
