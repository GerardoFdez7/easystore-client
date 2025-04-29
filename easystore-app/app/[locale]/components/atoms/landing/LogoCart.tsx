import Image from 'next/image';
import cartIcon from '@assets/cart.png';

export const LogoCart = () => (
  <div className="flex items-center gap-3">
    <Image
      src={cartIcon}
      alt="Cart Icon"
      width={40}
      height={40}
      className="h-10 w-10"
    />
  </div>
);
