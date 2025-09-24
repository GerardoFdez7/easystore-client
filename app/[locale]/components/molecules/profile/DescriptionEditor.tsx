'use client';

import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import { Edit2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function DescriptionEditor({
  value,
  onSave,
  loading = false,
}: {
  value?: string;
  onSave?: (v: string) => void | Promise<unknown>;
  loading?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(value ?? '');
  const t = useTranslations('Profile');

  useEffect(() => setDescription(value ?? ''), [value]);

  const handleToggle = () => {
    if (isEditing) void onSave?.(description);
    setIsEditing((v) => !v);
  };

  return (
    <div className="mb-8 w-full">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-text text-center font-bold">
          {t('description')}
        </span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="text-secondary"
          onClick={handleToggle}
          disabled={loading}
        >
          {isEditing ? (
            <Save className="h-4 w-4" />
          ) : (
            <Edit2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        readOnly={!isEditing}
        placeholder={t('enterDescription')}
        maxLength={2000}
        className="min-h-[140px] w-full max-w-sm resize-none items-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:min-h-[200px] sm:max-w-md"
      />
    </div>
  );
}
