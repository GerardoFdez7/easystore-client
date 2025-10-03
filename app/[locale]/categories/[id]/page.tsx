import CategoryDetail from '@templates/categories/CategoryDetail';

interface CategoryPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { id } = await params;
  return <CategoryDetail id={id} />;
}
