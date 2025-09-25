import React from 'react';
import { Button } from '@shadcn/ui/button';
import CartLoader from '@atoms/shared/CartLoader';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@shadcn/ui/button';

interface ButtonLoadableProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  loaderSize?: number;
}

const ButtonLoadable: React.FC<ButtonLoadableProps> = ({
  loading = false,
  loadingText,
  children,
  loaderSize = 12,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? (
        <>
          <CartLoader size={loaderSize} />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonLoadable;
