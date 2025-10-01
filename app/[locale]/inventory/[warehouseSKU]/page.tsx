import StockDetailTemplate from '@templates/StockDetail';

type PageProps = {
  params: { warehouseSku: string };
};

export default function StockDetailPage({ params }: PageProps) {
  const { warehouseSku } = params;
  return <StockDetailTemplate warehouseSku={warehouseSku} />;
}
