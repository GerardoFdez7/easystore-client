import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
import ButtonAddVariant from '@atoms/product-detail/ButtonAddVariant';

const variants = [
  { id: 1, name: 'Variant 1', price: '₡ 2000.00', stock: '10' },
  { id: 2, name: 'Variant 2', price: '₡ 2000.00', stock: '10' },
  { id: 3, name: 'Variant 3', price: '₡ 2000.00', stock: '10' },
];

export default function TableVariants() {
  const router = useRouter();

  const handleRowClick = (variantName: string) => {
    const slug = encodeURIComponent(
      variantName.toLowerCase().replace(/\s+/g, '-'),
    );
    router.push(`/products/${slug}`);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <label className="text-title text-sm font-medium">Variants</label>
        <ButtonAddVariant />
      </div>

      <div className="overflow-hidden rounded-lg border shadow-lg">
        <Table className="bg-card">
          <TableHeader>
            <TableRow>
              <TableHead className="text-title text-center">Variant</TableHead>
              <TableHead className="text-title text-left">Price</TableHead>
              <TableHead className="text-title text-left">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow
                key={variant.id}
                className="cursor-pointer transition-colors"
                onClick={() => handleRowClick(variant.name)}
              >
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#737373] text-sm font-medium text-[#ffffff]">
                      V
                    </div>
                    <span className="text-foreground text-sm">
                      {variant.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {variant.price}
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {variant.stock}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
