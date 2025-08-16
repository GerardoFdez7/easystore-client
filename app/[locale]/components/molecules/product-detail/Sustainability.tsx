'use client';

import ButtonAddSustainability from '@atoms/product-detail/ButtonAddSustainability';
import { Button } from '@shadcn/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shadcn/ui/table';
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
import { Dialog, DialogTrigger } from '@shadcn/ui/dialog';
import { X } from 'lucide-react';
import FormSustainability from './FormSustainability';

export default function Sustainability() {
  const sustainabilityData = [
    {
      id: '1',
      certification: 'FSC Certified',
      recycledPercentage: 70.0,
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <label className="text-title text-sm font-medium">Sustainability</label>
        <Dialog>
          <DialogTrigger asChild>
            <ButtonAddSustainability />
          </DialogTrigger>
          {/*Form Add Sustainability*/}
          <FormSustainability />
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border shadow-lg">
        <Table className="bg-card">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-foreground pl-5 font-medium">
                Certification
              </TableHead>
              <TableHead className="text-foreground font-medium">
                Recycled Percentage
              </TableHead>
              <TableHead className="text-foreground text-center font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sustainabilityData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="pl-5">{item.certification}</TableCell>
                <TableCell>{item.recycledPercentage}%</TableCell>
                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-[#ed2727] hover:bg-transparent hover:text-[#d12525d9]"
                      >
                        <X className="size-4 sm:size-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Sustainability
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the certification?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-[#ed2727] text-white hover:bg-[#d12525c4]">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {sustainabilityData.length === 0 && (
        <div className="text-muted-foreground p-8 text-center">
          No sustainability certifications added yet.
        </div>
      )}
    </section>
  );
}
