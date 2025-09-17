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
import Image from 'next/image';
import type { Variant } from '@lib/utils/types/product';

export default function TableVariants({ variants }: { variants: Variant[] }) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/products/${id}`);
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
              <TableHead className="text-title text-left">Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow
                key={variant.id}
                className="cursor-pointer transition-colors"
                onClick={() => handleRowClick(variant.id)}
              >
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg">
                      <Image
                        src={variant.variantCover ?? '/default.webp'}
                        alt={variant.attributes[0]?.value || 'Variant Image'}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-foreground text-sm">
                      {variant.attributes[0]?.key}:{' '}
                      {variant.attributes[0]?.value}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {variant.price}
                </TableCell>
                <TableCell className="text-foreground text-sm">
                  {variant.condition}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
