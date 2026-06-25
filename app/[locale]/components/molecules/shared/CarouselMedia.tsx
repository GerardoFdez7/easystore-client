'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@shadcn/ui/carousel';
import { Button } from '@shadcn/ui/button';
import ImageThumb from '@atoms/shared/ImageThumb';
import VideoThumb from '@atoms/shared/VideoThumb';
import { Separator } from '@shadcn/ui/separator';
import { X, Plus } from 'lucide-react';
import { cn } from 'utils';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MediaItem } from '@lib/types/media';
import { useCarouselNavigation } from '@hooks/media/useCarouselNavigation';
import { useDragAndDrop } from '@hooks/media/useDragAndDrop';
import { useTranslations } from 'next-intl';

interface CarouselMediaProps {
  items: MediaItem[];
  className?: string;
  autoScroll?: boolean;
  isEditing?: boolean;
  onRemoveItem?: (index: number) => void;
  onReorderItems?: (fromIndex: number, toIndex: number) => void;
  onAddMore?: () => void;
  maxItems?: number;
  minItems?: number;
}

// Sortable Item Component
interface SortableItemProps {
  id: string;
  index: number;
  item: MediaItem;
  selectedIndex: number;
  isEditing: boolean;
  onThumbClick: (index: number) => void;
  onRemoveItem?: (index: number) => void;
  minItems: number;
  orderedItemsLength: number;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  index,
  item,
  selectedIndex,
  isEditing,
  onThumbClick,
  onRemoveItem,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        touchAction: isEditing ? 'none' : 'auto', // Prevent default touch behaviors during editing
      }}
      className={cn(
        'relative transition-all duration-200',
        isEditing && 'cursor-move touch-none', // Add touch-none class
        isDragging && 'z-50',
      )}
      {...attributes}
      {...(isEditing ? listeners : {})}
    >
      {item.type === 'image' ? (
        <ImageThumb
          key={item.id}
          onClick={() => onThumbClick(index)}
          selected={index === selectedIndex}
          index={index}
          imageSrc={item.src}
          altText={item.alt}
        />
      ) : (
        <VideoThumb
          key={item.id}
          onClick={() => onThumbClick(index)}
          selected={index === selectedIndex}
          index={index}
          videoSrc={item.src}
          altText={item.alt}
        />
      )}

      {/* Remove button in editing mode */}
      {isEditing && onRemoveItem && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveItem(index);
          }}
          className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
          size="sm"
        >
          <X className="h-3 w-3 text-gray-600" />
        </Button>
      )}

      {/* Position number in editing mode */}
      {isEditing && (
        <div className="text-title bg-hover/70 absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
          {index + 1}
        </div>
      )}
    </div>
  );
};

const CarouselMedia = ({
  items,
  className,
  autoScroll = false,
  isEditing = false,
  onRemoveItem,
  onReorderItems,
  onAddMore,
  maxItems = 10,
  minItems = 0,
}: CarouselMediaProps) => {
  const orderedItems = items;
  const t = useTranslations('Media');

  const { selectedIndex, thumbsApi, setMainApi, setThumbsApi, onThumbClick } =
    useCarouselNavigation();

  const {
    isDragging,
    sensors,
    scrollContainerRef,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop({
    items: orderedItems,
    onReorderItems,
    thumbsApi,
  });

  return (
    <div className={cn('embla sm:m-2', className)}>
      {/* Main Carousel */}
      <Carousel
        setApi={setMainApi}
        opts={{
          align: 'start',
          loop: false,
          watchDrag: true,
        }}
        autoScroll={autoScroll}
      >
        <CarouselContent>
          {orderedItems.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative mx-auto mb-3 aspect-square max-w-md lg:max-w-lg">
                {item.type === 'image' ? (
                  item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="rounded-lg object-cover transition-opacity"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                      <div className="bg-muted-foreground/20 h-16 w-16 rounded-lg" />
                    </div>
                  )
                ) : item.src ? (
                  <video
                    className="h-full w-full rounded-lg object-cover transition-opacity"
                    controls
                    src={item.src}
                    aria-label={item.alt}
                    preload="metadata"
                    autoPlay
                    muted
                  />
                ) : (
                  <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                    <div className="bg-muted-foreground/20 h-16 w-16 rounded-lg" />
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Carousel */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Carousel
          setApi={setThumbsApi}
          className="mx-auto max-w-60 rounded-xl sm:max-w-xl"
          opts={{
            containScroll: 'keepSnaps',
            dragFree: !isDragging,
            align: 'start',
            startIndex: 0,
            watchDrag: !isDragging,
          }}
        >
          <CarouselContent className="gap-2 lg:gap-3" ref={scrollContainerRef}>
            <SortableContext
              items={orderedItems.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              {orderedItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <CarouselItem className="basis-auto" role="group">
                    <div className="flex flex-col items-center">
                      <SortableItem
                        id={item.id}
                        index={index}
                        item={item}
                        selectedIndex={selectedIndex}
                        isEditing={isEditing}
                        onThumbClick={onThumbClick}
                        onRemoveItem={onRemoveItem}
                        minItems={minItems}
                        orderedItemsLength={orderedItems.length}
                      />

                      {index === 0 && (
                        <span className="text-title mt-1 font-medium">
                          {t('cover')}
                        </span>
                      )}
                    </div>
                  </CarouselItem>
                  {index === 0 && orderedItems.length >= 2 && (
                    <div className="flex items-start">
                      <Separator
                        orientation="vertical"
                        className="bg-title !h-20 sm:!h-35"
                        decorative={true}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* Add more button in editing mode */}
              {isEditing && onAddMore && orderedItems.length < maxItems && (
                <CarouselItem className="basis-auto">
                  <div
                    onClick={onAddMore}
                    className="relative aspect-square min-w-20 flex-[0_0_15%] cursor-pointer overflow-hidden rounded-lg sm:min-w-35 sm:flex-[0_0_23%]"
                  >
                    <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                </CarouselItem>
              )}
            </SortableContext>
          </CarouselContent>
        </Carousel>
      </DndContext>
    </div>
  );
};

export default CarouselMedia;
