import { useTranslations } from 'next-intl';
import { Zap, DollarSign, Users, Rocket } from 'lucide-react';
import FeatureIcon from '@atoms/construction/FeatureIcon';

const FeatureIcons = () => {
  const t = useTranslations('Construction.features');

  return (
    <div className="grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
      <FeatureIcon icon={Zap} label={t('lightningFast')} />
      <FeatureIcon
        icon={DollarSign}
        label={t('lowCost')}
        iconColor="text-secondary"
      />
      <FeatureIcon icon={Users} label={t('userFriendly')} />
      <FeatureIcon
        icon={Rocket}
        label={t('quickLaunch')}
        iconColor="text-secondary"
      />
    </div>
  );
};

export default FeatureIcons;
