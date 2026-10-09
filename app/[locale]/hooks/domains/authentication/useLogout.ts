import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import { toast } from 'sonner';
import { LogoutDocument, LogoutMutation } from '@graphql/generated';
import { useApolloClient, useMutation } from '@apollo/client/react';

export const useLogout = () => {
  const t = useTranslations('Login');
  const router = useRouter();
  const client = useApolloClient();

  // Use the GraphQL mutation hook
  const [logoutMutation, { data, error, loading }] =
    useMutation<LogoutMutation>(LogoutDocument, {
      onCompleted: (data: LogoutMutation) => {
        if (data?.logout.success === true) {
          toast.success(t('logoutSuccessful'), {
            description: t('logoutSuccessfulDescription'),
          });

          // Drop account-owned cached data so the next session never sees it
          void client.clearStore();

          // Redirect to login page
          router.push('/login');
        }
      },
    });

  const handleLogout = async () => {
    try {
      await logoutMutation();
      router.push('/login');
    } catch (_error) {
      // Error handling is done in error.handler
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
