'use client';

import RegisterForm from '@molecules/register/RegisterForm';
import LinkToLogin from '@molecules/register/LinkToLogin';
import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';

export default function MainRegister() {
  const handleRegister = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Register data:', data);
  };

  const handleGoogleAuth = () => {
    // TO DO: implement Google login
    alert('We are working really hard on this feature!');
  };
  const handleFacebookAuth = () => {
    // TO DO: implement Facebook login
    alert('We are working really hard on this feature!');
  };

  return (
    <main className="mb-8 flex flex-col items-center justify-center gap-4 px-4">
      <RegisterForm onSubmit={handleRegister} />
      <LinkToLogin />
      <SocialRegisterButtons
        onGoogleAuth={handleGoogleAuth}
        onFacebookAuth={handleFacebookAuth}
      />
    </main>
  );
}
