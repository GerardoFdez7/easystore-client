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
  value = '',
  ...props
}: TextareaProps) {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input selection:bg-title selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 min-h-16 w-full max-w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          showCharacterCount && 'pb-8',
          className,
        )}
        maxLength={maxLength}
        value={value}
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
