import Link from 'next/link';

interface SimpleLinkProps {
  href: string;
  text: string;
}

export default function LinkFooter({ href, text }: SimpleLinkProps) {
  return (
    <Link href={href} className="text-[17px] font-medium 2xl:text-xl">
      <span
        style={{ opacity: 0.7 }}
        className="text-foreground hover:underline"
      >
        {text}
      </span>
    </Link>
  );
}
