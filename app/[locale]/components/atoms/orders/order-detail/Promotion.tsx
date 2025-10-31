import { Ticket } from 'lucide-react';
import * as React from 'react';

interface PromotionProps {
  title: string;
  description?: string;
  className?: string;
}

export default function Promotion({
  title,
  description,
  className,
}: PromotionProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg bg-cyan-50 p-3 ${className ?? ''}`}
    >
      <Ticket className="h-4 w-4 text-blue-600" />
      <span className="text-sm font-medium text-blue-600">
        {title} {description}
      </span>
    </div>
  );
}
