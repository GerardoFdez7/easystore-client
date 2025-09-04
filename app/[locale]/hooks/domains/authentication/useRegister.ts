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
import { useMutation, ApolloError } from '@apollo/client';

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
  const [registerMutation, { data, error, loading }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, {
    onCompleted: (data: RegisterMutation) => {
      if (data?.register) {
        toast.success(t('registrationSuccessful'), {
          description: t('registrationSuccessfulDescription', {
            email: data.register.email,
          }),
        });
        router.push('/login');
      }
    },
    onError: (error: ApolloError) => {
      // Handle GraphQL error
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
          console.error('Registration error:', error);
        }
      } else {
        console.error('Registration error:', error);
      }
    },
  });

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
    loading,
    registerFormSchema,
    data,
    error,
  };
};

export default useRegister;
