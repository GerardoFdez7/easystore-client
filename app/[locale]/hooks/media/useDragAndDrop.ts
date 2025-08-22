import { useState, useRef } from 'react';
import {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CarouselApi } from '@shadcn/ui/carousel';
import { MediaItem } from '@lib/types/media';

interface UseDragAndDropProps {
  items: MediaItem[];
  onReorderItems?: (fromIndex: number, toIndex: number) => void;
  thumbsApi?: CarouselApi;
}

/**
 * Custom hook for managing drag and drop functionality
 */
export const useDragAndDrop = ({
  items,
  onReorderItems,
  thumbsApi,
}: UseDragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150, // Hold for 150ms to start dragging
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (_event: DragStartEvent) => {
    setIsDragging(true);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Auto-scroll carousel during drag
    if (!thumbsApi || !scrollContainerRef.current) return;

    const { over } = event;
    if (!over) return;

    const overIndex = items.findIndex((item) => item.id === over.id);
    if (overIndex !== -1) {
      // Auto-scroll to keep dragged item visible
      thumbsApi.scrollTo(overIndex);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over?.id && onReorderItems) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorderItems(oldIndex, newIndex);
      }
    }
  };

  return {
    isDragging,
    sensors,
    scrollContainerRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
