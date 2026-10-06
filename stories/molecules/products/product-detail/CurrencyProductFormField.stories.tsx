import {
  expect as storybookExpect,
  screen,
  userEvent,
  waitFor,
} from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CurrencyCodes } from '@graphql/generated';
import { useForm, FormProvider } from 'react-hook-form';
import CurrencyProductFormField from '@molecules/products/product-detail/CurrencyProductFormField';

const CurrencyProductFormFieldWrapper = ({
  currency,
}: {
  currency: string;
}) => {
  const methods = useForm({ defaultValues: { currency } });

  return (
    <FormProvider {...methods}>
      <form className="w-full max-w-4xl space-y-4">
        <CurrencyProductFormField />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof CurrencyProductFormFieldWrapper> = {
  title: 'Molecules/Products/ProductDetail/CurrencyProductFormField',
  component: CurrencyProductFormFieldWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form field for the currency shared by every variant price of a product.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { currency: CurrencyCodes.Gtq },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox', { name: 'Currency' });
    await storybookExpect(select).toHaveTextContent('GTQ');
    await userEvent.click(select);
    await userEvent.click(await screen.findByRole('option', { name: 'USD' }));
    await storybookExpect(select).toHaveTextContent('USD');
  },
};

/** Guards client/backend sync: the options are exactly the generated enum. */
export const OffersEverySupportedCurrency: Story = {
  args: { currency: '' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Currency' }));
    const options = await screen.findAllByRole('option');
    await storybookExpect(options.map((option) => option.textContent)).toEqual(
      Object.values(CurrencyCodes).sort(),
    );
    // Close the listbox so the a11y check doesn't run against Radix's
    // aria-hidden focus guards.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      storybookExpect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );
  },
};

export const Empty: Story = {
  args: { currency: '' },
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox', { name: 'Currency' });
    await storybookExpect(select).toHaveTextContent('Select currency');
  },
};
