'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@shadcn/ui/button';

export const ProfileSocialButtons: React.FC = () => {
  const t = useTranslations('Profile');
  const tShared = useTranslations('Shared');

  const handleGoogleAuth = () => {
    alert(tShared('featureInProgress'));
  };

  return (
    <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
      {/* Google */}
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={handleGoogleAuth}
        className="border-hover hover:bg-sidebar focus-visible:ring-border text-accent-foreground h-12 min-w-65 justify-center rounded-xl border bg-white px-5 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
      >
        <Image
          src="/icon_google.webp"
          alt={tShared('googleIconAlt')}
          width={20}
          height={20}
          className="mr-3 inline-block"
        />
        <span className="text-sm font-medium">{t('connectWithGoogle')}</span>
      </Button>
    </div>
  );
};

export default ProfileSocialButtons;
