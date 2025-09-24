import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@shadcn/ui/button';
import { X } from 'lucide-react';

interface CancelButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  showIcon?: boolean;
  translationKey?: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  showIcon = false,
  translationKey = 'cancel',
  disabled,
  variant = 'outline',
  size = 'default',
  ...props
}) => {
  const t = useTranslations('Shared');

  return (
    <Button disabled={disabled} variant={variant} size={size} {...props}>
      {showIcon && <X className="h-4 w-4" />}
      <span className="font-medium">{t(translationKey)}</span>
    </Button>
  );
};

export default CancelButton;
