import { GraphQLFormattedError } from 'graphql';
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

export function handleApolloError(
  graphQLErrors?: readonly GraphQLFormattedError[] | null,
  networkError?: Error | null,
) {
  if (!graphQLErrors && !networkError) return;

  const locale =
    typeof window !== 'undefined'
      ? window.location.pathname.split('/')[1] || 'en'
      : 'en';
  const messages =
    messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  const t = (key: keyof typeof messages.Errors) =>
    messages.Errors?.[key] || key;

  const handleGqlError = () => {
    graphQLErrors?.forEach((err: GraphQLFormattedError) => {
      if (err.message.includes('Invalid credentials')) {
        toast.error(t('invalidCredentials'), {
          description:
            t('invalidCredentialsDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
        if (process.env.NODE_ENV === 'development')
          console.error('Login error:', err.message);
        return;
      } else if (err.message.includes('Account is temporarily locked')) {
        toast.warning(t('accountLocked'), {
          description:
            t('accountLockedDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
        if (process.env.NODE_ENV === 'development')
          console.error('Login error:', err.message);
        return;
      } else if (err.message.includes('already exists')) {
        toast.warning(t('associatedAccount'), {
          description:
            t('associatedAccountDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
        if (process.env.NODE_ENV === 'development')
          console.error('Register error:', err.message);
        return;
      }

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
        (process.env.NODE_ENV === 'development' && networkError
          ? ` Backend message: "${networkError.message}"`
          : ''),
    });
    if (process.env.NODE_ENV === 'development' && networkError)
      console.error(
        t('title') +
          ': ' +
          t('network-error') +
          ` Backend message: "${networkError.message}"`,
      );
  };

  if (graphQLErrors && graphQLErrors.length > 0) {
    handleGqlError();
  } else if (networkError) {
    handleNetworkError();
  } else {
    toast.error(t('generic-error'), {
      description: t('generic-description'),
    });
    if (process.env.NODE_ENV === 'development')
      console.error(t('generic-error') + ': ' + t('generic-description'));
  }
}
