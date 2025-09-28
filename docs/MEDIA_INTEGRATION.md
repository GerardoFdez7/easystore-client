# Media Integration Documentation

This document provides comprehensive documentation for the media integration implementation in the EasyStore application, covering hooks, types, utilities, and components for handling media upload and management.

## Table of Contents

1. [Media Hooks](#media-hooks)
2. [Type Definitions](#type-definitions)
3. [Constants](#constants)
4. [Utility Functions](#utility-functions)
5. [Media Components](#media-components)
6. [Usage Examples](#usage-examples)

## Media Hooks

### Location: `app/[locale]/hooks/media/`

The media hooks provide reusable logic for handling various aspects of media management.

#### `useCarouselNavigation`

Manages carousel navigation and synchronization between main and thumbnail carousels.

**Purpose**: Synchronizes main carousel with thumbnail navigation and handles selection state.

**Returns**:

```typescript
{
  selectedIndex: number;
  mainApi: CarouselApi | undefined;
  thumbsApi: CarouselApi | undefined;
  setMainApi: (api: CarouselApi) => void;
  setThumbsApi: (api: CarouselApi) => void;
  onThumbClick: (index: number) => void;
}
```

**Usage**:

```typescript
const { selectedIndex, setMainApi, setThumbsApi, onThumbClick } =
  useCarouselNavigation();
```

#### `useDragAndDrop`

Handles drag and drop functionality for reordering media items.

**Props**:

```typescript
interface UseDragAndDropProps {
  items: MediaItem[];
  onReorderItems?: (fromIndex: number, toIndex: number) => void;
  thumbsApi?: CarouselApi;
}
```

**Returns**:

```typescript
{
  isDragging: boolean;
  sensors: SensorDescriptor<any>[];
  scrollContainerRef: RefObject<HTMLDivElement>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}
```

**Features**:

- 150ms activation delay to prevent accidental drags
- Auto-scroll during drag operations
- Keyboard accessibility support

#### `useFileUpload`

Handles file upload logic with ImageKit integration.

**Props**:

```typescript
interface UseFileUploadProps {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadError?: (error: string) => void;
  authenticator?: () => Promise<MediaAuthResponse>;
}
```

**Returns**:

```typescript
{
  isUploading: boolean;
  handleFileSelect: (files: File[]) => Promise<void>;
}
```

**Features**:

- Automatic file optimization
- Progress tracking
- Error handling with localized messages

#### `useMediaState`

Manages the internal state of media uploaders.

**Returns**:

```typescript
{
  // State
  isEditing: boolean;
  selectedFiles: File[];
  isProcessing: boolean;
  persistedMedia: { url: string } | string[] | null;
  mediaItems: MediaItem[];
  uploadedUrlsRef: MutableRefObject<string[]>;
  expectedFileCountRef: MutableRefObject<number>;

  // State setters
  setIsEditing: (editing: boolean) => void;
  setSelectedFiles: (files: File[]) => void;
  setIsProcessing: (processing: boolean) => void;
  setPersistedMedia: (media: { url: string } | string[] | null) => void;
  setMediaItems: (items: MediaItem[]) => void;

  // Utility functions
  resetState: () => void;
  resetUploadTracking: () => void;
}
```

#### `useMediaToken`

Manages authentication tokens for media uploads with automatic refresh.

**Returns**:

```typescript
{
  cachedToken: MediaAuthResponse | null;
  isInitialLoading: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  authenticator: () => Promise<MediaAuthResponse>;
}
```

**Features**:

- Automatic token refresh every 55 minutes
- Silent background refresh
- Error recovery with retry logic

#### `useMediaUploadLogic`

Orchestrates the complete media upload process, combining all other hooks.

**Props**:

```typescript
interface UseMediaUploadLogicProps extends MediaUploaderCallbacks {
  multiple?: boolean;
}
```

**Returns**:

```typescript
{
  // State
  isEditing: boolean;
  selectedFiles: File[];
  isProcessing: boolean;
  persistedMedia: { url: string } | string[] | null;
  mediaItems: MediaItem[];
  loading: boolean;
  isUploading: boolean;
  error: ApolloError | undefined;

  // State setters
  setIsEditing: (editing: boolean) => void;
  setSelectedFiles: (files: File[]) => void;
  setMediaItems: (items: MediaItem[]) => void;
  setPersistedMedia: (media: { url: string } | string[] | null) => void;

  // Actions
  startUpload: (files: File[]) => Promise<void>;
}
```

## Type Definitions

### Location: `lib/types/media.ts`

#### `MediaItem`

Represents a media item in the carousel or uploader.

```typescript
interface MediaItem {
  id: string; // Unique identifier
  type: 'image' | 'video'; // Media type
  src: string; // URL or blob URL
  alt: string; // Alt text for accessibility
  file?: File; // Original file (for new uploads)
}
```

#### `MediaData`

Represents processed media data for database storage.

```typescript
interface MediaData {
  url: string; // Final uploaded URL
  position: number; // Position in gallery (1-based)
  mediaType: 'IMAGE' | 'VIDEO'; // Database enum type
}
```

#### `ProcessedData`

Structure for processed media ready for persistence.

```typescript
interface ProcessedData {
  cover: string; // Cover image URL
  mediaItems: MediaData[]; // Additional gallery items
}
```

#### `MediaUploaderCallbacks`

Callback functions for media uploader components.

```typescript
interface MediaUploaderCallbacks {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadError?: (error: string) => void;
  onMediaProcessed?: (processedData?: ProcessedData | null) => Promise<void>;
}
```

#### `MediaUploaderConfig`

Configuration options for media uploaders.

```typescript
interface MediaUploaderConfig {
  acceptedFileTypes: string[]; // MIME types
  maxImageSize: number; // Max size in MB for images
  maxVideoSize: number; // Max size in MB for videos
  disabled?: boolean; // Disable uploader
  multiple?: boolean; // Allow multiple files
  maxItems?: number; // Maximum number of items
  minItems?: number; // Minimum number of items
}
```

## Constants

### Location: `lib/consts/media-uploader.ts`

#### File Type Constants

```typescript
export const DefaultAcceptedFileTypes: string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'video/mp4',
  'video/webm',
];
```

#### Size Limits

```typescript
export const DefaultMaxImageSize = 10; // 10MB for images
export const DefaultVideoSize = 100; // 100MB for videos
```

#### Upload Configuration

```typescript
export const DefaultMultipleUpload = false;
export const DefaultDisabled = false;
export const DefaultMaxItems = 10;
export const DefaultMinItems = 0;
```

## Utility Functions

### Location: `lib/utils/media.ts`

#### `filesToMediaItems(files: File[], startIndex?: number): MediaItem[]`

Converts File objects to MediaItem objects for carousel display.

**Usage**:

```typescript
const files = [file1, file2];
const mediaItems = filesToMediaItems(files, 0);
```

#### `validateFileCount(files: File[], multiple: boolean, maxItems: number, translateFn?: Function)`

Validates file count during selection (checks maximum only).

**Usage**:

```typescript
const validation = validateFileCount(selectedFiles, true, 10, t);
if (!validation.isValid) {
  console.error(validation.error);
}
```

#### `validateFileCountForSubmission(files: File[], multiple: boolean, maxItems: number, minItems: number, translateFn?: Function)`

Validates file count for upload submission (checks both min and max).

**Usage**:

```typescript
const validation = validateFileCountForSubmission(files, true, 10, 2, t);
if (!validation.isValid) {
  onUploadError(validation.error);
  return;
}
```

#### `prepareProcessedData(urls: string[], selectedFiles: File[], multiple: boolean): ProcessedData`

Prepares processed data structure for database persistence.

**Usage**:

```typescript
const processedData = prepareProcessedData(uploadedUrls, selectedFiles, true);
await onMediaProcessed(processedData);
```

#### `updateMediaItemsWithUrls(mediaItems: MediaItem[], urls: string[]): MediaItem[]`

Updates media items with uploaded URLs, removing file references.

#### `cleanupObjectUrls(mediaItems: MediaItem[]): void`

Cleans up blob URLs to prevent memory leaks.

#### `reorderArrays<T, U>(array1: T[], array2: U[], fromIndex: number, toIndex: number)`

Reorders two arrays synchronously, maintaining their relationship.

## Media Components

### `MediaUploader` (Organism)

**Location**: `app/[locale]/components/organisms/shared/MediaUploader.tsx`

Main entry point component that delegates to either SingleMediaUploader or MultipleMediaUploader based on the `multiple` prop.

**Props**:

```typescript
interface MediaUploaderProps
  extends MediaUploaderCallbacks,
    Partial<MediaUploaderConfig> {
  className?: string;
  multiple?: boolean;
  hideDoneButton?: boolean;
  alwaysEditing?: boolean;
  initialMedia?: string | string[] | null;
  renderDoneButton?: (
    onDone: () => void,
    isProcessing: boolean,
  ) => React.ReactNode;
  renderEditButton?: (
    onEdit: () => void,
    isEditing: boolean,
    hasMedia: boolean,
  ) => React.ReactNode;
}
```

**Usage**:

```typescript
// Single media upload
<MediaUploader
  multiple={false}
  onMediaProcessed={handleMediaProcessed}
  onUploadError={handleError}
  initialMedia="https://example.com/image.jpg"
/>

// Multiple media upload
<MediaUploader
  multiple={true}
  maxItems={5}
  minItems={2}
  onMediaProcessed={handleMediaProcessed}
  initialMedia={["url1.jpg", "url2.jpg"]}
/>
```

### `SingleMediaUploader` (Molecule)

**Location**: `app/[locale]/components/molecules/shared/SingleMediaUploader.tsx`

Handles single media file upload with preview functionality.

**Key Features**:

- Single file selection and preview
- Edit/view mode toggle
- Custom render functions for buttons
- Initial media support

**States**:

1. **Empty**: Shows FileDropZone
2. **View Mode**: Shows SingleImagePreview with edit button
3. **Edit Mode**: Shows SingleImagePreview with done button

### `MultipleMediaUploader` (Molecule)

**Location**: `app/[locale]/components/molecules/shared/MultipleMediaUploader.tsx`

Handles multiple media files with carousel display and drag-and-drop reordering.

**Key Features**:

- Multiple file selection
- Drag and drop reordering
- Add more files functionality
- Carousel preview with thumbnails
- Always editing mode support

**States**:

1. **Empty**: Shows FileDropZone
2. **View Mode**: Shows CarouselMedia in read-only mode
3. **Edit Mode**: Shows CarouselMedia with editing capabilities

### `CarouselMedia` (Molecule)

**Location**: `app/[locale]/components/molecules/shared/CarouselMedia.tsx`

Displays media items in a carousel with thumbnail navigation.

**Props**:

```typescript
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
```

**Features**:

- Main carousel with full-size media display
- Thumbnail carousel with drag-and-drop reordering
- Cover image indication
- Add more button in editing mode
- Position numbers in editing mode

### `FileDropZone` (Atom)

**Location**: `app/[locale]/components/atoms/shared/FileDropZone.tsx`

Provides drag-and-drop file selection interface.

**Props**:

```typescript
interface FileDropZoneProps {
  onFileSelect: (files: File[]) => void;
  onValidationError?: (error: string) => void;
  acceptedFileTypes: string[];
  maxImageSize: number;
  maxVideoSize: number;
  multiple: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  maxItems?: number;
  currentItemCount?: number;
}
```

**Features**:

- Drag and drop support
- File type validation
- File size validation
- Visual feedback for drag states
- Error display
- Item count limits

### `SingleImagePreview` (Atom)

**Location**: `app/[locale]/components/atoms/shared/SingleImagePreview.tsx`

Displays a single image or video preview with optional remove functionality.

**Props**:

```typescript
interface SingleImagePreviewProps {
  file?: File;
  imageUrl?: string;
  onRemove?: () => void;
  isProcessing?: boolean;
  className?: string;
  viewOnly?: boolean;
}
```

**Features**:

- Supports both File objects and URLs
- Automatic object URL cleanup
- Remove button (when not in view-only mode)
- Processing state indication

### `ImageThumb` (Atom)

**Location**: `app/[locale]/components/atoms/shared/ImageThumb.tsx`

Displays image thumbnails in the carousel with selection state.

**Props**:

```typescript
interface ImageThumbProps {
  selected: boolean;
  index: number;
  onClick: () => void;
  imageSrc: string;
  altText: string;
}
```

### `VideoThumb` (Atom)

**Location**: `app/[locale]/components/atoms/shared/VideoThumb.tsx`

Generates and displays video thumbnails with play icon overlay.

**Props**:

```typescript
interface VideoThumbProps {
  selected: boolean;
  index: number;
  onClick: () => void;
  videoSrc: string;
  altText: string;
}
```

**Features**:

- Automatic thumbnail generation from video
- Intelligent seek time (5% of duration, 1-15 seconds)
- Loading and error states
- Play icon overlay
- Canvas-based thumbnail extraction

## Usage Examples

### Basic Single Media Upload

```typescript
import MediaUploader from '@organisms/shared/MediaUploader';

function ProductForm() {
  const handleMediaProcessed = async (data: ProcessedData | null) => {
    if (data) {
      // Save cover image URL to product
      await updateProduct({ coverImage: data.cover });
    }
  };

  return (
    <MediaUploader
      multiple={false}
      onMediaProcessed={handleMediaProcessed}
      onUploadError={(error) => toast.error(error)}
      maxImageSize={5}
      acceptedFileTypes={['image/jpeg', 'image/png']}
    />
  );
}
```

### Multiple Media Upload with Gallery

```typescript
import MediaUploader from '@organisms/shared/MediaUploader';

function ProductGallery() {
  const handleMediaProcessed = async (data: ProcessedData | null) => {
    if (data) {
      // Save cover and gallery images
      await updateProduct({
        coverImage: data.cover,
        galleryImages: data.mediaItems
      });
    }
  };

  return (
    <MediaUploader
      multiple={true}
      maxItems={8}
      minItems={2}
      onMediaProcessed={handleMediaProcessed}
      onUploadError={(error) => toast.error(error)}
      initialMedia={existingImages}
      renderEditButton={(onEdit, isEditing, hasMedia) => (
        <Button onClick={onEdit} disabled={isEditing}>
          {hasMedia ? 'Edit Gallery' : 'Add Images'}
        </Button>
      )}
    />
  );
}
```

### Always Editing Mode

```typescript
<MediaUploader
  multiple={true}
  alwaysEditing={true}
  hideDoneButton={true}
  onMediaProcessed={handleAutoSave}
  maxItems={5}
/>
```

### Custom File Types and Sizes

```typescript
<MediaUploader
  acceptedFileTypes={['image/jpeg', 'image/png', 'video/mp4']}
  maxImageSize={2}  // 2MB for images
  maxVideoSize={50} // 50MB for videos
  multiple={true}
  maxItems={10}
/>
```

## Best Practices

1. **Memory Management**: Always provide cleanup for object URLs when components unmount
2. **Error Handling**: Implement comprehensive error handling with user-friendly messages
3. **Accessibility**: Ensure proper alt text and keyboard navigation support
4. **Performance**: Use lazy loading for large media galleries
5. **Validation**: Validate file types and sizes both client-side and server-side
6. **User Experience**: Provide clear feedback during upload processes
7. **Responsive Design**: Ensure components work well on mobile devices

## Integration Notes

- The media system integrates with ImageKit for optimization and CDN delivery
- Authentication tokens are automatically managed and refreshed
- All components support internationalization through next-intl
- The system is designed to work with GraphQL mutations for persistence
- Drag and drop functionality is optimized for touch devices
