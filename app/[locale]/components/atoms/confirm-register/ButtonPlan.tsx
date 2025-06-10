import { Button } from '@atoms/shared/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';

type ButtonPlanProps = {
  text: string;
  selected?: boolean;
  onSelect: () => void;
  mode?: 'confirm' | 'landing';
};

export default function ButtonPlan({
  text,
  selected,
  onSelect,
  mode = 'confirm',
}: ButtonPlanProps) {
  const content = (
    <div className="flex items-center justify-between gap-x-4 text-lg">
      <span>{text}</span>
      {mode === 'confirm' && selected && (
        <Check className="text-secondary h-6 w-6" />
      )}
    </div>
  );

  if (mode === 'landing') {
    return (
      <Link href="/register">
        <Button className="py-6" variant={'plans'}>
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className={`py-6 ${selected ? 'bg-black' : ''}`}
      variant={'plans'}
      onClick={onSelect}
    >
      {content}
    </Button>
  );
}
