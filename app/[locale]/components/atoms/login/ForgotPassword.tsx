import { useTranslations } from 'next-intl';
import DialogForgotPassword from './DialogForgotPassword';

export default function ForgotPassword() {
  const t = useTranslations('Login');

  return (
    <DialogForgotPassword>
      <button
        type="button"
        className="cursor-pointer text-sm text-gray-600 underline hover:text-blue-800"
      >
        {t('changePassword')}
      </button>
    </DialogForgotPassword>
  );
}
