import Footer from '@organisms/shared/Footer';
import HeaderLanding from '@organisms/landing/HeaderLanding';
import { PrivacyContent } from '@organisms/privacy/PrivacyContent';

export default function PrivacyTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderLanding />
      <PrivacyContent />
      <Footer />
    </div>
  );
}
