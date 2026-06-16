import { Tag } from 'lucide-react';
import * as React from 'react';

interface CouponProps {
  code: string;
  description?: string;
  className?: string;
}

export default function Coupon({ code, description, className }: CouponProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg bg-green-50 p-3 ${className ?? ''}`}
    >
      <Tag className="text-secondary h-4 w-4" />
      <span className="text-secondary text-sm font-medium">
        {code} {description}
      </span>
    </div>
  );
}
