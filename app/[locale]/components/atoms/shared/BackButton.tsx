'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@shadcn/ui/button';

type Props = {
  className?: string;
  label?: string;
  onBack?: () => void;
};

const cx = (...v: Array<string | false | undefined>) =>
  v.filter(Boolean).join(' ');

export default function BackButton({
  className,
  label = 'Back',
  onBack,
}: Props) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.back());

  return (
    <Button
      type="button"
      onClick={handleBack}
      aria-label={label}
      variant="ghost"
      size="icon"
      className={cx('absolute', className)}
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
}
