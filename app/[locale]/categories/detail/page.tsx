import CategoryDetailTemplate from '@templates/categories/CategoryDetail';

export default function CategoryDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <CategoryDetailTemplate id={id} />;
}
