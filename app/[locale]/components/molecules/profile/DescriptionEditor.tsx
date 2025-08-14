'use client';

import { Textarea } from '@shadcn/ui/textarea';
import { Button } from '@shadcn/ui/button';
import { Edit2, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function DescriptionEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const t = useTranslations('Profile');

  return (
    <div className="mb-8 w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-[#111827]">{t('description')}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="text-secondary"
          onClick={() => setIsEditing((v) => !v)}
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
        className="min-h-[200px] w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-sm placeholder:text-gray-400"
      />
    </div>
  );
}
