import { ApolloError } from '@apollo/client';
import { toast } from 'sonner';

import en from '../../messages/en.json';
import es from '../../messages/es.json';
import fr from '../../messages/fr.json';
import it from '../../messages/it.json';
import pt from '../../messages/pt.json';

const messagesMap = {
  en,
  es,
  fr,
  it,
  pt,
};

export function handleApolloError(error: ApolloError) {
  if (!error) return;

  const locale =
    typeof window !== 'undefined'
      ? window.location.pathname.split('/')[1] || 'en'
      : 'en';
  const messages =
    messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  const t = (key: keyof typeof messages.Errors) =>
    messages.Errors?.[key] || key;

  const handleGqlError = () => {
    error.graphQLErrors.forEach((err) => {
      const originalError = err.extensions?.originalError as {
        error?: string;
        statusCode?: number;
      };

      if (originalError?.error === 'Not Found') return;

      const errorType = () => {
        switch (originalError?.statusCode) {
          case 400:
            return 'bad-request-error';
          case 401:
            return 'unauthorized-error';
          case 500:
            return 'internal-server-error';
          default:
            return 'generic-error';
        }
      };

      toast.error(t('title'), {
        description:
          t(errorType()) +
          (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
      });
      if (process.env.NODE_ENV === 'development')
        console.error(t('title') + ': ' + t(errorType()) + ` (${err.message})`);
    });
  };

  const handleNetworkError = () => {
    toast.error(t('title'), {
      description:
        t('network-error') +
        (process.env.NODE_ENV === 'development' && error.networkError
          ? ` Server message: "${error.networkError.message}"`
          : ''),
    });
    if (process.env.NODE_ENV === 'development' && error.networkError)
      console.error(
        t('title') +
          ': ' +
          t('network-error') +
          ` Server message: "${error.networkError.message}"`,
      );
  };

  if (error.graphQLErrors.length > 0) {
    handleGqlError();
  } else if (error.networkError) {
    handleNetworkError();
  } else {
    toast.error(t('generic-error'), {
      description:
        t('generic-description') +
        (process.env.NODE_ENV === 'development' && error.message
          ? ` Server message: "${error.message}"`
          : ''),
    });
    if (process.env.NODE_ENV === 'development' && error.message)
      console.error(
        t('generic-error') +
          ': ' +
          t('generic-description') +
          ` Server message: "${error.message}"`,
      );
  }
}
