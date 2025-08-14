import { Textarea } from '@shadcn/ui/textarea';
import { cn } from 'utils';

type DescriptionProps = {
  label: string;
  className?: string;
  defaultValue?: string;
};

export default function Description({
  label,
  className,
  defaultValue,
  ...props
}: DescriptionProps) {
  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        {label}
      </label>
      <Textarea
        className={cn('h-10 border-[#e2e8f0]', className)}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
}
