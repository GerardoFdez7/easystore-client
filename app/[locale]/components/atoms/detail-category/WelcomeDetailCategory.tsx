import { useTranslations } from 'next-intl';

type Props = { name?: string | null };

export default function WelcomeDetailCategory({ name }: Props) {
  const t = useTranslations('CategoryDetail');

  return (
    <div className="mx-3 mb-8">
      <h1 className="text-title mb-2 text-2xl font-bold sm:text-4xl">
        {t('welcomeDetailCategory')} {name ? `- ${name}` : ''}
      </h1>
    </div>
  );
}
