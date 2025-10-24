'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

type Props = {
  className?: string;
  label?: string;
  onBack?: () => void;
};

const cx = (...v: Array<string | false | undefined>) =>
  v.filter(Boolean).join(' ');

export default function BackButton({ className, label, onBack }: Props) {
  const router = useRouter();
  const t = useTranslations('Shared');
  const handleBack = onBack ?? (() => router.back());

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          onClick={handleBack}
          aria-label={label ?? t('goBack')}
          variant="ghost"
          size="icon"
          className={cx('absolute', className)}
        >
          <ArrowLeft className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t('goBack')}</TooltipContent>
    </Tooltip>
  );
}
