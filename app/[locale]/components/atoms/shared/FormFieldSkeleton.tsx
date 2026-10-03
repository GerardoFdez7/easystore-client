import { useTranslations } from 'next-intl';
import { CSSProperties } from 'react';
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
  const t = useTranslations('Shared');
  return (
    <div
      className={cx('mb-6', className)}
      role="status"
      aria-label={t('loadingFormField')}
    >
      <div className={cx('mb-2', labelWidth)}>
        <Skeleton className="h-4 w-full rounded" />
      </div>
      <Skeleton
        className="h-(--form-field-skeleton-height) w-full rounded-md"
        style={
          {
            '--form-field-skeleton-height': `${inputHeight}px`,
          } as CSSProperties
        }
      />
    </div>
  );
}
