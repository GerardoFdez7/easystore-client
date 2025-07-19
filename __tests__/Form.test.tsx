// __tests__/Form.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import Input from '@atoms/shared/OutsideInput';

describe('ShadCN <Form> components', () => {
  it('renders a simple form field without crashing', () => {
    // Creamos un hook mínimo
    const Wrapper: React.FC = () => {
      const methods = useForm<{ name: string }>({
        defaultValues: { name: '' },
      });
      return (
        <FormProvider {...methods}>
          <form>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Test" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
      );
    };

    render(<Wrapper />);
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
  });
});
