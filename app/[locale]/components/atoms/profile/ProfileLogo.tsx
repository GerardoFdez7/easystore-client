'use client';

import { useState, useRef } from 'react';
import { Edit2, Save, Camera } from 'lucide-react';
import Image from 'next/image';
import Input from '@atoms/shared/OutsideInput';
import { Button } from '@shadcn/ui/button';

export function ProfileLogo() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="mb-8 flex flex-col items-center text-center">
      {/* Imagen de perfil */}
      <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border border-gray-200 bg-white">
        {image ? (
          <Image src={image} alt="Profile" className="object-cover" fill />
        ) : (
          <div className="h-full w-full bg-[#f3f3f3]" />
        )}
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="absolute right-1 bottom-1 rounded-full bg-white p-1.5 text-[#423f3d] shadow hover:bg-gray-100"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-5 w-5" />
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Nombre editable */}
      <div className="flex w-full max-w-[220px] items-center gap-2">
        {isEditing ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border-gray-200 bg-white text-center"
          />
        ) : (
          <span className="flex-1 text-lg font-semibold text-[#423f3d]">
            {name || 'Your Name'}
          </span>
        )}

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-[#10b981]"
          onClick={() => setIsEditing((prev) => !prev)}
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
