'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@shadcn/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shadcn/ui/dropdown-menu';
import { useCategoryPathNames, CategoryInfo } from '@hooks/domains/category';

interface CategoryBreadcrumbProps {
  categoryPath: string[];
}

export default function CategoryBreadcrumb({
  categoryPath,
}: CategoryBreadcrumbProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Category');

  const { breadcrumbItems, siblingCategories, loading, error } =
    useCategoryPathNames(categoryPath);

  const handleCategoryClick = useCallback(
    (categorySlug: string, parentPath: string[]) => {
      const newPath = [...parentPath, categorySlug];
      const href = `/${locale}/categories/${newPath.join('/')}`;
      router.push(href);
    },
    [locale, router],
  );

  if (loading || error || breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb Navigation" role="navigation">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/${locale}/categories`}
              className="hover:text-title transition-colors"
              aria-label={t('allCategories')}
            >
              {t('allCategories')}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const currentSiblings = siblingCategories[index] || [];
            const hasMultipleSiblings = currentSiblings.length > 1;

            return (
              <div key={`${item.name}-${index}`} className="flex items-center">
                <BreadcrumbSeparator aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium" aria-current="page">
                      {item.name}
                    </BreadcrumbPage>
                  ) : hasMultipleSiblings ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-title h-auto p-0 font-normal transition-colors"
                          aria-label="category Options"
                          aria-haspopup="menu"
                          aria-expanded="false"
                        >
                          {item.name}
                          <ChevronDown
                            className="ml-1 h-3 w-3"
                            aria-hidden="true"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        role="menu"
                        aria-label="sibling Categories"
                      >
                        {currentSiblings.map((sibling: CategoryInfo) => (
                          <DropdownMenuItem
                            key={sibling.slug}
                            onClick={() =>
                              handleCategoryClick(sibling.slug, item.parentPath)
                            }
                            className="cursor-pointer text-sm"
                            role="menuitem"
                            tabIndex={0}
                          >
                            {sibling.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <BreadcrumbLink
                      href={`/${locale}/categories/${item.fullPath.join('/')}`}
                      className="hover:text-title transition-colors"
                      aria-label="navigate To Category"
                    >
                      {item.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
