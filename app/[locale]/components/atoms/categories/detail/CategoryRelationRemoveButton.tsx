'use client';

import React from 'react';
import { Unlink } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';

export interface CategoryRelationRemoveButtonProps {
  categoryName: string;
  disabled?: boolean;
  containerClassName: string;
  tooltip: React.ReactNode;
  onRemove: () => void;
}

export default function CategoryRelationRemoveButton({
  categoryName,
  disabled,
  containerClassName,
  tooltip,
  onRemove,
}: CategoryRelationRemoveButtonProps) {
  return (
    <div className={containerClassName}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            disabled={disabled}
            className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full p-0 transition-colors"
            aria-label={`Remove ${categoryName} subcategory`}
            aria-describedby={`category-name-${categoryName}`}
          >
            <Unlink className="h-4 w-4" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </div>
  );
}
