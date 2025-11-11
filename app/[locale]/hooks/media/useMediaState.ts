'use client';

import { useState, useRef } from 'react';
import { MediaItem } from '@lib/types/media';

/**
 * Custom hook to manage media uploader state
 */
export const useMediaState = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [persistedMedia, setPersistedMedia] = useState<
    { url: string } | string[] | null
  >(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  // Refs for tracking upload progress
  const uploadedUrlsRef = useRef<string[]>([]);
  const expectedFileCountRef = useRef(0);
  const uploadingMediaTypesRef = useRef<Array<'video' | 'image'>>([]);

  const resetState = () => {
    setIsEditing(false);
    setSelectedFiles([]);
    setIsProcessing(false);
    setMediaItems([]);
    uploadedUrlsRef.current = [];
    expectedFileCountRef.current = 0;
    uploadingMediaTypesRef.current = [];
  };

  const resetUploadTracking = () => {
    uploadedUrlsRef.current = [];
    expectedFileCountRef.current = 0;
    uploadingMediaTypesRef.current = [];
  };

  return {
    // State
    isEditing,
    selectedFiles,
    isProcessing,
    persistedMedia,
    mediaItems,
    uploadedUrlsRef,
    expectedFileCountRef,
    uploadingMediaTypesRef,

    // State setters
    setIsEditing,
    setSelectedFiles,
    setIsProcessing,
    setPersistedMedia,
    setMediaItems,

    // Utility functions
    resetState,
    resetUploadTracking,
  };
};
