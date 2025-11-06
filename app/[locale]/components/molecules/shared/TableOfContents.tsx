import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function TableOfContents({
  items,
  activeId,
  className = '',
}: {
  items: { id: string; label: string }[];
  activeId?: string;
  className?: string;
}) {
  const t = useTranslations('Privacy');

  return (
    <nav className={`bg-card rounded-lg p-8 ${className}`}>
      <p className="text-text mb-6 font-medium uppercase">
        {t('tableOfContents')}
      </p>
      <ul className="space-y-1">
        {items.map((x) => {
          const isActive = x.id === activeId;
          return (
            <li
              key={x.id}
              className={`flex w-full items-center rounded-full transition-colors ${isActive ? 'bg-hover' : 'hover:bg-hover'} `}
            >
              <Link
                href={`#${x.id}`}
                className="text-title flex-1 px-6 py-1 font-medium"
              >
                {x.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
