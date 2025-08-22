'use client';

import { useState, useCallback, useEffect } from 'react';
import { CarouselApi } from '@shadcn/ui/carousel';

/**
 * Custom hook for managing carousel navigation and synchronization
 */
export const useCarouselNavigation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>();

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const newIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    // Ensure thumbnail carousel shows the selected item
    // thumbsApi.scrollTo(newIndex); // Commented out as in original
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect).on('reInit', onSelect);

    // Cleanup function
    return () => {
      mainApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [mainApi, onSelect]);

  return {
    selectedIndex,
    mainApi,
    thumbsApi,
    setMainApi,
    setThumbsApi,
    onThumbClick,
  };
};
