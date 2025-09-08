import CategoryDetail from '@templates/CategoryDetail';

interface CategoryPageProps {
  params: Promise<{ locale: string; name: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { name } = await params;
  return <CategoryDetail name={name} />;
}
