import CategoryDetailTemplate from '@templates/categories/CategoryDetail';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CategoryDetailTemplate id={id} />;
}
