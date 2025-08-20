import { useTranslations } from 'next-intl';
import Logo from '@atoms/shared/Logo';

const HeaderConstruction = () => {
  const t = useTranslations('Construction');

  return (
    <>
      <Logo className="scale-150" />
      {/* Hero Section */}
      <div className="max-w-4xl space-y-6">
        <h2 className="font-heading text-title text-4xl leading-tight font-black md:text-6xl lg:text-7xl">
          {t('title')}
        </h2>
        <p className="text-text mx-auto max-w-2xl text-xl leading-relaxed font-medium md:text-2xl">
          {t('subtitle')}
        </p>
      </div>
    </>
  );
};

export default HeaderConstruction;
