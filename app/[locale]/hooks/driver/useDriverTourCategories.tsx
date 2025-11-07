'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const storageKey = 'easystore:categoriesTourSeen_v1';

export default function useDriverTourCategories() {
  const t = useTranslations('Category');
  const tDetail = useTranslations('CategoryDetail');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (localStorage.getItem(storageKey)) return;
    } catch (_e) {
      // ignore localStorage errors
    }

    type DriverType = {
      defineSteps?: (steps: unknown) => void;
      start?: () => void;
      drive?: () => void;
      on?: (event: string, cb: (...args: unknown[]) => void) => void;
      destroy?: () => void;
      reset?: () => void;
    };

    let driverInstance: DriverType | null = null;
    let fallbackId: number | undefined;

    const run = async () => {
      try {
        const mod = (await import('driver.js')) as unknown;
        const modUnknown = mod as unknown;
        const ctorCandidate =
          (modUnknown as { default?: unknown }).default ?? modUnknown;

        const DriverConstructor = ctorCandidate as unknown as new (
          opts: Record<string, unknown>,
        ) => DriverType;

        const driverObj = new DriverConstructor({
          opacity: 0.55,
          padding: 10,
          animate: true,
          doneBtnText: t('tour.done') || 'Done',
          closeBtnText: t('tour.close') || 'Close',
          nextBtnText: t('tour.next') || 'Next',
          prevBtnText: t('tour.prev') || 'Prev',
        });

        driverInstance = driverObj;

        const steps = [
          // Main categories page
          {
            element: '[data-tour="categories-controls"]',
            popover: {
              title: t('tour.controlsTitle') || 'Category controls',
              description:
                t('tour.controlsDesc') ||
                'Search, sort and add new categories here.',
            },
          },
          {
            element: '[data-tour="categories-search"]',
            popover: {
              title: t('tour.searchTitle') || 'Search',
              description:
                t('tour.searchDesc') ||
                'Use this search box to find categories by name.',
            },
          },
          {
            element: '[data-tour="categories-sort-by"]',
            popover: {
              title: t('tour.sortByTitle') || 'Sort by',
              description:
                t('tour.sortByDesc') || 'Choose how categories are ordered.',
            },
          },
          {
            element: '[data-tour="categories-sort-order"]',
            popover: {
              title: t('tour.sortOrderTitle') || 'Sort order',
              description:
                t('tour.sortOrderDesc') ||
                'Toggle ascending or descending order.',
            },
          },
          {
            element: '[data-tour="categories-add"]',
            popover: {
              title: t('tour.addTitle') || 'Add your first category',
              description:
                t('tour.addDesc') ||
                'Click here to create your first category.',
            },
          },
          {
            element: '[data-tour="categories-breadcrumb-all"]',
            popover: {
              title: t('tour.breadcrumbAllTitle') || 'All categories',
              description:
                t('tour.breadcrumbAllDesc') ||
                'Go back to the parent category listing.',
            },
          },
          {
            element: '[data-tour="categories-breadcrumb-siblings"]',
            popover: {
              title: t('tour.breadcrumbSiblingTitle') || 'Sibling categories',
              description:
                t('tour.breadcrumbSiblingDesc') ||
                'Switch to a sibling category from this level.',
            },
          },
          {
            element: '[data-tour="categories-breadcrumb"]',
            popover: {
              title: t('tour.breadcrumbTitle') || 'Breadcrumb',
              description:
                t('tour.breadcrumbDesc') || 'Navigate between category levels.',
            },
          },
          {
            element: '[data-tour="categories-grid"]',
            popover: {
              title: t('tour.gridTitle') || 'Categories grid',
              description:
                t('tour.gridDesc') ||
                'See and manage categories in a grid view.',
            },
          },
          {
            element: '[data-tour="category-card-cover"]',
            popover: {
              title: t('tour.cardTitle') || 'Category card',
              description:
                t('tour.cardDesc') ||
                'Open the category details by clicking the card.',
            },
          },
          {
            element: '[data-tour="category-card-name"]',
            popover: {
              title: t('tour.cardTitle') || 'Category card',
              description:
                t('tour.cardDesc') ||
                'Open the category details by clicking the card.',
            },
          },
          {
            element: '[data-tour="category-card-edit"]',
            popover: {
              title: t('tour.cardEditTitle') || 'Edit category',
              description:
                t('tour.cardEditDesc') || "Edit this category's details.",
            },
          },
          {
            element: '[data-tour="category-card-delete"]',
            popover: {
              title: t('tour.cardDeleteTitle') || 'Delete category',
              description: t('tour.cardDeleteDesc') || 'Delete this category.',
            },
          },
          {
            element: '[data-tour="categories-tree"]',
            popover: {
              title: t('tour.treeTitle') || 'Category tree',
              description:
                t('tour.treeDesc') ||
                'Browse the full category tree on the side.',
            },
          },
          {
            element: '[data-tour="categories-tree-title"]',
            popover: {
              title: t('tour.treeTitle') || 'Category tree',
              description:
                t('tour.treeDesc') ||
                'Browse the full category tree on the side.',
            },
          },
          {
            element: '[data-tour="categories-tree-toggle-all"]',
            popover: {
              title: t('tour.treeToggleTitle') || 'Toggle tree',
              description:
                t('tour.treeToggleDesc') ||
                'Open or close the category tree panel.',
            },
          },
          {
            element: '[data-tour="categories-load-more"]',
            popover: {
              title: t('tour.loadMoreTitle') || 'Load more',
              description:
                t('tour.loadMoreDesc') ||
                'Load more categories when available.',
            },
          },
          // Detail page
          {
            element: '[data-tour="category-cover"]',
            popover: {
              title: tDetail('tour.coverTitle') || 'Cover image',
              description:
                tDetail('tour.coverDesc') ||
                'Upload a cover image for this category.',
            },
          },
          {
            element: '[data-tour="category-name"]',
            popover: {
              title: tDetail('tour.nameTitle') || 'Category name',
              description:
                tDetail('tour.nameDesc') || 'Enter the category name here.',
            },
          },
          {
            element: '[data-tour="categorypicker-add"]',
            popover: {
              title: tDetail('tour.pickerAddTitle') || 'Add subcategory',
              description:
                tDetail('tour.pickerAddDesc') ||
                'Use this control to add existing subcategories to the category.',
            },
          },
          {
            element: '[data-tour="categorypicker-empty-add"]',
            popover: {
              title:
                tDetail('tour.pickerEmptyAddTitle') || 'Create subcategory',
              description:
                tDetail('tour.pickerEmptyAddDesc') ||
                'Create a new subcategory when none exist yet.',
            },
          },
          {
            element: '[data-tour="category-description"]',
            popover: {
              title: tDetail('tour.descriptionTitle') || 'Description',
              description:
                tDetail('tour.descriptionDesc') ||
                'Add a short description for this category.',
            },
          },
          {
            element: '[data-tour="category-subcategories"]',
            popover: {
              title: tDetail('tour.subcategoriesTitle') || 'Subcategories',
              description:
                tDetail('tour.subcategoriesDesc') ||
                'Add or remove subcategories for this category.',
            },
          },
          {
            element: '[data-tour="category-save"]',
            popover: {
              title: tDetail('tour.saveTitle') || 'Save',
              description:
                tDetail('tour.saveDesc') || 'Save your changes here.',
            },
          },
          {
            element: '[data-tour="category-options"]',
            popover: {
              title: tDetail('tour.optionsTitle') || 'Options',
              description:
                tDetail('tour.optionsDesc') ||
                'Delete or manage extra options for this category.',
            },
          },
        ];

        if (typeof driverObj.defineSteps === 'function') {
          driverObj.defineSteps(steps as unknown);
        }

        if (typeof driverObj.drive === 'function') {
          driverObj.drive();
        } else if (typeof driverObj.start === 'function') {
          driverObj.start();
        }

        const markSeen = () => {
          try {
            localStorage.setItem(storageKey, '1');
          } catch (_e) {
            /* ignore */
          }
        };

        if (typeof driverObj.on === 'function') {
          try {
            driverObj.on('complete', markSeen);
            driverObj.on('destroy', markSeen);
            driverObj.on('stop', markSeen);
          } catch (_e) {
            /* ignore */
          }
        } else {
          fallbackId = window.setTimeout(markSeen, 1000 * 60 * 5);
        }
      } catch (_err) {
        // ignore
      }
    };

    void run();

    return () => {
      try {
        if (typeof fallbackId !== 'undefined') clearTimeout(fallbackId);
      } catch (_e) {
        /* ignore */
      }
      try {
        driverInstance?.reset?.();
        driverInstance?.destroy?.();
      } catch (_e) {
        /* ignore */
      }
    };
  }, [t, tDetail]);
}
