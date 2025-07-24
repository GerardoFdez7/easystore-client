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
    <div className="mb-8 flex w-full flex-col items-center text-center">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-medium text-[#423f3d]">{t('description')}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#10b981]"
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
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
        className="min-h-[180px] w-full resize-none rounded-lg border border-gray-200 bg-[#f5f5f5] p-3 text-sm placeholder:text-gray-400"
      />
    </div>
  );
}
