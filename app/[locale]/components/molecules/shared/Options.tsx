'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Trash2, Archive } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@shadcn/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@shadcn/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@shadcn/ui/alert-dialog';

export interface OptionItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'destructive';
  onClick?: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
}

interface OptionsProps {
  options?: OptionItem[];
  showDelete?: boolean;
  onDelete?: () => Promise<void> | void;
  deleteTitle?: string;
  deleteDescription?: string;
  deleteButtonText?: string;
  showArchive?: boolean;
  onArchive?: () => Promise<void> | void;
  archiveTitle?: string;
  archiveDescription?: string;
  archiveButtonText?: string;
  disabled?: boolean;
  tooltipContent?: string;
  className?: string;
  wrapperClassName?: string;
}

export default function Options({
  options = [],
  showDelete = false,
  onDelete,
  deleteTitle,
  deleteDescription,
  deleteButtonText,
  showArchive = false,
  onArchive,
  archiveTitle,
  archiveDescription,
  archiveButtonText,
  disabled = false,
  tooltipContent,
  className = '',
  wrapperClassName = '',
}: OptionsProps) {
  const t = useTranslations('Shared.options');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDeleteClick = () => {
    setDropdownOpen(false); // Close dropdown first
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete();
    } catch (_error) {
      // Error handling
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  const handleArchiveClick = () => {
    setDropdownOpen(false); // Close dropdown first
    setShowArchiveDialog(true);
  };

  const handleArchiveConfirm = async () => {
    if (!onArchive) return;

    setIsArchiving(true);
    try {
      await onArchive();
    } catch (_error) {
      // Error handling
    } finally {
      setIsArchiving(false);
      setShowArchiveDialog(false);
    }
  };

  const handleArchiveCancel = () => {
    setShowArchiveDialog(false);
  };

  const handleOptionClick = (option: OptionItem) => {
    if (option.onClick && !option.disabled) {
      option.onClick();
    }
  };

  // Combine custom options with archive and delete options if enabled
  // Separate regular options from destructive actions
  const regularOptions = [...options];
  const destructiveOptions = [];

  if (showArchive) {
    regularOptions.push({
      id: 'archive',
      label: t('archive'),
      icon: Archive,
      variant: 'default' as const,
      onClick: handleArchiveClick,
      disabled: disabled,
    });
  }

  if (showDelete) {
    destructiveOptions.push({
      id: 'delete',
      label: t('delete'),
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: handleDeleteClick,
      disabled: disabled,
    });
  }

  const allOptions = [...regularOptions, ...destructiveOptions];

  // Don't render if no options available
  if (allOptions.length === 0) {
    return null;
  }

  const defaultTooltipContent = tooltipContent || t('options');

  return (
    <nav
      className={`flex justify-end ${wrapperClassName}`}
      aria-label="options"
    >
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                className={`h-8 w-8 p-0 ${className}`}
                aria-label={defaultTooltipContent}
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{defaultTooltipContent}</TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end" className="w-48" role="menu">
          <DropdownMenuLabel>{t('options')}</DropdownMenuLabel>
          {regularOptions.map((option) => {
            const IconComponent = option.icon;
            const menuItem = (
              <DropdownMenuItem
                key={option.id}
                variant={option.variant}
                disabled={option.disabled}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer"
                role="menuitem"
                aria-label={option.label}
              >
                {IconComponent && (
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                )}
                {option.label}
              </DropdownMenuItem>
            );

            // Wrap in tooltip if disabled and tooltip text is provided
            if (option.disabled && option.disabledTooltip) {
              return (
                <Tooltip key={option.id}>
                  <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
                  <TooltipContent side="left">
                    {option.disabledTooltip}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return menuItem;
          })}
          {destructiveOptions.length > 0 && regularOptions.length > 0 && (
            <DropdownMenuSeparator />
          )}
          {destructiveOptions.map((option) => {
            const IconComponent = option.icon;
            const menuItem = (
              <DropdownMenuItem
                key={option.id}
                variant={option.variant}
                disabled={option.disabled}
                onClick={() => handleOptionClick(option)}
                className="cursor-pointer"
                role="menuitem"
                aria-label={option.label}
              >
                {IconComponent && (
                  <IconComponent className="h-4 w-4" aria-hidden="true" />
                )}
                {option.label}
              </DropdownMenuItem>
            );

            return menuItem;
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteTitle || t('confirmDelete')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteDescription || t('deleteDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleDeleteCancel}
              disabled={isDeleting}
            >
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void handleDeleteConfirm()}
              disabled={isDeleting}
              className="bg-error hover:bg-error/90 text-white"
            >
              {isDeleting ? t('deleting') : deleteButtonText || t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Confirmation Dialog */}
      <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {archiveTitle || `${t('archive')}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {archiveDescription || t('archiveDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleArchiveCancel}
              disabled={isArchiving}
            >
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void handleArchiveConfirm()}
              disabled={isArchiving}
            >
              {isArchiving
                ? `${t('archive')}...`
                : archiveButtonText || t('archive')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
}
