import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LinkFooter from '@components/atoms/shared/LinkFooter';

export default function Footer() {
  const t = useTranslations('Landing');

  return (
    <footer>
      <div className="px-4 pt-8 pb-10">
        <span style={{ opacity: 0.5 }} className="bg-foreground">
          <div className="bg-foreground mx-auto mb-8 h-0.5 w-auto rounded-full"></div>
        </span>
        <div className="mb-8 flex flex-col items-center gap-7 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:gap-8">
          <LinkFooter href="/#" text={t('community')} />
          <LinkFooter href="/#" text={t('termsConditions')} />
          <LinkFooter href="/#" text={t('privacyPolicy')} />
        </div>

        <div className="mb-4 text-center">
          <span style={{ opacity: 0.5 }} className="text-foreground">
            {t('inc')}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="#" aria-label="Facebook">
            <span style={{ opacity: 0.5 }} className="text-foreground">
              <Facebook className="h-6 w-6" />
            </span>{' '}
          </Link>
          <Link href="#" aria-label="Instagram">
            <span style={{ opacity: 0.5 }} className="text-foreground">
              <Instagram className="h-6 w-6" />
            </span>
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <span style={{ opacity: 0.5 }} className="text-foreground">
              <Linkedin className="h-6 w-6" />
            </span>{' '}
          </Link>
        </div>
      </div>
    </footer>
  );
}
