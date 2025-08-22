import { MediaItem, ProcessedData } from '@lib/types/media';

/**
 * Utility functions for media processing and validation
 */

/**
 * Converts files to media items for carousel display
 */
export const filesToMediaItems = (files: File[]): MediaItem[] => {
  return files.map((file, index) => ({
    id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
    type: file.type.startsWith('video/')
      ? ('video' as const)
      : ('image' as const),
    src: URL.createObjectURL(file),
    alt: file.name,
    file,
  }));
};

/**
 * Validates file count for multiple upload mode during file selection
 * Only checks maximum count, not minimum (allows adding files one by one)
 */
export const validateFileCount = (
  files: File[],
  multiple: boolean,
  maxItems: number = 10,
  translateFn?: (key: string, params?: Record<string, string>) => string,
): { isValid: boolean; error?: string } => {
  if (multiple && files.length > maxItems) {
    return {
      isValid: false,
      error: translateFn
        ? translateFn('maxFilesExceeded', { maxItems: maxItems.toString() })
        : `Cannot upload more than ${maxItems} media files`,
    };
  }

  return { isValid: true };
};

/**
 * Validates file count for upload submission (Done button)
 * Checks both minimum and maximum requirements
 */
export const validateFileCountForSubmission = (
  files: File[],
  multiple: boolean,
  maxItems: number = 10,
  minItems: number = 2,
  translateFn?: (key: string, params?: Record<string, string>) => string,
): { isValid: boolean; error?: string } => {
  if (multiple && files.length > maxItems) {
    return {
      isValid: false,
      error: translateFn
        ? translateFn('maxFilesExceeded', { maxItems: maxItems.toString() })
        : `Cannot upload more than ${maxItems} media files`,
    };
  }

  if (multiple && files.length < minItems) {
    return {
      isValid: false,
      error: translateFn
        ? translateFn('minFilesRequired', { minItems: minItems.toString() })
        : `At least ${minItems} media files are required`,
    };
  }

  return { isValid: true };
};

/**
 * Prepares processed data structure for database persistence
 */
export const prepareProcessedData = (
  urls: string[],
  selectedFiles: File[],
  multiple: boolean,
): ProcessedData => {
  if (multiple && urls.length >= 1) {
    const cover = urls[0]; // First element goes to cover field
    const mediaItems = urls.slice(1).map((url, index) => ({
      url,
      position: index + 1, // Position starts from 1 for additional media
      mediaType: selectedFiles[index + 1]?.type.startsWith('video/')
        ? ('VIDEO' as const)
        : ('IMAGE' as const),
    }));

    return { cover, mediaItems };
  } else {
    // Single mode - just pass the URL as cover
    return { cover: urls[0], mediaItems: [] };
  }
};

/**
 * Updates media items with uploaded URLs
 */
export const updateMediaItemsWithUrls = (
  mediaItems: MediaItem[],
  urls: string[],
): MediaItem[] => {
  return mediaItems.map((item, index) => ({
    ...item,
    src: urls[index] || item.src, // Use uploaded URL or keep original
  }));
};

/**
 * Cleans up object URLs to prevent memory leaks
 */
export const cleanupObjectUrls = (mediaItems: MediaItem[]): void => {
  mediaItems.forEach((item) => {
    if (item.file && item.src.startsWith('blob:')) {
      URL.revokeObjectURL(item.src);
    }
  });
};

/**
 * Reorders arrays maintaining synchronization between media items and files
 */
export const reorderArrays = <T, U>(
  array1: T[],
  array2: U[],
  fromIndex: number,
  toIndex: number,
): { reorderedArray1: T[]; reorderedArray2: U[] } => {
  const newArray1 = [...array1];
  const newArray2 = [...array2];

  // Reorder both arrays
  const [movedItem1] = newArray1.splice(fromIndex, 1);
  const [movedItem2] = newArray2.splice(fromIndex, 1);
  newArray1.splice(toIndex, 0, movedItem1);
  newArray2.splice(toIndex, 0, movedItem2);

  return {
    reorderedArray1: newArray1,
    reorderedArray2: newArray2,
  };
};
