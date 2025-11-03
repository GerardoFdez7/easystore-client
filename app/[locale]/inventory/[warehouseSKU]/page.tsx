import StockDetailTemplate from '@templates/inventory/StockDetail';

type PageProps = {
  params: Promise<{ warehouseSKU: string }>;
};

export default async function StockDetailPage({ params }: PageProps) {
  const { warehouseSKU } = await params;
  return <StockDetailTemplate warehouseSku={warehouseSKU} />;
}
