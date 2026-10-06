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
import { ProductType } from '@lib/types/product';

export default function TypeProductFormField() {
  const { control } = useFormContext();
  const t = useTranslations('Products');

  return (
    <section className="w-full">
      <FormField
        control={control}
        name="productType"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="productType" className="text-lg font-semibold">
              {t('productType')}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value || ProductType.Physical}
                required={true}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger
                  className="w-full"
                  aria-label={t('productType')}
                  aria-invalid={!!fieldState.error}
                >
                  <SelectValue placeholder={t('selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProductType.Physical}>
                    {t('physical')}
                  </SelectItem>
                  <SelectItem value={ProductType.Digital}>
                    {t('digital')}
                  </SelectItem>
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
