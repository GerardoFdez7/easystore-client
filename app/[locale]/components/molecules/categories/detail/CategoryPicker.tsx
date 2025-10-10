'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@shadcn/ui/button';
import { Unlink, Dices, Plus } from 'lucide-react';
import { cn } from 'utils';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import { Label } from '@shadcn/ui/label';
import { useMutation } from '@apollo/client/react';
import EmptyState from '@molecules/shared/EmptyState';
import AddSubcategoriesPicker from '@molecules/categories/detail/AddSubcategory';
import AddCategoryDialog, {
  type NewCategoryData,
} from '@molecules/categories/detail/AddCategoryDialog';
import {
  UpdateCategoryDocument,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '@graphql/generated';

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
  onAdd?: (ids: string[]) => void;
  onRemove: (id: string) => void;
  onOrderChange?: (order: 'asc' | 'desc') => void;
  onSearch?: (query: string) => void;
  onToggleSelect?: (id: string, value: boolean) => void;
  newCategories?: NewCategoryItem[];
  onNewCategoryAdd?: (category: NewCategoryItem) => void;
};

const CategoryPicker = React.memo<Props>(function CategoryPicker({
  items = [],
  currentCategoryId,
  disabled,
  onAdd,
  onRemove,
  newCategories = [],
  onNewCategoryAdd,
}: Props) {
  const t = useTranslations('CategoryDetail');
  const tCategory = useTranslations('Category');

  const [updateCategoryMutation] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, {});

  const excludeIds = useMemo(() => {
    const existingIds = items.map((i) => i.id);
    const newIds = newCategories.map((n) => n.id);
    return [...existingIds, ...newIds];
  }, [items, newCategories]);

  const handleRemove = useCallback(
    async (id: string) => {
      // Check if it's a new category first
      const isNewCategory = newCategories.some((cat) => cat.id === id);
      if (isNewCategory) {
        // Handle removal of new category (this would need to be implemented in parent)
        // For now, we'll still call onRemove as the parent should handle it
        onRemove(id);
      } else {
        // Handle removal of existing category by unlinking (setting parentId to null)
        try {
          await updateCategoryMutation({
            variables: {
              id,
              input: {
                parentId: null,
              },
            },
          });
          // Call onRemove to update the local state
          onRemove(id);
        } catch (_error) {}
      }
    },
    [onRemove, newCategories, updateCategoryMutation],
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAdd = useCallback(
    (ids: string[]) => {
      if (onAdd) {
        onAdd(ids);
      }
    },
    [onAdd],
  );

  const handleNewCategoryAdd = useCallback(
    (categoryData: NewCategoryData) => {
      if (onNewCategoryAdd) {
        const newCategory: NewCategoryItem = {
          id: `temp-${Date.now()}`, // Temporary ID for new categories
          name: categoryData.name,
          cover: categoryData.cover || '',
          description: categoryData.description,
          isNew: true,
        };
        onNewCategoryAdd(newCategory);
      }
      setIsAddDialogOpen(false);
    },
    [onNewCategoryAdd],
  );

  // Combine existing items and new categories for display
  const allItems = useMemo(() => {
    const newCategoryItems: CategoryItem[] = newCategories.map((newCat) => ({
      id: newCat.id,
      name: newCat.name,
      cover: newCat.cover,
      description: newCat.description,
    }));
    return [...items, ...newCategoryItems];
  }, [items, newCategories]);

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col items-center justify-end gap-2 sm:flex-row">
        {allItems.length > 0 && (
          <AddCategoryDialog onAdd={handleNewCategoryAdd}>
            <Button variant="outline" className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              {t('createSubcategory')}
            </Button>
          </AddCategoryDialog>
        )}
        <AddSubcategoriesPicker
          className="w-full sm:w-auto"
          excludeIds={excludeIds}
          currentCategoryId={currentCategoryId}
          disabled={disabled}
          onAdd={handleAdd}
        />
      </div>

      {allItems.length === 0 ? (
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
            onButtonClick={() => setIsAddDialogOpen(true)}
            buttonIcon={Plus}
          />
        </AddCategoryDialog>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-transparent">
          {allItems.map((c) => {
            const isNewCategory = newCategories.some(
              (newCat) => newCat.id === c.id,
            );
            return (
              <div
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
                      <div className="bg-muted flex h-full w-full items-center justify-center">
                        <Dices className="text-muted-foreground h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <Label className="text-text font-medium">{c.name}</Label>

                  {c.description && (
                    <Label className="text-text text-xs">{c.description}</Label>
                  )}
                </div>

                <div className="hidden items-center justify-end sm:flex">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleRemove(c.id)}
                        disabled={disabled}
                        className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full p-0 transition-colors"
                        aria-label={`Remove ${c.name} subcategory`}
                      >
                        <Unlink className="h-4 w-4" />
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
                        variant="ghost"
                        size="icon"
                        onClick={() => void handleRemove(c.id)}
                        disabled={disabled}
                        className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full p-0 transition-colors"
                        aria-label={`Remove ${c.name} subcategory`}
                      >
                        <Unlink className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('removeRelation')}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

CategoryPicker.displayName = 'CategoryPicker';

export default CategoryPicker;
