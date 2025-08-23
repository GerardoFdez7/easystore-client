'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Button } from '@shadcn/ui/button';
import { Badge } from '@shadcn/ui/badge';
import { CheckCircle, XCircle, Upload, Loader2 } from 'lucide-react';
import MediaUploader from '@organisms/shared/MediaUploader';
import { useTestMediaPersistence } from '@hooks/useTestMediaPersistence';
import { useTestMultipleMediaPersistence } from '@hooks/useTestMultipleMediaPersistence';
import { toast } from 'sonner';
import ThemeToggle from '@atoms/shared/ThemeToggle';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

interface UploadResult {
  url: string;
  timestamp: Date;
  status: 'success' | 'error';
  message?: string;
}

export default function MediaTestTemplate() {
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const { persistMedia } = useTestMediaPersistence();
  const { persistMultipleMedia } = useTestMultipleMediaPersistence();

  const handleUploadSuccess = (url: string) => {
    const result: UploadResult = {
      url,
      timestamp: new Date(),
      status: 'success',
    };

    setUploadResults((prev) => [result, ...prev]);
    toast.success('File uploaded successfully!');
  };

  const handleUploadError = (error: string) => {
    const result: UploadResult = {
      url: '',
      timestamp: new Date(),
      status: 'error',
      message: error,
    };

    setUploadResults((prev) => [result, ...prev]);
    toast.error('Upload failed!', {
      description: error,
    });
  };

  const clearResults = () => {
    setUploadResults([]);
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-4">
            <ThemeToggle />
            <h1 className="text-title text-3xl font-bold tracking-tight">
              Media Uploader Test
            </h1>
            <LanguageButton />
          </div>
          <p className="text-muted-foreground">
            Test the MediaUploader component with ImageKit integration
          </p>
        </div>
        {/* Test Configurations */}
        {/* Single File Upload */}
        <h1 className="text-title text-2xl font-bold">Single File Upload</h1>
        <MediaUploader
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          onMediaProcessed={async (processedData) => {
            try {
              // Para modo single, tomar el cover
              const cover = processedData?.cover;
              if (cover) {
                const persistedUrl = await persistMedia({
                  url: cover,
                });
                console.log('Media persisted with URL:', persistedUrl);
              }
            } catch (error) {
              console.error('Error persisting media:', error);
            }
          }}
          acceptedFileTypes={[
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
          ]}
          maxImageSize={5}
          maxVideoSize={50}
          multiple={false}
          renderEditButton={(onEdit, isEditing, hasMedia) => (
            <Button
              onClick={onEdit}
              disabled={isEditing || !hasMedia}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Edit Media
            </Button>
          )}
        />
        <div className="text-muted-foreground text-m">
          <p>• Single file only</p>
          <p>• Max 5MB</p>
          <p>• JPEG, PNG, WebP, GIF</p>
          <p>• Con hook de persistencia conectado</p>
          <p>• Con botón de edit personalizado</p>
        </div>
        {/* Multiple File Upload */}
        <h1 className="text-title text-2xl font-bold">Multiple File Upload</h1>
        <MediaUploader
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          onMediaProcessed={async (processedData) => {
            try {
              if (processedData) {
                const persistedData = await persistMultipleMedia(processedData);
                console.log('Multiple media persisted:', persistedData);
              }
            } catch (error) {
              console.error('Error persisting multiple media:', error);
            }
          }}
          acceptedFileTypes={[
            'image/jpeg',
            'image/png',
            'image/webp',
            'video/mp4',
            'video/webm',
            'video/avi',
            'video/mov',
          ]}
          maxImageSize={10}
          maxVideoSize={50}
          multiple={true}
          renderDoneButton={(onDone, isProcessing) => (
            <Button
              onClick={onDone}
              disabled={isProcessing}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {isProcessing ? 'Uploading...' : 'Finish Upload'}
            </Button>
          )}
        />
        <div className="text-muted-foreground text-m">
          <p>• Multiple files allowed</p>
          <p>• Max 10MB per file</p>
          <p>• JPEG, PNG, WebP, MP4, WebM, AVI, MOV</p>
          <p>• Con hook de persistencia múltiple conectado</p>
          <p>• Con boton done personalizado</p>
        </div>
        {/* Restricted Upload */}
        <h1 className="text-title text-2xl font-bold">
          Restricted Upload (Small Files)
        </h1>
        <MediaUploader
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          acceptedFileTypes={['image/png']}
          maxImageSize={1}
          maxVideoSize={10}
          multiple={false}
        />
        <div className="text-muted-foreground text-m">
          <p>• PNG only</p>
          <p>• Max 1MB (test size limits)</p>
          <p>• Single file</p>
        </div>
        {/* Disabled Upload */}
        <h1 className="text-title text-2xl font-bold">Disabled Upload</h1>
        <MediaUploader
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          disabled={true}
        />
        <div className="text-muted-foreground text-m">
          <p>• Component disabled</p>
          <p>• No interaction allowed</p>
        </div>

        {/* Upload Results */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upload Results</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearResults}
              disabled={uploadResults.length === 0}
            >
              Clear Results
            </Button>
          </CardHeader>
          <CardContent>
            {uploadResults.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No uploads yet. Try uploading some files above!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploadResults.map((result) => (
                  <div key={result.url} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {result.status === 'success' ? (
                          <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                result.status === 'success'
                                  ? 'default'
                                  : 'destructive'
                              }
                            >
                              {result.status}
                            </Badge>
                            <span className="text-muted-foreground text-sm">
                              {result.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          {result.status === 'success' ? (
                            <div className="space-y-1">
                              <p className="text-muted-foreground text-sm break-all">
                                URL: {result.url}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-red-600">
                              Error: {result.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {result.status === 'success' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(result.url, '_blank')}
                        >
                          View File
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">What to Test:</h4>
                <ul className="text-muted-foreground text-m space-y-1">
                  <li>• Drag and drop functionality</li>
                  <li>• Click to select files</li>
                  <li>• File type validation</li>
                  <li>• File size validation</li>
                  <li>• Upload progress indication</li>
                  <li>• Multiple file uploads</li>
                  <li>• Error handling</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Expected Behavior:</h4>
                <ul className="text-muted-foreground text-m space-y-1">
                  <li>• Files should upload to ImageKit</li>
                  <li>• Progress bar should show during upload</li>
                  <li>• Success/error messages should appear</li>
                  <li>• Invalid files should be rejected</li>
                  <li>• Upload results should be logged below</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
