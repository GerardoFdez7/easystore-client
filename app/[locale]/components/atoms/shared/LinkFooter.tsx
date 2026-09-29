import Link from 'next/link';

interface SimpleLinkProps {
  href: string;
  text: string;
}

export default function LinkFooter({ href, text }: SimpleLinkProps) {
  return (
    <Link href={href} className="text-lg font-medium 2xl:text-xl">
      <span className="text-foreground/70 hover:underline">{text}</span>
    </Link>
  );
}
