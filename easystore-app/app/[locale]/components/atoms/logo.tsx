import Image from 'next/image';

export const Logo = () => (
  <div className="flex items-center gap-3">
    <Image
      src="/images/cart.png"
      alt="Cart Icon"
      width={40}
      height={40}
      className="h-10 w-10"
    />
  </div>
);
