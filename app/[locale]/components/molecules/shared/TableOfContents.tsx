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
    <nav className={`rounded-lg bg-gray-100 p-8 ${className}`}>
      <p className="mb-6 text-sm font-medium text-gray-600 uppercase">
        {t('tableOfContents')}
      </p>
      <ul className="space-y-1">
        {items.map((x) => {
          const isActive = x.id === activeId;
          return (
            <li
              key={x.id}
              className={`flex w-full items-center rounded-full transition-colors ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'} `}
            >
              <Link
                href={`#${x.id}`}
                className="flex-1 px-6 py-1 font-medium text-gray-900"
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
