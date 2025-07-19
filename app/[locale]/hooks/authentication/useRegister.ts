import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useRegisterMutation,
  AccountTypeEnum,
  RegisterMutationVariables,
} from '@graphql/generated';

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

  // Use the generated mutation hook
  const [registerMutation, { data, error, loading }] = useRegisterMutation({
    onCompleted: (data) => {
      toast.success('Registration successful!', {
        description: `Welcome ${data.register.email}!`,
      });
      router.push('/login');
    },
    onError: (error) => {
      // Handle GraphQL errors
      if (error.graphQLErrors?.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (
          graphQLError.message.includes('already exists') ||
          graphQLError.message.includes('duplicate')
        ) {
          toast.warning('Associated account', {
            description:
              'Try logging in or recover your password if you have forgotten it.',
          });
        } else {
          toast.error('Registration failed', {
            description: graphQLError.message,
          });
        }
      } else if (error.networkError) {
        toast.error('Network error', {
          description: 'Please check your connection and try again.',
        });
      } else {
        toast.error('Unexpected error occurred', {
          description: 'Something went wrong. Please try again.',
        });
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
    isLoading: loading,
    registerFormSchema,
    data,
    error,
  };
};

export default useRegister;
