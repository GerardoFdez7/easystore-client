'use client';

import { Button } from '@shadcn/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@shadcn/ui/card';
import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

export default function Multimedia() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/'),
    );

    imageFiles.forEach((file) => {
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const url = URL.createObjectURL(file);

      const newImage: UploadedImage = {
        id,
        file,
        url,
        name: file.name,
      };

      setImages((prev) => [...prev, newImage]);
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="text-title mb-2 block text-sm font-medium">
        Multimedia
      </label>

      {/* Upload Area */}
      <Card
        className={`bg-card border-2 border-dashed transition-colors ${
          isDragOver
            ? 'border-primary bg-primary/5'
            : 'hover:border-primary/50 border-[#d9d9d9]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-title text-lg font-medium">
              {isDragOver ? 'Drop images here' : 'Multimedia'}
            </div>
            <div className="text-foreground text-sm">
              Drag and drop images or browse to upload
            </div>
            <Button
              variant="outline"
              className="text-foreground hover:border-primary border-[#d9d9d9]"
              onClick={openFileDialog}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Images
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-4">
          <div className="text-title mb-2 text-sm font-medium">
            Uploaded Images ({images.length})
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.name}
                        className="h-full w-full object-cover"
                      />
                      {/* Remove Button */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {/* Image Icon Overlay */}
                      <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
                        <div className="flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          <span className="truncate text-xs">{image.name}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
