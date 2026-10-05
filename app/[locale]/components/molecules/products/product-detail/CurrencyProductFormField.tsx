import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@shadcn/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn/ui/select';
import { useTranslations } from 'next-intl';
import { CurrencyCodes } from '@graphql/generated';

const currencyCodes = Object.values(CurrencyCodes).sort();

/** Currency shared by every variant price of the product. */
export default function CurrencyProductFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="currency"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="currency" className="text-lg font-semibold">
              {t('currency')}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value || ''}
                required={true}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="w-full"
                  aria-label={t('currency')}
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={t('selectCurrency')} />
                </SelectTrigger>
                <SelectContent>
                  {currencyCodes.map((code) => (
                    <SelectItem key={code} value={code}>
                      {code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  );
}
