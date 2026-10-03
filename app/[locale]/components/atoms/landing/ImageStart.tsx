import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ImageStartProps = {
  src: string;
};

export default function ImageStart({ src }: ImageStartProps) {
  const t = useTranslations('Shared');
  return (
    <Image
      src={src}
      alt={t('imageAlt')}
      width={241}
      height={275}
      className="rounded-lg"
    />
  );
}
