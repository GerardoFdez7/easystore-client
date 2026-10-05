'use client';

import { Link, usePathname } from '@i18n/navigation';
import { cn } from '@lib/utils/cn';
import { useTranslations } from 'next-intl';

const profilePathname = '/settings/profile';

export default function SettingsTabs() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const isProfileActive = pathname === profilePathname;

  return (
    <nav aria-label={t('settings')}>
      <ul className="flex gap-1 border-b">
        <li>
          <Link
            href={profilePathname}
            aria-current={isProfileActive ? 'page' : undefined}
            className={cn(
              'focus-visible:border-ring focus-visible:ring-ring/50 inline-flex border-b-2 px-3 py-2 font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
              isProfileActive
                ? 'border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent',
            )}
          >
            {t('profile')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
