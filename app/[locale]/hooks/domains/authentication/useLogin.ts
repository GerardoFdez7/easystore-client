import { useTranslations } from 'next-intl';
import { useRouter } from '@i18n/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  LoginDocument,
  LoginMutation,
  AccountTypeEnum,
  LoginMutationVariables,
} from '@graphql/generated';
import useGraphQLMutation from '../../useMutations';
import { useAuth } from '@hooks/domains/authentication/useAuth';

export const useLogin = (accountType: AccountTypeEnum) => {
  const t = useTranslations('Login');
  const router = useRouter();
  const { checkAuth } = useAuth();

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

  // Use the GraphQL mutation hook
  const {
    mutate: loginMutation,
    data,
    errors,
    isLoading,
  } = useGraphQLMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    undefined,
    {
      onCompleted: (data) => {
        if (data?.login.success === true) {
          toast.success(t('loginSuccessful'), {
            description: t('loginSuccessfulDescription'),
          });

          checkAuth()
            .then(() => {
              router.push('/dashboard');
            })
            .catch((error) => {
              console.error('Auth check failed:', error);
            });
        }
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
    },
  );

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
    isLoading,
    loginFormSchema,
    data,
    errors,
  };
};

export default useLogin;
