'use client';

import { useState, useRef } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@shadcn/ui/input';
import { Button } from '@shadcn/ui/button';
import { useTranslations } from 'next-intl';

export function ProfileLogo() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('Profile');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm">
        {image ? (
          <Image src={image} alt="Profile" className="object-cover" fill />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
        <button
          type="button"
          className="absolute right-1 bottom-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111827] shadow hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload logo"
        >
          <Camera className="h-5 w-5" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex w-full max-w-[260px] items-center gap-2">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border-gray-200 bg-white text-center"
          />
        ) : (
          <span className="flex-1 text-base font-semibold text-[#111827]">
            {name || t('defaultName')}
          </span>
        )}

        <Button
          type="button"
          size="icon"
          variant="ghost"
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
    </div>
  );
}
