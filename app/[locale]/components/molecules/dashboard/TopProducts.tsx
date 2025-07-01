import ImageTopProducts from '@atoms/dashboard/ImageTopProducts';
import { Card, CardContent, CardHeader } from '@shadcn/ui/card';

export default function TopProducts() {
  const products = [
    {
      name: "Women's T-shirt",
      price: '$25.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Men's T-shirt",
      price: '$25.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Women's Hoodie",
      price: '$45.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Men's Hoodie",
      price: '$45.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Women's Sweatpants",
      price: '$35.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Men's Sweatpants",
      price: '$35.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Men's Hoodie",
      price: '$45.00',
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: "Women's Hoodie",
      price: '$45.00',
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

  return (
    <section className="py-10">
      <h1 className="text-title mb-4 text-2xl font-bold">Top Products</h1>
      <Card className="mb-8 border-[#e2e8f0] bg-[#ffffff]">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 @min-7xl:grid-cols-5">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <ImageTopProducts />
                <h4 className="text-foreground mb-1 text-xs font-medium">
                  {product.name}
                </h4>
                <p className="text-secondary text-xs font-medium">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
