import VariantTemplate from '@templates/products/Variant';

export default async function VariantDetailPage({
  params,
}: {
  params: Promise<{ id: string; variantId: string }>;
}) {
  const { id, variantId } = await params;
  return <VariantTemplate productId={id} variantId={variantId} isNew={false} />;
}
