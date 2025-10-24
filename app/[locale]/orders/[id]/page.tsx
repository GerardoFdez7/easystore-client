import OrderDetailTemplate from '@templates/orders/OrderDetail';

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailTemplate param={id} />;
}
