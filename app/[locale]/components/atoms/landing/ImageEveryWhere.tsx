import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ImageStartProps = {
  src: string;
};

export default function ImageEveryWhere({ src }: ImageStartProps) {
  const t = useTranslations('Shared');
  return (
    <div className="bg-accent/20 rounded-lg p-4">
      <Image
        src={src}
        alt={t('imageAlt')}
        width={688}
        height={516}
        className="rounded-lg"
      />
    </div>
  );
}
