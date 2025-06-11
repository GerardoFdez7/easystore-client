import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@atoms/shared/Button';

export const SocialAuthButtons: React.FC = () => {
  const t = useTranslations('Register');

  const handleGoogleAuth = () => {
    // TO DO: implement Google login
    alert('We are working really hard on this feature!');
  };
  const handleFacebookAuth = () => {
    // TO DO: implement Facebook login
    alert('We are working really hard on this feature!');
  };

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Button variant={'social'} size={'xl'} onClick={handleGoogleAuth}>
        <Image
          src="/icon_google.webp"
          alt="Google icon"
          width={24}
          height={24}
          className="mr-4 inline-block"
        />
        {t('registerWithGoogle')}
      </Button>
      <Button variant={'social'} size={'xl'} onClick={handleFacebookAuth}>
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
