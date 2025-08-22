'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface MediaData {
  url: string;
  position: number;
  mediaType: 'IMAGE' | 'VIDEO';
}

interface ProcessedData {
  cover: string;
  mediaItems: MediaData[];
}

interface UseTestMultipleMediaPersistenceReturn {
  isLoading: boolean;
  persistMultipleMedia: (
    processedData: ProcessedData,
  ) => Promise<ProcessedData>;
  savedMediaSets: ProcessedData[];
  clearSavedMedia: () => void;
}

/**
 * Hook de prueba para simular la persistencia de múltiples medios
 * En una aplicación real, esto haría llamadas a la API para guardar
 * la imagen de portada y los elementos multimedia adicionales
 */
export const useTestMultipleMediaPersistence =
  (): UseTestMultipleMediaPersistenceReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [savedMediaSets, setSavedMediaSets] = useState<ProcessedData[]>([]);

    const persistMultipleMedia = async (
      processedData: ProcessedData,
    ): Promise<ProcessedData> => {
      setIsLoading(true);

      try {
        // Simular llamada a API con delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simular persistencia de la imagen de portada
        console.log('Persisting cover image:', processedData.cover);

        // Simular persistencia de elementos multimedia adicionales
        console.log('Persisting media items:', processedData.mediaItems);

        // Guardar el conjunto completo de medios
        setSavedMediaSets((prev) => [processedData, ...prev]);

        toast.success('Múltiples imágenes persistidas exitosamente', {
          description: `Portada + ${processedData.mediaItems.length} elementos adicionales`,
        });

        return processedData;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error desconocido';
        toast.error('Error al persistir múltiples imágenes', {
          description: errorMessage,
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    const clearSavedMedia = () => {
      setSavedMediaSets([]);
      toast.info('Conjuntos de medios guardados limpiados');
    };

    return {
      isLoading,
      persistMultipleMedia,
      savedMediaSets,
      clearSavedMedia,
    };
  };
