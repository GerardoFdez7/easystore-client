import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useLoginMutation, AccountTypeEnum } from '@graphql/generated';
import type { LoginMutationVariables } from '@graphql/generated';

export const useLogin = (accountType: AccountTypeEnum) => {
  const t = useTranslations('Login');

  // Schema validation based on backend value objects
  const loginFormSchema = z.object({
    email: z.string().email({ message: t('invalidEmailFormat') }),
    password: z
      .string()
      .min(8, { message: t('passwordTooShort') })
      .max(255, { message: t('passwordTooLong') }),
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Use the generated mutation hook
  const [loginMutation, { data, error, loading }] = useLoginMutation({
    onCompleted: (data) => {
      // Store token in sessionStorage
      sessionStorage.setItem('accessToken', data.login.accessToken);
      sessionStorage.setItem('userId', data.login.userId);

      toast.success(t('loginSuccessful'), {
        description: t('loginSuccessfulDescription'),
      });

      // Redirect to dashboard
      window.location.href = '/dashboard';
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (
          graphQLError.message.includes('Invalid credentials') ||
          graphQLError.message.includes('unauthorized')
        ) {
          toast.error(t('invalidCredentials'), {
            description: t('invalidCredentialsDescription'),
          });
        } else if (graphQLError.message.includes('account not found')) {
          toast.warning(t('accountNotFound'), {
            description: t('accountNotFoundDescription'),
          });
        } else {
          toast.error(t('loginFailed'), {
            description: graphQLError.message,
          });
        }
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

  const handleSubmit = async (formData: LoginFormValues) => {
    try {
      const variables: LoginMutationVariables = {
        email: formData.email,
        password: formData.password,
        accountType,
      };

      await loginMutation({ variables });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Login error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: loading,
    loginFormSchema,
    data,
    error,
  };
};

export default useLogin;
