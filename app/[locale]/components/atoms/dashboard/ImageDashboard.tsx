import Image from 'next/image';

export default function ImageDashboard() {
  return (
    <div className="bg-opacity-20 flex justify-center rounded-lg p-4">
      <Image
        src="/laptop.webp"
        alt="Image"
        width={160}
        height={120}
        className="rounded-lg"
      />
    </div>
  );
}
