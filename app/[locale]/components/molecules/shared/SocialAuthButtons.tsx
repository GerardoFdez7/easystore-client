import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@atoms/shared/Button';

interface SocialAuthButtonsProps {
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onGoogleAuth,
  onFacebookAuth,
}) => {
  const t = useTranslations('Register');

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Button variant={'social'} size={'xl'} onClick={onGoogleAuth}>
        <Image
          src="/icon_google.webp"
          alt="Google icon"
          width={24}
          height={24}
          className="mr-4 inline-block"
        />
        {t('registerWithGoogle')}
      </Button>
      <Button variant={'social'} size={'xl'} onClick={onFacebookAuth}>
        <Image
          src="/icon_facebook.webp"
          alt="Facebook icon"
          width={24}
          height={24}
          className="mr-2 inline-block"
        />
        {t('registerWithFacebook')}
      </Button>
    </div>
  );
};

export default SocialAuthButtons;
