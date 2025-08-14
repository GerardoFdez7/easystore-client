import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';

export default function ButtonAddSustainability() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="border-title text-title hover:bg-title hover:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add sustainability
    </Button>
  );
}
