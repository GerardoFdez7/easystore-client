import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
// import { useGraphQL } from './useGraphQL';
// import { gql } from '@apollo/client';

// GraphQL mutation (replace this with the actual mutation)
// const loginUser = gql`
//   mutation LoginUser($email: String!, $password: String!) {
//     loginUser(input: { email: $email, password: $password }) {
//       token
//       user {
//         id
//         email
//         # Add other fields as needed
//       }
//     }
//   }
// `;

export const useLogin = () => {
  const t = useTranslations('Login');
  const [isLoading, setIsLoading] = useState(false);

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

  // You can use this when your GraphQL mutation is ready
  // const { data, errors, loading } = useGraphQL(LOGIN_USER);

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // For now, simulate API call
      console.log('Login data:', data);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Replace the above with:
      // const result = await mutate({
      //   variables: {
      //     email: data.email,
      //     password: data.password
      //   }
      // });

      toast.success('Login Sucessful!');

      // Handle successful login (e.g., store token, redirect)
      // localStorage.setItem('token', result.data.loginUser.token);
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Unexpected error occurred', {
        description:
          'Something went wrong. Please check your connection and try again.',
      });
      // other cases
      toast.warning('Invalid credentials', {
        description:
          'The email or password you entered is incorrect. Please try again.',
      });
      toast.error('Account disabled', {
        description:
          'Your account has been disabled. Please contact support for assistance.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    isLoading,
    loginFormSchema,
  };
};

export default useLogin;
