import { Textarea } from '@shadcn/ui/textarea';
import { Label } from '@shadcn/ui/label';
import { cn } from 'utils';

type DescriptionProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  maxLength: number;
};

export default function Description({
  label,
  className,
  value,
  maxLength,
  onChange,
  ...props
}: DescriptionProps) {
  return (
    <div>
      <Label className="text-title mb-2 block text-sm font-medium">
        {label}
      </Label>
      <Textarea
        maxLength={maxLength}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(className)}
        {...props}
      />
    </div>
  );
}
