'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@shadcn/ui/card';
import TimeUnit from '@atoms/construction/TimeUnit';
import { useCountdown } from '@contexts/CountdownContext';

const CountdownTimer = () => {
  const t = useTranslations('Construction');
  const { timeLeft } = useCountdown();

  return (
    <Card className="bg-card/80 border shadow-lg backdrop-blur-sm">
      <CardContent className="p-8">
        <h3 className="font-heading text-title mb-6 text-2xl font-bold">
          {t('launchingIn')}
        </h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <TimeUnit value={timeLeft.days} label={t('days')} />
          <TimeUnit value={timeLeft.hours} label={t('hours')} />
          <TimeUnit value={timeLeft.minutes} label={t('minutes')} />
          <TimeUnit value={timeLeft.seconds} label={t('seconds')} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
