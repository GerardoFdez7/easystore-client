'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Unlink, Dices, Plus } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { Label } from '@shadcn/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import EmptyState from '@molecules/shared/EmptyState';
import AddSubcategoriesPicker from '@molecules/categories/detail/AddSubcategory';
import AddCategoryDialog, {
  type NewCategoryData,
} from '@molecules/categories/detail/AddCategoryDialog';
import { cn } from 'utils';

export type CategoryItem = {
  id: string;
  name: string;
  cover: string;
  description?: string;
  tags?: string[];
  selected?: boolean;
};

export type NewCategoryItem = {
  id: string;
  name: string;
  cover: string;
  description?: string;
  isNew?: boolean;
};

type Props = {
  items: CategoryItem[];
  currentCategoryId?: string; // Add current category ID to prevent self-selection
  disabled?: boolean;
  onAdd?: (categories: CategoryItem[]) => void;
  onRemove: (id: string) => void;
  onOrderChange?: (order: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onToggleSelect?: (id: string, value: boolean) => void;
  newCategories?: NewCategoryItem[];
  onNewCategoryAdd?: (category: NewCategoryItem) => void;
  mode?: 'category-management' | 'product-selection'; // New prop to control behavior
};

const CategoryPicker = React.memo<Props>(function CategoryPicker({
  items = [],
  currentCategoryId,
  disabled,
  onAdd,
  onRemove,
  newCategories = [],
  onNewCategoryAdd,
  mode = 'category-management', // Default to category management mode
}: Props) {
  const t = useTranslations('CategoryDetail');
  const tCategory = useTranslations('Category');

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddSubcategoriesOpen, setIsAddSubcategoriesOpen] = useState(false);

  // Track pending IDs to prevent duplicates during rapid additions
  const pendingIdsRef = useRef<Set<string>>(new Set());

  // Counter for guaranteed unique IDs
  const idCounterRef = useRef<number>(0);

  const excludeIds = useMemo(() => {
    const existingIds = items.map((i) => i.id);
    const newIds = newCategories.map((n) => n.id);
    return [...existingIds, ...newIds];
  }, [items, newCategories]);

  const allItems = useMemo(() => {
    // Combine items and newCategories, ensuring no duplicates by ID
    const combined = [...items, ...newCategories];
    const uniqueItems = combined.filter(
      (item, index, array) =>
        array.findIndex((i) => i.id === item.id) === index,
    );

    // Debug logging to track duplicate IDs
    if (combined.length !== uniqueItems.length) {
      console.warn('Duplicate IDs detected in allItems:', {
        original: combined.map((i) => i.id),
        unique: uniqueItems.map((i) => i.id),
        duplicates: combined
          .filter(
            (item, index, array) =>
              array.findIndex((i) => i.id === item.id) !== index,
          )
          .map((i) => i.id),
      });
    }

    return uniqueItems;
  }, [items, newCategories]);

  const handleRemove = useCallback(
    (id: string) => {
      // Only update local state - persistence will be handled during form submission
      onRemove(id);
    },
    [onRemove],
  );

  const handleAdd = useCallback(
    (categories: CategoryItem[]) => {
      if (onAdd) {
        onAdd(categories);
      }
    },
    [onAdd],
  );

  const handleNewCategoryAdd = useCallback(
    (categoryData: NewCategoryData) => {
      if (onNewCategoryAdd) {
        // Generate unique ID with enhanced real-time checking
        const generateUniqueId = (): string => {
          let attempts = 0;
          const maxAttempts = 10;

          while (attempts < maxAttempts) {
            // Increment counter for guaranteed uniqueness
            idCounterRef.current += 1;

            // Use timestamp + counter + random for maximum uniqueness
            const timestamp = Date.now();
            const counter = idCounterRef.current;
            const randomPart = crypto.randomUUID();

            const id = `temp-${timestamp}-${counter}-${randomPart}`;

            // Check uniqueness against all possible sources
            const existsInItems = items.some((item) => item.id === id);
            const existsInNewCategories = newCategories.some(
              (cat) => cat.id === id,
            );
            const existsInPending = pendingIdsRef.current.has(id);

            if (!existsInItems && !existsInNewCategories && !existsInPending) {
              return id;
            }

            attempts++;
            // Add small delay to ensure timestamp changes
            if (attempts < maxAttempts) {
              // Force timestamp to change by waiting 1ms
              const start = Date.now();
              while (Date.now() === start) {
                // Busy wait for 1ms
              }
            }
          }

          // Fallback with additional randomness if all attempts fail
          return `temp-${Date.now()}-${idCounterRef.current}-${Math.random().toString(36).substr(2, 9)}-${crypto.randomUUID()}`;
        };

        // Check if a category with the same name already exists
        const existingCategory = allItems.find(
          (item) => item.name.toLowerCase() === categoryData.name.toLowerCase(),
        );

        if (existingCategory) {
          // If category already exists, don't add duplicate
          console.warn(
            `Category with name "${categoryData.name}" already exists`,
          );
          setIsAddDialogOpen(false);
          return;
        }

        const newId = generateUniqueId();

        // Add to pending IDs immediately
        pendingIdsRef.current.add(newId);

        const newCategory: NewCategoryItem = {
          id: newId,
          name: categoryData.name,
          cover: categoryData.cover || '',
          description: categoryData.description,
          isNew: true,
        };

        onNewCategoryAdd(newCategory);

        // Remove from pending after a short delay to allow state updates
        setTimeout(() => {
          pendingIdsRef.current.delete(newId);
        }, 200); // Increased timeout to ensure state propagation
      }
      setIsAddDialogOpen(false);
    },
    [onNewCategoryAdd, items, newCategories, allItems, setIsAddDialogOpen],
  );

  const handleAddDialogOpen = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  return (
    <section className="space-y-4" aria-labelledby="subcategories-section">
      <header className="flex w-full flex-col items-center justify-end gap-2 sm:flex-row">
        {allItems.length > 0 && mode === 'category-management' && (
          <AddCategoryDialog onAdd={handleNewCategoryAdd}>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              aria-label={t('createSubcategory')}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              {t('createSubcategory')}
            </Button>
          </AddCategoryDialog>
        )}
        {allItems.length > 0 && (
          <AddSubcategoriesPicker
            className="w-full sm:w-auto"
            excludeIds={excludeIds}
            currentCategoryId={currentCategoryId}
            disabled={disabled}
            onAdd={handleAdd}
            open={isAddSubcategoriesOpen}
            onOpenChange={setIsAddSubcategoriesOpen}
            mode={mode}
          />
        )}
      </header>

      {allItems.length === 0 ? (
        mode === 'category-management' ? (
          <AddCategoryDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onAdd={handleNewCategoryAdd}
          >
            <EmptyState
              icon={Dices}
              title={tCategory('noSubcategoriesTitle')}
              description={tCategory('noSubcategoriesDescription')}
              buttonText={t('createSubcategory')}
              onButtonClick={handleAddDialogOpen}
              buttonIcon={Plus}
            />
          </AddCategoryDialog>
        ) : (
          <>
            <EmptyState
              icon={Dices}
              title={tCategory('noCategoriesTitle')}
              description={tCategory('noCategoriesDescriptionProductSelection')}
              buttonText={t('addCategory')}
              onButtonClick={() => setIsAddSubcategoriesOpen(true)}
              buttonIcon={Plus}
            />
            <AddSubcategoriesPicker
              className="hidden"
              excludeIds={excludeIds}
              currentCategoryId={currentCategoryId}
              disabled={disabled}
              onAdd={handleAdd}
              open={isAddSubcategoriesOpen}
              onOpenChange={setIsAddSubcategoriesOpen}
              mode={mode}
            />
          </>
        )
      ) : (
        <div
          className="overflow-hidden rounded-lg border bg-transparent"
          role="list"
        >
          {allItems.map((c) => {
            const isNewCategory = newCategories.some(
              (newCat) => newCat.id === c.id,
            );
            return (
              <article
                key={c.id}
                className={cn(
                  'border-border/30 grid grid-cols-[48px_1fr_auto] items-center gap-3 border-b px-4 py-3 last:border-none',
                  'sm:grid-cols-[48px_1fr_auto_auto_48px]',
                  'hover:bg-muted/50 transition-colors duration-200',
                  'focus-within:bg-muted/50 focus-within:ring-ring/20 focus-within:ring-2',
                  isNewCategory && 'bg-muted/50', // Visual indicator for new categories
                )}
                role="listitem"
                aria-label={`Subcategory: ${c.name}${isNewCategory ? ' (new)' : ''}`}
              >
                <div className="flex items-center justify-center">
                  <div className="border-border/20 bg-muted/30 relative h-10 w-10 overflow-hidden rounded-lg border">
                    {c.cover ? (
                      <Image
                        src={c.cover}
                        alt={`${c.name} category cover`}
                        fill
                        className="object-cover transition-transform duration-200 hover:scale-105"
                        sizes="40px"
                      />
                    ) : (
                      <div
                        className="bg-muted flex h-full w-full items-center justify-center"
                        role="img"
                        aria-label={`Default icon for ${c.name}`}
                      >
                        <Dices
                          className="text-muted-foreground h-4 w-4"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <Label
                    className="text-text font-medium"
                    id={`category-name-${c.name}`}
                  >
                    {c.name}
                  </Label>

                  {c.description && (
                    <Label
                      className="text-text text-xs"
                      id={`category-desc-${c.description}`}
                    >
                      {c.description}
                    </Label>
                  )}
                </div>

                <div className="hidden items-center justify-end sm:flex">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(c.id)}
                        disabled={disabled}
                        className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full p-0 transition-colors"
                        aria-label={`Remove ${c.name} subcategory`}
                        aria-describedby={`category-name-${c.name}`}
                      >
                        <Unlink className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('removeRelation')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="col-span-3 flex items-center justify-end sm:hidden">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(c.id)}
                        disabled={disabled}
                        className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full p-0 transition-colors"
                        aria-label={`Remove ${c.name} subcategory`}
                        aria-describedby={`category-name-${c.name}`}
                      >
                        <Unlink className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('removeRelation')}</TooltipContent>
                  </Tooltip>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
});

CategoryPicker.displayName = 'CategoryPicker';

export default CategoryPicker;
