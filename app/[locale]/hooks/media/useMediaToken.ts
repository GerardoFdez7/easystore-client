import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GetMediaTokenDocument,
  GetMediaTokenQuery,
  MediaAuthResponse,
} from '@lib/graphql/generated';
import { useQuery } from '@apollo/client';

const useMediaToken = () => {
  const [cachedToken, setCachedToken] = useState<MediaAuthResponse | null>(
    null,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data, loading, error, refetch } = useQuery<GetMediaTokenQuery>(
    GetMediaTokenDocument,
    {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
  );

  // Silent refresh function
  const silentRefresh = useCallback(async () => {
    try {
      const result = await refetch();
      if (result.data?.getMediaUploadToken) {
        const token = result.data.getMediaUploadToken;

        setCachedToken(token);

        // Schedule next silent refresh
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        refreshTimeoutRef.current = setTimeout(
          () => void silentRefresh(),
          55 * 60 * 1000,
        );
      }
    } catch (err) {
      console.error('Silent refresh failed:', err);
      // Retry silent refresh in 5 minutes on failure
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(
        () => void silentRefresh(),
        5 * 60 * 1000,
      );
    }
  }, [refetch]);

  // Initialize token and set up silent refresh
  useEffect(() => {
    if (data?.getMediaUploadToken && !cachedToken) {
      const token = data.getMediaUploadToken;

      setCachedToken(token);
      setIsInitialLoading(false);

      // Schedule first silent refresh
      refreshTimeoutRef.current = setTimeout(
        () => void silentRefresh(),
        55 * 60 * 1000,
      );
    } else if (!loading && !data?.getMediaUploadToken && !cachedToken) {
      // Handle case where initial load fails
      setIsInitialLoading(false);
    }
  }, [data, cachedToken, silentRefresh, loading]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const authenticator = useCallback(async (): Promise<MediaAuthResponse> => {
    try {
      // Check if we have a valid cached token
      if (cachedToken && Date.now() < cachedToken.expire) {
        return cachedToken;
      }

      // If no valid cache, fetch new token
      const result = await refetch();

      if (!result.data?.getMediaUploadToken) {
        throw new Error('Failed to get media upload token');
      }

      const token = result.data.getMediaUploadToken;

      setCachedToken(token);

      // Schedule silent refresh if not already scheduled
      if (!refreshTimeoutRef.current) {
        refreshTimeoutRef.current = setTimeout(
          () => void silentRefresh(),
          55 * 60 * 1000,
        );
      }

      return token;
    } catch (err) {
      console.error('Authenticator error:', err);
      throw new Error('Authentication failed');
    }
  }, [cachedToken, refetch, silentRefresh]);

  return {
    loading: isInitialLoading,
    error,
    authenticator,
  };
};

export default useMediaToken;
