import ImageTopProducts from "@atoms/dashboard/ImageTopProducts";
import { Card, CardContent, CardHeader } from "@shadcn/ui/card";

export default function TopProducts() {
  const products = [
    {
      name: "Women's T-shirt",
      price: "$25.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Men's T-shirt",
      price: "$25.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Women's Hoodie",
      price: "$45.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Men's Hoodie",
      price: "$45.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Women's Sweatpants",
      price: "$35.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Men's Sweatpants",
      price: "$35.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Men's Hoodie",
      price: "$45.00",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Women's Hoodie",
      price: "$45.00",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-title mb-4">Top Products</h2>
      <Card className="bg-[#ffffff] border-[#e2e8f0] mb-8">
        <CardHeader></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {products.map((product, index) => (
              <div key={index} className="text-center">
                <ImageTopProducts />
                <h4 className="text-xs font-medium text-[#1e1e1e] mb-1">
                  {product.name}
                </h4>
                <p className="text-xs text-[#10b981] font-medium">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
