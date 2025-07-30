import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import { toast } from 'sonner';
import { useLogoutMutation } from '@graphql/generated';

export const useLogout = () => {
  const t = useTranslations('Login');
  const router = useRouter();

  // Use the generated mutation hook
  const [logoutMutation, { data, error, loading }] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout.success === true) {
        toast.success(t('logoutSuccessful'), {
          description: t('logoutSuccessfulDescription'),
        });

        // Redirect to login page
        router.push('/login');
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
      await logoutMutation();
      window.location.href = '/login';
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
