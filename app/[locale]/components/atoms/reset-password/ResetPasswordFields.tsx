import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shadcn/ui/form';
import { Eye, EyeClosed } from 'lucide-react';
import Input from '@atoms/shared/OutsideInput';

export const ResetPasswordFields: React.FC = () => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations('ResetPassword');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
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

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('confirmPassword')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...field}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute top-1/2 right-4 -translate-y-1/2 hover:cursor-pointer"
                >
                  {showConfirmPassword ? (
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

export default ResetPasswordFields;
