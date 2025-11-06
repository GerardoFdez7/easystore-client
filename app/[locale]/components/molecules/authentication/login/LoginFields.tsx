import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { Eye, EyeClosed } from 'lucide-react';
import Input from '@atoms/shared/OutsideInput';

export const LoginFields: React.FC = () => {
  const t = useTranslations('Login');
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('email')}</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('password')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} {...field} />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-4 -translate-y-1/2 hover:cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="text-secondary h-7 w-7" />
                  ) : (
                    <EyeClosed className="text-secondary h-7 w-7" />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default LoginFields;
