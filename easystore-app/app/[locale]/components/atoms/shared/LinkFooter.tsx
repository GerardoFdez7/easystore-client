import Link from 'next/link';

interface SimpleLinkProps {
  href: string;
  text: string;
}

export default function LinkFooter({ href, text }: SimpleLinkProps) {
  return (
    <Link href={href} className="font-medium hover:text-gray-900">
      <span style={{ opacity: 0.5 }} className="text-foreground">
        {text}
      </span>
    </Link>
  );
}
