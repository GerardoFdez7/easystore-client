'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface VideoThumbProps {
  selected: boolean;
  index: number;
  onClick: () => void;
  videoSrc: string;
  altText: string;
}

const VideoThumb = ({
  selected,
  onClick,
  videoSrc,
  altText,
}: VideoThumbProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>('');
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const generateThumbnail = () => {
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Canvas context not available');
          return;
        }

        if (video.videoWidth === 0 || video.videoHeight === 0) {
          setError('Video dimensions not available');
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        setThumbnailSrc(dataURL);
        setIsLoading(false);
        setError('');
      } catch (_err) {
        setError('Failed to generate thumbnail');
        setIsLoading(false);
      }
    };

    const handleLoadedData = () => {
      if (video.duration && video.duration > 0) {
        // For longer videos, seek to a more representative frame
        // Use 5% of duration with a minimum of 1 second and maximum of 15 seconds
        const seekTime = Math.max(1, Math.min(15, video.duration * 0.05));
        video.currentTime = seekTime;
      } else {
        // If duration is not available, try to generate thumbnail immediately
        setTimeout(() => generateThumbnail(), 100);
      }
    };

    const handleSeeked = () => {
      generateThumbnail();
    };

    const handleError = () => {
      setError('Failed to load video');
      setIsLoading(false);
    };

    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  return (
    <div
      className={`min-w-35 flex-[0_0_23%] cursor-pointer overflow-hidden rounded-lg ${
        selected ? 'border-title border-opacity-75 border' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        {/* Hidden video element for thumbnail generation */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="hidden"
            preload="metadata"
            muted
            crossOrigin="anonymous"
            playsInline
          />
        )}

        {/* Hidden canvas for thumbnail generation */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Display thumbnail or fallback */}
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={altText}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span className="mt-1 text-xs text-gray-500">Loading...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mt-1 text-xs text-red-500">Error</span>
              </div>
            ) : (
              <svg
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            )}
          </div>
        )}

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-black/50 p-1">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Selection overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 hover:opacity-0 ${
            selected ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
};

export default VideoThumb;
