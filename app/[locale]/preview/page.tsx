export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { builder } from '@builder.io/sdk';
import PreviewTemplate from '@templates/Preview';

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';
if (apiKey) {
  builder.init(apiKey);
}

interface PreviewPageProps {
  params: { locale: string };
  searchParams: { model?: string; entry?: string };
}

export default async function PreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const locale = params?.locale || 'es';
  const model = searchParams.model || 'page';

  if (searchParams.entry) {
    const contentByEntry = await builder
      .get(model, { entry: searchParams.entry, preview: true })
      .toPromise();

    return <PreviewTemplate content={contentByEntry} />;
  }

  const byLocale = await builder
    .get(model, {
      userAttributes: { urlPath: `/${locale}/preview` },
      preview: true,
    })
    .toPromise();

  if (byLocale) {
    return <PreviewTemplate content={byLocale} />;
  }

  const fallback = await builder
    .get(model, {
      userAttributes: { urlPath: `/preview` },
      preview: true,
    })
    .toPromise();

  return <PreviewTemplate content={fallback} />;
}
