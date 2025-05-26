import { Button } from '@atoms/shared/ButtonCn';

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
      <span className={selected ? 'line-through' : ''}>{text}</span>
    </Button>
  );
}
