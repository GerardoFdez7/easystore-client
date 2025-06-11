'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: 'custom-toast',
          title: 'custom-toast-title',
          description: 'custom-toast-description',
          warning: 'warning-toast',
          error: 'error-toast',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
