import Image from 'next/image';

type ImageStartProps = {
  src: string;
};

export default function ImageStart({ src }: ImageStartProps) {
  return (
    <Image
      src={src}
      alt="Image"
      width={241}
      height={275}
      className="rounded-lg"
    />
  );
}
