'use client';

import LinkText from '@atoms/shared/LinkText';
import { useTranslations } from 'next-intl';

export default function AcceptTermsAndConditions() {
  const t = useTranslations('Register');

  return (
    <p className="text-sm">
      {t('termsMessage')}{' '}
      <LinkText href="/terms" className="text-secondary">
        {t('termsAndConditions')}
      </LinkText>{' '}
      {t('and')}{' '}
      <LinkText href="/privacy" className="text-secondary">
        {t('privacyPolicy')}
      </LinkText>
    </p>
  );
}
