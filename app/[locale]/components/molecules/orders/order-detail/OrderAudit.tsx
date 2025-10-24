import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';

export default function OrderAudit() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-medium">#123456</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">External ID</span>
          <span className="font-medium">EXT-98765</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created At</span>
          <span className="font-medium">July 15, 2024, 10:00 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Updated</span>
          <span className="font-medium">July 15, 2024, 10:30 AM</span>
        </div>
      </CardContent>
    </Card>
  );
}
