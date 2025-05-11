'use client';

import { FormField } from '../shared/FormField';
import { Form } from '@components/atoms/shared/Form';
import ButtonLogin from '@components/atoms/login/ButtonLogin';

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <Form.Root onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <FormField
        name="email"
        label="Correo electrónico"
        type="email"
        placeholder="tucorreo@ejemplo.com"
      />

      <FormField
        name="password"
        label="Contraseña"
        type="password"
        placeholder="••••••••"
      />

      <Form.Submit asChild>
        <ButtonLogin />
      </Form.Submit>
    </Form.Root>
  );
};
