'use client';

import { Textarea } from '@shadcn/ui/textarea';
import { Label } from '@shadcn/ui/label';
import { useTranslations } from 'next-intl';

export function DescriptionEditor({
  value,
  onChange,
  disabled = false,
}: {
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  const t = useTranslations('Profile');

  return (
    <div className="gap-control flex w-full flex-col">
      <Label htmlFor="profile-description" className="text-title">
        {t('description')}
      </Label>
      <Textarea
        id="profile-description"
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!onChange}
        disabled={disabled}
        placeholder={t('enterDescription')}
        maxLength={2000}
        className="min-h-35 resize-none"
      />
    </div>
  );
}
