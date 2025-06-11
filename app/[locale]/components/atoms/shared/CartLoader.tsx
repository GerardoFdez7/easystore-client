import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface CartLoaderProps {
  className?: string;
  size?: number;
}

const CartLoader: React.FC<CartLoaderProps> = ({ className, size }) => {
  return (
    <div
      className={`flex items-center justify-center ${className} w-${size} h-${size}`}
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
