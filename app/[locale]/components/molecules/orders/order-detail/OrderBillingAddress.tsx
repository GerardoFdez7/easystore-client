import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';

export default function OrderBillingAddress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Same as shipping
      </CardContent>
    </Card>
  );
}
