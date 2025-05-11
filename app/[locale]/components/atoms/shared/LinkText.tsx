import React from 'react';
import Link from 'next/link';

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkText: React.FC<LinkTextProps> = ({ href, children, className }) => (
  <Link href={href} className={`underline ${className}`}>
    {children}
  </Link>
);

export default LinkText;
