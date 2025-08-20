import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterDocument,
  RegisterMutation,
  AccountTypeEnum,
  RegisterMutationVariables,
} from '@graphql/generated';
import useGraphQLMutation from '../../useMutations';

export const useRegister = (accountType: AccountTypeEnum) => {
  const t = useTranslations('Register');
  const router = useRouter();

  // Schema validation based on backend value objects
  const registerFormSchema = z
    .object({
      email: z.string().email({ message: t('invalidEmailFormat') }),
      password: z
        .string()
        .min(8, { message: t('passwordTooShort') })
        .max(255, { message: t('passwordTooLong') }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });

  type RegisterFormValues = z.infer<typeof registerFormSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Use the GraphQL mutation hook
  const {
    mutate: registerMutation,
    data,
    errors,
    isLoading,
  } = useGraphQLMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    undefined,
    {
      onCompleted: (data) => {
        if (data?.register) {
          toast.success(t('registrationSuccessful'), {
            description: t('registrationSuccessfulDescription', {
              email: data.register.email,
            }),
          });
          router.push('/login');
        }
      },
      onError: (error) => {
        // Handle GraphQL errors
        if (error.graphQLErrors?.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          if (
            graphQLError.message.includes('already exists') ||
            graphQLError.message.includes('duplicate')
          ) {
            toast.warning(t('associatedAccount'), {
              description: t('associatedAccountDescription'),
            });
          } else {
            toast.error(t('registrationFailed'), {
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

  const handleSubmit = async (formData: RegisterFormValues) => {
    try {
      const variables: RegisterMutationVariables = {
        email: formData.email,
        password: formData.password,
        accountType,
      };

      await registerMutation({ variables });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error('Registration error:', error);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    registerFormSchema,
    data,
    errors,
  };
};

export default useRegister;
