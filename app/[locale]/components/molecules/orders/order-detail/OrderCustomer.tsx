import { Mail, Phone } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';

export default function OrderCustomer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
          <div>
            <div className="font-medium">Sophia Clark</div>
            <div className="text-muted-foreground text-sm">
              sophia.clark@email.com
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-muted-foreground h-5 w-5" />
          <div className="text-sm">+1 (555) 123-4567</div>
        </div>
        <Button variant="link" className="h-auto p-0 text-blue-600">
          View profile
        </Button>
      </CardContent>
    </Card>
  );
}
