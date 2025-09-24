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
      if (process.env.NODE_ENV === 'development') {
        console.error('GraphQL Error Debug:', {
          message: err.message,
          extensions: err.extensions,
          locations: err.locations,
          path: err.path,
          fullError: err,
        });
      }

      // Normalize error message for better matching
      const errorMessage = err.message?.toLowerCase() || '';

      // more specific errors should be checked first
      if (
        errorMessage.includes('address already exists') ||
        (errorMessage.includes('address') && errorMessage.includes('exists'))
      ) {
        toast.warning(t('addressNameAlreadyExists'), {
          description: t('addressNameAlreadyExistsDescription'),
        });
        return;
      }

      if (
        errorMessage.includes('warehouse name already exists') ||
        (errorMessage.includes('warehouse') &&
          errorMessage.includes('name') &&
          errorMessage.includes('exists'))
      ) {
        toast.warning(t('warehouseNameAlreadyExists'), {
          description: t('warehouseNameAlreadyExistsDescription'),
        });
        return;
      }

      if (
        errorMessage.includes('warehouse addressid already exists') ||
        (errorMessage.includes('warehouse') &&
          errorMessage.includes('address') &&
          errorMessage.includes('exists'))
      ) {
        toast.warning(t('warehouseAddressAlreadyExists'), {
          description: t('warehouseAddressAlreadyExistsDescription'),
        });
        return;
      }

      // Authentication and account errors
      if (errorMessage.includes('invalid credentials')) {
        toast.error(t('invalidCredentials'), {
          description:
            t('invalidCredentialsDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
        return;
      }

      if (errorMessage.includes('account is temporarily locked')) {
        toast.warning(t('accountLocked'), {
          description:
            t('accountLockedDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
        return;
      }

      if (
        errorMessage.includes('database create auth identity failed') &&
        errorMessage.includes('email already exists')
      ) {
        toast.warning(t('associatedAccount'), {
          description:
            t('associatedAccountDescription') +
            (process.env.NODE_ENV === 'development' ? ` (${err.message})` : ''),
        });
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
          (process.env.NODE_ENV === 'development'
            ? ` Backend message: ${err.message}`
            : ''),
      });
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
  };

  if (graphQLErrors && graphQLErrors.length > 0) {
    handleGqlError();
  } else if (networkError) {
    handleNetworkError();
  } else {
    toast.error(t('generic-error'), {
      description: t('generic-description'),
    });
  }
}
