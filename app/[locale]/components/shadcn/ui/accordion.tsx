'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from 'utils';

const AccordionHoverContext = React.createContext<{
  setValue?: (val: string) => void;
} | null>(null);

function Accordion({
  value,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  type?: 'single';
}) {
  const handleChange = (val: string) => {
    onValueChange?.(val);
  };

  return (
    <AccordionHoverContext.Provider value={{ setValue: handleChange }}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        collapsible
        value={value}
        onValueChange={handleChange}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionHoverContext.Provider>
  );
}

function AccordionItem({
  className,
  value,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const ctx = React.useContext(AccordionHoverContext);

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      value={value}
      onMouseEnter={() => {
        if (value && ctx?.setValue) {
          ctx.setValue(value as string);
        }
      }}
      className={cn('mb-5 border-b last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'text-title focus-visible:border-ring focus-visible:ring-ring/50 bg-card flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-t-md p-5 py-4 text-left text-2xl font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-text bg-card overflow-hidden rounded-b-md px-5 pb-5 text-xl"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
