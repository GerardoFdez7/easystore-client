import ProductDetailTemplate from '@templates/ProductDetail';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailTemplate param={params.id} isNew={false} />;
}
