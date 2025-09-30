'use client';

import InputProduct from '@atoms/product-detail/InputProduct';
import { Button } from '@shadcn/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shadcn/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { useForm } from 'react-hook-form';

export default function FormSustainability() {
  const form = useForm({
    defaultValues: {
      certification: '',
      recycledPercentage: '',
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Sustainability Certification</DialogTitle>
        <DialogDescription>
          Add a new sustainability certification with its recycled percentage.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="certification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certification</FormLabel>
                <FormControl>
                  <InputProduct {...field} placeholder="e.g., FSC Certified" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recycledPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recycled Percentage</FormLabel>
                <FormControl>
                  <InputProduct {...field} placeholder="e.g., 70.5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-title hover:bg-title/80 text-white dark:text-black"
            >
              Add Certification
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
