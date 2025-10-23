import VariantTemplate from '@templates/products/Variant';

export default function AddVariantToNewProductPage() {
  return <VariantTemplate productId="new" isNew={true} isNewProduct={true} />;
}
