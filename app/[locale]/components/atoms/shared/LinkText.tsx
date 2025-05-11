import React from 'react';
import Link from 'next/link';

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkText: React.FC<LinkTextProps> = ({ href, children, className }) => (
  <Link href={href}>
    <a className={`text-primary text-sm hover:underline ${className || ''}`}>
      {children}
    </a>
  </Link>
);

export default LinkText;
