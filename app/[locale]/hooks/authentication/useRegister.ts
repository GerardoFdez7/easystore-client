import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
//import { useGraphQL } from '@hooks/useGraphQL';
//import { gql } from '@apollo/client';

// GraphQL mutation (replace this with the actual mutation)
// const registerUser = gql`
//   mutation RegisterUser($email: String!, $password: String!) {
//     registerUser(input: { email: $email, password: $password }) {
//       email
//     }
//   }
// `;

export const useRegister = () => {
  const t = useTranslations('Register');
  const [isLoading, setIsLoading] = useState(false);
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

  // Use this when your GraphQL mutation is ready
  // const { data, errors, loading } = useGraphQL(registerUser);

  const handleSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // For now, simulate API call
      console.log('Register data:', data);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Replace the above with:
      // const result = await mutate({
      //   variables: {
      //     email: data.email,
      //     password: data.password
      //   }
      // });
      router.push('/login');
    } catch (_error) {
      // Handle errors here
      toast.warning('Associated account', {
        description:
          'Try logging in or recover your password if you have forgotten it.',
      });
      toast.error('Unexpected error occurred', {
        description:
          'Something went wrong. Please check your connection and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    registerFormSchema,
  };
};

export default useRegister;
