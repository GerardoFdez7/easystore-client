import { Button } from '@atoms/shared/ButtonCn';
import { Check } from 'lucide-react';

type ButtonPlanProps = {
  text: string;
  selected?: boolean;
  onSelect: () => void;
};

export default function ButtonPlan({
  text,
  selected,
  onSelect,
}: ButtonPlanProps) {
  return (
    <Button
      className={`py-6 ${selected ? 'bg-black' : ''}`}
      variant={'plans'}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-x-4">
        <span>{text}</span>
        {selected && <Check className="text-secondary h-6 w-6" />}
      </div>
    </Button>
  );
}
