import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import LinkFooter from '@atoms/shared/LinkFooter';

export default function Footer() {
  const t = useTranslations('Landing');
  const styleIcons =
    'text-foreground hover:text-primary h-7 w-7 2xl:h-8 2xl:w-8 transition-colors';

  return (
    <footer className="mt-auto px-10 2xl:px-35">
      <span style={{ opacity: 0.7 }}>
        <div className="bg-foreground mx-auto mb-8 h-0.5 w-auto rounded-full"></div>
      </span>
      <div className="mb-9 flex flex-col items-center gap-3 text-center sm:flex-row sm:flex-wrap sm:justify-center">
        <LinkFooter href="/discord" text={t('community')} />
        <LinkFooter href="/terms" text={t('termsConditions')} />
        <LinkFooter href="/privacy" text={t('privacyPolicy')} />
      </div>

      <div className="mb-6 text-center text-[17px] 2xl:mb-9 2xl:text-xl">
        <span style={{ opacity: 0.7 }} className="text-foreground">
          {t('inc')}
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="#" aria-label="Facebook">
          <span style={{ opacity: 0.7 }}>
            <Facebook className={styleIcons} />
          </span>
        </Link>
        <Link href="#" aria-label="Instagram">
          <span style={{ opacity: 0.7 }}>
            <Instagram className={styleIcons} />
          </span>
        </Link>
        <Link href="#" aria-label="LinkedIn">
          <span style={{ opacity: 0.7 }}>
            <Linkedin className={styleIcons} />
          </span>{' '}
        </Link>
      </div>
    </footer>
  );
}
