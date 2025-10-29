import VariantTemplate from '@templates/products/Variant';

export default async function NewVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VariantTemplate productId={id} isNew={true} />;
}
