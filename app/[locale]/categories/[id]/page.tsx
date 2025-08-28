import CategoryDetail from '@templates/CategoryDetail';

interface CategoryPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { id } = await params;
  return <CategoryDetail id={id} />;
}
