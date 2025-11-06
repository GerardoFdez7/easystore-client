import { Check } from 'lucide-react';

type LiPlanProps = {
  text: string;
};

export default function LiPlan({ text }: LiPlanProps) {
  return (
    <li className="flex items-start">
      <Check className="text-secondary mr-2 h-5 w-5 shrink-0" />
      <span className="text-foreground text-[13px]">{text}</span>
    </li>
  );
}
