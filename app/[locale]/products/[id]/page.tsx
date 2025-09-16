import ProductDetailTemplate from '@templates/ProductDetail';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailTemplate param={id} isNew={false} />;
}
