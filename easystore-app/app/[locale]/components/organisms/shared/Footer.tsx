import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Landing');

  return (
    <footer className="mt-auto pt-16">
      <div className="container mx-auto px-4">
        <div className="px-4 pt-8 pb-10 sm:px-15">
          <div className="bg-foreground mx-auto mb-8 h-0.5 w-auto rounded-full"></div>
          <div className="mb-8 flex flex-col items-center gap-7 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:gap-8">
            <Link
              href="/#"
              className="text-foreground font-medium hover:text-gray-900"
            >
              {t('community')}
            </Link>
            <Link
              href="/#"
              className="text-foreground-70 font-medium hover:text-gray-900"
            >
              {t('termsConditions')}
            </Link>
            <Link
              href="/#"
              className="text-foreground-70 font-medium hover:text-gray-900"
            >
              {t('privacyPolicy')}
            </Link>
          </div>

          <div className="text-foreground mb-4 text-center">{t('inc')}</div>

          <div className="flex justify-center gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="text-foreground h-5 w-5 hover:text-gray-600" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="text-foreground h-5 w-5 hover:text-gray-600" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="text-foreground h-5 w-5 hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
