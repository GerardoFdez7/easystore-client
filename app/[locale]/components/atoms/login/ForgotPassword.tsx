import { useTranslations } from 'next-intl';
import DialogForgotPassword from './DialogForgotPassword';

export default function ForgotPassword() {
  const t = useTranslations('Login');

  return (
    <DialogForgotPassword>
      <button
        type="button"
        className="text-text hover:text-secondary cursor-pointer text-sm underline"
      >
        {t('changePassword')}
      </button>
    </DialogForgotPassword>
  );
}
