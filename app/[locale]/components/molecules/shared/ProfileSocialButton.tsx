'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@shadcn/ui/button';

export const ProfileSocialButtons: React.FC = () => {
  const t = useTranslations('Profile');

  const handleGoogleAuth = () => {
    alert('We are working really hard on this feature!');
  };

  const handleFacebookAuth = () => {
    alert('We are working really hard on this feature!');
  };

  return (
    <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
      {/* Google */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGoogleAuth}
        className="h-12 min-w-[260px] justify-center rounded-xl border border-gray-200 bg-white px-5 text-gray-800 shadow-md hover:bg-gray-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
      >
        <Image
          src="/icon_google.webp"
          alt="Google icon"
          width={20}
          height={20}
          className="mr-3 inline-block"
        />
        <span className="text-sm font-medium">{t('connectWithGoogle')}</span>
      </Button>

      {/* Facebook */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleFacebookAuth}
        className="h-12 min-w-[260px] justify-center rounded-xl border border-gray-200 bg-white px-5 text-gray-800 shadow-md hover:bg-gray-50 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none"
      >
        <Image
          src="/icon_facebook.webp"
          alt="Facebook icon"
          width={20}
          height={20}
          className="mr-3 inline-block"
        />
        <span className="text-sm font-medium">{t('connectWithFacebook')}</span>
      </Button>
    </div>
  );
};

export default ProfileSocialButtons;
