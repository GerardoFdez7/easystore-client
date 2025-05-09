import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LinkFooter from '@atoms/shared/LinkFooter';

export default function Footer() {
  const t = useTranslations('Landing');

  return (
    <footer>
      <div className="px-10 pt-8 pb-10 2xl:px-35">
        <span style={{ opacity: 0.7 }} className="bg-foreground">
          <div className="bg-foreground mx-auto mb-8 h-0.5 w-auto rounded-full"></div>
        </span>
        <div className="mb-5 flex flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:justify-center">
          <LinkFooter href="/#" text={t('community')} />
          <LinkFooter href="/#" text={t('termsConditions')} />
          <LinkFooter href="/#" text={t('privacyPolicy')} />
        </div>

        <div className="text-14 sm:text-16 mb-4 text-center">
          <span style={{ opacity: 0.7 }} className="text-foreground">
            {t('inc')}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="#" aria-label="Facebook">
            <span
              style={{ opacity: 0.7 }}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </span>{' '}
          </Link>
          <Link href="#" aria-label="Instagram">
            <span
              style={{ opacity: 0.7 }}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </span>
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <span
              style={{ opacity: 0.7 }}
              className="text-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </span>{' '}
          </Link>
        </div>
      </div>
    </footer>
  );
}
