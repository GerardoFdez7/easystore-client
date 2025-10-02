import StockDetailTemplate from '@templates/StockDetail';

type PageProps = {
  params: { warehouseSKU: string };
};

export default function StockDetailPage({ params }: PageProps) {
  const { warehouseSKU } = params;
  return <StockDetailTemplate warehouseSku={warehouseSKU} />;
}
