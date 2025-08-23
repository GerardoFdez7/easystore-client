/**
 * Constants for MediaUploader component configuration
 */

/**
 * Default accepted file types for media upload
 */
export const DefaultAcceptedFileTypes: string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'video/mp4',
  'video/webm',
];

/**
 * Default maximum file size for images in MB
 * Images will be optimized during upload
 */
export const DefaultMaxImageSize = 10;

/**
 * Default maximum file size for videos in MB
 * Videos will be optimized during upload
 */
export const DefaultVideoSize = 100;

/**
 * Default settings for multiple file upload
 */
export const DefaultMultipleUpload = false;

/**
 * Default disabled state
 */
export const DefaultDisabled = false;

/**
 * Default maximum number of items
 */
export const DefaultMaxItems = 10;

/**
 * Default minimum number of items
 */
export const DefaultMinItems = 1;
