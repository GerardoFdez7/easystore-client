import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import SpinLoader from '@atoms/shared/SpinLoader';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@shadcn/ui/button';
import { Save } from 'lucide-react';

interface SaveButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  showIcon?: boolean;
  loaderSize?: 'sm' | 'md' | 'lg' | 'xl';
  translationKey?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  isLoading = false,
  showIcon = false,
  loaderSize = 'sm',
  translationKey = 'save',
  disabled,
  variant = 'title',
  size = 'default',
  ...props
}) => {
  const t = useTranslations('Profile');

  return (
    <Button
      disabled={isLoading || disabled}
      variant={variant}
      size={size}
      {...props}
    >
      {isLoading ? (
        <>
          <SpinLoader size={loaderSize} />
          <span className="text-lg font-medium">{t(translationKey)}</span>
        </>
      ) : (
        <>
          {showIcon && <Save className="h-4 w-4" />}
          <span className="text-lg font-medium">{t(translationKey)}</span>
        </>
      )}
    </Button>
  );
};

export default SaveButton;
