import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@shadcn/ui/alert-dialog';
import { Button } from '@shadcn/ui/button';
import { Archive } from 'lucide-react';
import { useState } from 'react';

export default function ArchivedProduct() {
  const [isArchived, setIsArchived] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-black bg-[#ffffff] hover:bg-[#000000] hover:text-[#ffffff]"
        >
          <Archive className="mr-2 h-4 w-4" />
          {isArchived ? 'Unarchive product' : 'Archive product'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArchived ? '¿Unarchive product?' : '¿Archive product?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isArchived
              ? 'This action will make the product available again in the store.'
              : 'This action will hide the product from the store but keep all its information.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setIsArchived(!isArchived)}
            className="bg-title hover:bg-title/80 text-white dark:text-black"
          >
            {isArchived ? 'Unarchive' : 'Archive'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
