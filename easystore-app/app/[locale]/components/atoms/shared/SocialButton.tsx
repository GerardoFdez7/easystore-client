// components/ui/social-button.tsx

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@atoms/shared/ButtonCn';
import { cn } from 'app/[locale]/lib/utils/cn';

interface SocialButtonProps extends React.ComponentProps<'button'> {
  imageSrc: string;
  imageAlt: string;
  text: string;
}

export function SocialButton({
  imageSrc,
  imageAlt,
  text,
  ...props
}: SocialButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        'w-full gap-2 bg-[#EBDBF5] text-black sm:w-auto',
        props.className,
      )}
    >
      <Image src={imageSrc} alt={imageAlt} width={20} height={20} />
      <span>{text}</span>
    </Button>
  );
}
