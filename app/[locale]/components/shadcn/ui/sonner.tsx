'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';
import { useTheme } from '@shadcn/features/theme-provider';

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'custom-toast',
          title: 'custom-toast-title',
          description: 'custom-toast-description',
          warning: 'warning-toast',
          error: 'error-toast',
          success: 'success-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
