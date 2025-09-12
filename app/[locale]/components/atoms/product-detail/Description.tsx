import { Textarea } from '@shadcn/ui/textarea';
import { cn } from 'utils';

type DescriptionProps = {
  label: string;
  value?: string;
  className?: string;
};

export default function Description({
  label,
  className,
  value,
  ...props
}: DescriptionProps) {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        {label}
      </label>
      <Textarea
        defaultValue={value}
        className={cn('h-10 border-[#e2e8f0] bg-white', className)}
        {...props}
      />
    </div>
  );
}
