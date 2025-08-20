'use client';

import { useEffect, useRef, useState } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@shadcn/ui/input';
import { Button } from '@shadcn/ui/button';

export function ProfileLogo({
  name: nameProp,
  logoUrl,
  onNameSave,
  onLogoFile,
  loading = false,
}: {
  name?: string;
  logoUrl?: string | null;
  onNameSave?: (v: string) => void | Promise<unknown>;
  onLogoFile?: (f: File) => void | Promise<unknown>;
  loading?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(nameProp ?? '');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setName(nameProp ?? ''), [nameProp]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url); // preview
    void onLogoFile?.(file);
  };

  return (
    <div className="mb-8 flex w-full flex-col items-center">
      <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm sm:h-28 sm:w-28">
        {preview || logoUrl ? (
          <Image
            src={preview ?? (logoUrl as string)}
            alt="Profile"
            className="object-cover"
            fill
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}

        <button
          type="button"
          className="absolute right-1 bottom-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111827] shadow hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload logo"
          disabled={loading}
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

      <div className="mx-auto flex w-full max-w-[260px] items-center justify-center gap-2">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border-gray-200 bg-white text-center"
          />
        ) : (
          <span className="flex-1 text-center text-base font-semibold text-[#111827]">
            {nameProp ?? ''}
          </span>
        )}

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-secondary"
          onClick={() => {
            if (isEditing) void onNameSave?.(name);
            setIsEditing((v) => !v);
          }}
          aria-label={isEditing ? 'Save' : 'Edit'}
          disabled={loading}
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
