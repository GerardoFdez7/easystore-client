import Image, { ImageProps } from 'next/image';

type LogoImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string;
  alt?: string;
};

export default function LogoImage({
  src = '/logo.svg',
  alt = 'EasyStore Logo',
  ...props
}: LogoImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      className={`object-contain ${props.className ?? ''}`}
    />
  );
}
