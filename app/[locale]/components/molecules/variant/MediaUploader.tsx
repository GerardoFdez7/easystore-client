'use client';
import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';

type Props = {
  t: (k: string) => string;
  preview: string | null;
  onPick: () => void;
  onFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export default function MediaUploader({
  t,
  preview,
  onPick,
  onFile,
  onDrop,
  fileInputRef,
}: Props) {
  return (
    <section className="space-y-2">
      <h2 className="text-foreground/90 text-sm font-semibold">
        {t('multimedia')}
      </h2>
      <Card className="border-dashed">
        <CardContent className="p-0">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="mx-auto flex h-40 w-full max-w-2xl flex-col items-center justify-center rounded-lg border-2 border-dashed sm:h-48 md:h-56"
          >
            {preview ? (
              <div className="relative h-32 w-64 sm:h-40 sm:w-80 md:h-48 md:w-96">
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            ) : (
              <div className="text-muted-foreground flex flex-col items-center gap-2 pt-6 pb-4 text-xs">
                <p>{t('dragDropImage')}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onPick}
                >
                  {t('addImage')}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFile}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
