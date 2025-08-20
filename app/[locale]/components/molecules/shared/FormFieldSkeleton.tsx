'use client';

import { Skeleton } from '@shadcn/ui/skeleton';

type Props = {
  labelWidth?: string;
  inputHeight?: number;
  className?: string;
};

const cx = (...v: Array<string | false | undefined>) =>
  v.filter(Boolean).join(' ');

export default function FormFieldSkeleton({
  labelWidth = 'w-28',
  inputHeight = 40,
  className,
}: Props) {
  return (
    <div className={cx('mb-6', className)}>
      <Skeleton className={cx('mb-2 h-4 rounded', labelWidth)} />
      <Skeleton className="w-full rounded-md" style={{ height: inputHeight }} />
    </div>
  );
}
