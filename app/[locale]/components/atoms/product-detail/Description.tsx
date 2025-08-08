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
      <label className="mb-2 block text-sm font-medium text-[#000000]">
        {label}
      </label>
      <Textarea
        className={cn('h-10 border-[#e2e8f0] bg-[#ffffff]', className)}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
}
