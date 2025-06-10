'use client';

import LinkText from '@atoms/shared/LinkText';
import { useTranslations } from 'next-intl';

export default function LinkToRegister() {
  const t = useTranslations('Login');

  return (
    <p className="text-text flex justify-center gap-1 font-medium">
      {t('messageAccount')}
      <LinkText href="/register" className="text-secondary">
        {t('register')}
      </LinkText>
    </p>
  );
}
