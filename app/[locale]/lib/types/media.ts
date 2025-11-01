// Shared media types for components

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  file?: File;
}

export interface MediaData {
  url: string;
  position: number;
  mediaType: 'IMAGE' | 'VIDEO';
}

export interface ProcessedData {
  cover: string;
  mediaItems: MediaData[];
}

export interface MediaUploaderCallbacks {
  onUploadSuccess?: (url: string, fileId: string) => void;
  onUploadError?: (error: string) => void;
  onMediaProcessed?: (processedData?: ProcessedData | null) => Promise<void>;
  onMediaChange?: (hasChanges: boolean) => void;
}

export interface MediaUploaderConfig {
  acceptedFileTypes: string[];
  maxImageSize: number; // in MB for images
  maxVideoSize: number; // in MB for videos
  disabled?: boolean;
  multiple?: boolean;
  maxItems?: number;
  minItems?: number;
}

export interface MediaUploaderState {
  isEditing: boolean;
  selectedFiles: File[];
  isProcessing: boolean;
  persistedMedia: { url: string } | string[] | null;
  mediaItems: MediaItem[];
}
