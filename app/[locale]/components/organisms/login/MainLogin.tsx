'use client';

import { LoginForm } from '@molecules/login/LoginForm';
import ForgotPassword from '@molecules/login/ForgotPassword';
import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';

export default function MainLogin() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
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
      <LoginForm onSubmit={handleLogin} />
      <ForgotPassword />
      <SocialRegisterButtons
        onGoogleAuth={handleGoogleAuth}
        onFacebookAuth={handleFacebookAuth}
      />
    </main>
  );
}
