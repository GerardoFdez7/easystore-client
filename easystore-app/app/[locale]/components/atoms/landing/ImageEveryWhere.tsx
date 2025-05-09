import Image from 'next/image';

type ImageStartProps = {
  src: string;
};

export default function ImageEveryWhere({ src }: ImageStartProps) {
  return (
    <div className="bg-opacity-20 rounded-lg p-4">
      <Image
        src={src}
        alt="Image"
        layout="responsive"
        width={688}
        height={516}
        className="rounded-lg"
      />
    </div>
  );
}
