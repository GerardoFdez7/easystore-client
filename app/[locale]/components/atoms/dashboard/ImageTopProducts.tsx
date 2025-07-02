import Image from 'next/image';

export default function ImageTopProducts() {
  return (
    <div className="rounded-lg">
      <Image
        src="/laptop.webp"
        alt="Image"
        width={166}
        height={66}
        className="rounded-lg"
        priority
      />
    </div>
  );
}
