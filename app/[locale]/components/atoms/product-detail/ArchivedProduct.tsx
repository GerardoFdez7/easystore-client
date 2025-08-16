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
          {isArchived ? 'Desarchivar producto' : 'Archivar producto'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isArchived ? '¿Desarchivar producto?' : '¿Archivar producto?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isArchived
              ? 'Esta acción hará que el producto vuelva a estar disponible en la tienda.'
              : 'Esta acción ocultará el producto de la tienda pero mantendrá toda su información.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => setIsArchived(!isArchived)}
            className="bg-title hover:bg-title/80 text-white dark:text-black"
          >
            {isArchived ? 'Desarchivar' : 'Archivar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
