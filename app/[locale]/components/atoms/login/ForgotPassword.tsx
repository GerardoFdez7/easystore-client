import { useTranslations } from 'next-intl';
import LinkText from '@atoms/shared/LinkText';

export default function ForgotPassword() {
  const t = useTranslations('Login');
  //TODO:  Dialog asking for email to send reset password link
  return <LinkText href="">{t('changePassword')}</LinkText>;
}
