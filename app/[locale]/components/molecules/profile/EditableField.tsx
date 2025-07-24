'use client';

import Input from '@atoms/shared/OutsideInput';
import { Label } from '@shadcn/ui/label';
import { Button } from '@shadcn/ui/button';
import { Edit2, Save } from 'lucide-react';
import { useState } from 'react';

export function EditableField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div className="mb-6 w-full">
      <Label className="mb-2 block font-medium text-[#423f3d]">{label}</Label>

      <div className="flex items-center gap-2">
        <Input
          value={currentValue}
          readOnly={!isEditing}
          onChange={(e) => setCurrentValue(e.target.value)}
          className="flex-1 border-gray-200 bg-white"
        />

        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="text-secondary"
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
