import Image from 'next/image';

export default function ImageDashboard() {
  return (
    <div className="bg-opacity-20 rounded-lg p-4">
      <Image
        src="/laptop.webp"
        alt="Image"
        width={270}
        height={220}
        className="rounded-lg"
      />
    </div>
  );
}
