'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface MediaData {
  url: string;
}

interface UseTestMediaPersistenceReturn {
  loading: boolean;
  persistMedia: (mediaData: MediaData) => Promise<string>;
  savedMedia: string[];
  clearSavedMedia: () => void;
}

/**
 * Hook de prueba para simular la persistencia de medios
 * En una aplicación real, esto haría llamadas a la API
 */
export const useTestMediaPersistence = (): UseTestMediaPersistenceReturn => {
  const [loading, setIsLoading] = useState(false);
  const [savedMedia, setSavedMedia] = useState<string[]>([]);

  const persistMedia = async (mediaData: MediaData): Promise<string> => {
    setIsLoading(true);

    try {
      // Simular llamada a API con delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Para modo single, solo guardamos la URL
      const persistedUrl = mediaData.url;
      setSavedMedia((prev) => [persistedUrl, ...prev]);

      toast.success('Imagen persistida exitosamente');

      return persistedUrl;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      toast.error('Error al persistir imagen', {
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSavedMedia = () => {
    setSavedMedia([]);
    toast.info('URLs guardadas limpiadas');
  };

  return {
    loading,
    persistMedia,
    savedMedia,
    clearSavedMedia,
  };
};
