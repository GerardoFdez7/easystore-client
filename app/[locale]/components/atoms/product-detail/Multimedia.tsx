import { Button } from '@shadcn/ui/button';
import { Upload } from 'lucide-react';
import { Card, CardContent } from '@shadcn/ui/card';

export default function Multimedia() {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Multimedia
      </label>
      <Card className="bg-card border-2 border-dashed border-[#d9d9d9]">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-title text-lg font-medium">Multimedia</div>
            <div className="text-foreground text-sm">
              Drag and drop or browse to upload
            </div>
            <Button
              variant="outline"
              className="text-foreground border-[#d9d9d9]"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
