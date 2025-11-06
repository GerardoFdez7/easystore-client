import Footer from '@organisms/shared/Footer';
import HeaderLanding from '@organisms/landing/HeaderLanding';
import { TermsContent } from '@organisms/landing/terms/TermsContent';

export default function TermsTemplate() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderLanding />
      <TermsContent />
      <Footer />
    </div>
  );
}
