'use client';

import RegisterForm from '@molecules/register/RegisterForm';
import LinkToLogin from '@atoms/register/LinkToLogin';
import SocialRegisterButtons from '@molecules/shared/SocialAuthButtons';
import AcceptTermsAndConditions from '@atoms/register/AcceptTermsAndConditions';

export default function MainRegister() {
  return (
    <main className="mb-8 flex flex-col items-center justify-center gap-4 px-4">
      <RegisterForm />
      <LinkToLogin />
      <SocialRegisterButtons />
      <AcceptTermsAndConditions />
    </main>
  );
}
