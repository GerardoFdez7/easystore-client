import Image from 'next/image';

export const MenuIcon = () => (
  <button>
    <Image
      src="/images/menu.png"
      alt="Menu Icon"
      width={32}
      height={32}
      className="h-8 w-8"
    />
  </button>
);
