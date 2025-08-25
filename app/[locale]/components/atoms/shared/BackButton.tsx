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
      className={cx(
        'absolute',
        'h-12 w-12',
        'focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none',
        'z-50',
        className,
      )}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
