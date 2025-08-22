/**
 * Media optimization utilities for file processing and ImageKit transformations
 */

/**
 * Checks if a file type is a video format
 * @param fileType - The MIME type of the file
 * @returns True if the file is a video, false otherwise
 */
export const isVideoFile = (fileType: string): boolean => {
  return fileType.startsWith('video/');
};

/**
 * Generates an optimized file name with timestamp and aspect ratio suffix
 * @param originalName - The original file name
 * @param fileType - The MIME type of the file
 * @returns Optimized file name with appropriate suffix
 */
export const generateOptimizedFileName = (
  originalName: string,
  fileType: string,
): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const isVideo = isVideoFile(fileType);
  const timestamp = Date.now();

  if (isVideo) {
    return `${nameWithoutExt}_optimized_16-9_${timestamp}`;
  } else {
    return `${nameWithoutExt}_optimized_4-3_${timestamp}`;
  }
};

/**
 * Gets ImageKit transformation parameters based on file type
 * @param fileType - The MIME type of the file
 * @returns ImageKit transformation object for images, undefined for videos
 */
export const getImageKitTransformations = (fileType: string) => {
  const isVideo = isVideoFile(fileType);

  if (isVideo) {
    return;
  } else {
    // WebP format, quality optimization
    return {
      transformation: {
        pre: 'cm-pad_resize,q-80,f-webp,pr-true',
      },
    };
  }
};
