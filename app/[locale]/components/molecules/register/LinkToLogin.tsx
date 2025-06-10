'use client';

import LinkText from '@atoms/shared/LinkText';
import { useTranslations } from 'next-intl';

export default function LinkToLogin() {
  const t = useTranslations('Register');

  return (
    <p className="text-text font-medium">
      {t('messageAccount')}{' '}
      <LinkText href="/login" className="text-secondary">
        {t('login')}
      </LinkText>
    </p>
  );
}
