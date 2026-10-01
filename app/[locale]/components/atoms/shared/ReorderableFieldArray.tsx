import React from 'react';
import ArrayItemBox from '@atoms/shared/ArrayItemBox';

type Direction = 'up' | 'down';

export interface ReorderableFieldArrayProps {
  items: readonly { id: string }[];
  onMove: (index: number, direction: Direction) => void;
  onRemove: (index: number) => void;
  renderItem: (index: number) => React.ReactNode;
  t: (key: string) => string;
}

export default function ReorderableFieldArray({
  items,
  onMove,
  onRemove,
  renderItem,
  t,
}: ReorderableFieldArrayProps) {
  return (
    <div className="border-border bg-muted/10 rounded-lg border p-8">
      <div className="space-y-3">
        {items.map((item, index) => (
          <ArrayItemBox
            key={item.id}
            index={index}
            canMoveUp={index > 0}
            canMoveDown={index < items.length - 1}
            onMoveUp={() => onMove(index, 'up')}
            onMoveDown={() => onMove(index, 'down')}
            onDelete={() => onRemove(index)}
            t={t}
          >
            {renderItem(index)}
          </ArrayItemBox>
        ))}
      </div>
    </div>
  );
}
