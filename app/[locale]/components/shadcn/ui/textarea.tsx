import * as React from 'react';

import { cn } from '@lib/utils/cn';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  maxLength: number;
  showCharacterCount?: boolean;
}

function Textarea({
  className,
  maxLength,
  showCharacterCount = true,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const isControlled = value !== undefined;
  const [currentLength, setCurrentLength] = React.useState(() => {
    const initialText = isControlled
      ? typeof value === 'string'
        ? value
        : ''
      : typeof defaultValue === 'string'
        ? (defaultValue as string)
        : '';
    return initialText.length;
  });

  React.useEffect(() => {
    if (isControlled && typeof value === 'string') {
      setCurrentLength(value.length);
    }
  }, [isControlled, value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setCurrentLength(e.target.value.length);
    }
    onChange?.(e);
  };

  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input selection:bg-title selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full max-w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          showCharacterCount && 'pb-8',
          className,
        )}
        maxLength={maxLength}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
        {...props}
      />
      {showCharacterCount && (
        <div className="text-muted-foreground absolute right-3 bottom-3 text-xs">
          {currentLength}/{maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea, type TextareaProps };
