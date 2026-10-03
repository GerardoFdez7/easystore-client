import { useTranslations } from 'next-intl';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from 'utils';

interface CartLoaderProps {
  className?: string;
  /** Width and height in Tailwind spacing units (12 = 3rem). */
  size?: number;
}

const CartLoader: React.FC<CartLoaderProps> = ({ className, size }) => {
  const t = useTranslations('Shared');
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        size !== undefined && 'size-cart-loader',
        className,
      )}
      style={
        size === undefined
          ? undefined
          : ({ '--cart-size': size } as React.CSSProperties)
      }
      role="status"
      aria-label={t('loadingCart')}
    >
      <DotLottieReact
        src="https://lottie.host/b07d65bf-166e-40b8-a1ef-375831385da8/EErNnQzo9O.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default CartLoader;
