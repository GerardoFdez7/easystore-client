import { Button } from '@shadcn/ui/button';
import { Avatar, AvatarFallback } from '@shadcn/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import { Separator } from '@shadcn/ui/separator';
import { useTranslations } from 'next-intl';

interface OrderProduct {
  id: string;
  name: string;
  variant: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
  avatarColor: string;
  avatarLetter: string;
}

interface OrderSummary {
  subtotal: number;
  discounts: number;
  taxes: number;
  shipping: number;
  total: number;
}

interface OrderDetailsData {
  products: OrderProduct[];
  summary: OrderSummary;
}

// Mock data
const orderDetailsData: OrderDetailsData = {
  products: [
    {
      id: '1',
      name: 'Water Bottle',
      variant: 'Color: White',
      sku: 'WB-001',
      quantity: 2,
      price: 20.0,
      total: 40.0,
      avatarColor: 'bg-slate-600',
      avatarLetter: 'W',
    },
    {
      id: '2',
      name: 'Nike t-shirts',
      variant: 'Color: red',
      sku: 'TS-002',
      quantity: 1,
      price: 30.0,
      total: 30.0,
      avatarColor: 'bg-orange-400',
      avatarLetter: 'N',
    },
    {
      id: '3',
      name: 'Shopping Bag',
      variant: 'Material: Cotton',
      sku: 'SB-003',
      quantity: 3,
      price: 10.0,
      total: 30.0,
      avatarColor: 'bg-orange-400',
      avatarLetter: 'S',
    },
  ],
  summary: {
    subtotal: 100.0,
    discounts: 20.0,
    taxes: 5.0,
    shipping: 5.0,
    total: 100.0,
  },
};

export default function OrderDetailsTable() {
  const formatCurrency = (amount: number) => {
    const symbol = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'Q';
    return `${symbol}${amount.toFixed(2)}`;
  };
  const t = useTranslations('Orders');
  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-bold">{t('productDetails')}</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          {t('exportPDF')} / {t('print')}
        </Button>
      </div>

      <Table className="bg-card">
        <TableHeader>
          <TableRow>
            <TableHead>{t('product')}</TableHead>
            <TableHead>{t('sku')}</TableHead>
            <TableHead>{t('qty')}</TableHead>
            <TableHead>{t('price')}</TableHead>
            <TableHead className="text-right">{t('total')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetailsData.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className={product.avatarColor}>
                    <AvatarFallback
                      className={`${product.avatarColor} text-white`}
                    >
                      {product.avatarLetter}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{product.variant}</div>
                    <div className="text-muted-foreground text-sm">
                      {product.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {product.sku}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="space-y-2 border-t px-4 py-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span className="font-medium">
            {formatCurrency(orderDetailsData.summary.subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('discounts')}</span>
          <span className="text-secondary font-medium">
            -{formatCurrency(orderDetailsData.summary.discounts)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('taxes')}</span>
          <span className="font-medium">
            {formatCurrency(orderDetailsData.summary.taxes)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span className="font-medium">
            {formatCurrency(orderDetailsData.summary.shipping)}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between pt-2 text-base font-bold">
          <span>{t('total')}</span>
          <span>{formatCurrency(orderDetailsData.summary.total)}</span>
        </div>
      </div>
    </div>
  );
}
