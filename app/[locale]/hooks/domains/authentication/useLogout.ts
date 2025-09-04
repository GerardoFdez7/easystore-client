import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import { toast } from 'sonner';
import { LogoutDocument, LogoutMutation } from '@graphql/generated';
import { useMutation } from '@apollo/client';

export const useLogout = () => {
  const t = useTranslations('Login');
  const router = useRouter();

  // Use the GraphQL mutation hook
  const [logoutMutation, { data, error, loading }] =
    useMutation<LogoutMutation>(LogoutDocument, {
      onCompleted: (data: LogoutMutation) => {
        if (data?.logout.success === true) {
          toast.success(t('logoutSuccessful'), {
            description: t('logoutSuccessfulDescription'),
          });

          // Redirect to login page
          router.push('/login');
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
    loading,
    data,
    error,
  };
};

export default useLogout;
