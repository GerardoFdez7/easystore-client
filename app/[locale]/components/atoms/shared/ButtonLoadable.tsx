import React from 'react';
import { Button } from '@atoms/shared/Button';
import CartLoader from '@atoms/shared/CartLoader';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@atoms/shared/Button';

interface ButtonLoadableProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  loaderSize?: number;
}

const ButtonLoadable: React.FC<ButtonLoadableProps> = ({
  isLoading = false,
  loadingText,
  children,
  loaderSize = 10,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
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
