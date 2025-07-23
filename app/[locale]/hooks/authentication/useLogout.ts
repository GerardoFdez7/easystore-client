import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useLogoutMutation } from '@graphql/generated';
import type { LogoutMutationVariables } from '@graphql/generated';

export const useLogout = () => {
  const t = useTranslations('Login');

  // Use the generated mutation hook
  const [logoutMutation, { data, error, loading }] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout.success) {
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');

        toast.success(t('logoutSuccessful'), {
          description: t('logoutSuccessfulDescription'),
        });

        // Redirect to login page
        window.location.href = '/login';
      }
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        toast.error(t('logoutFailed'), {
          description: graphQLError.message,
        });
      } else if (error.networkError) {
        toast.error(t('networkError'), {
          description: t('networkErrorDescription'),
        });
      } else {
        toast.error(t('unexpectedError'), {
          description: t('unexpectedErrorDescription'),
        });
      }
    },
  });

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        // If no token, just clear localStorage and redirect
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return;
      }

      const variables: LogoutMutationVariables = {
        token,
      };

      await logoutMutation({ variables });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Logout error:', error);
    }
  };

  return {
    handleLogout,
    isLoading: loading,
    data,
    error,
  };
};

export default useLogout;
