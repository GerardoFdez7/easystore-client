import Link from 'next/link';

export function TableOfContents({
  items,
  className = '',
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  return (
    <nav className={`rounded bg-gray-100 p-4 ${className}`}>
      <ul className="space-y-2">
        {items.map((x) => (
          <li key={x.id}>
            <Link href={`#${x.id}`}>
              <a className="text-primary hover:underline">{x.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
