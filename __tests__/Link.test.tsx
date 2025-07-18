import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('next/link', () => {
  return function FakeLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className} data-testid="fake-link">
        {children}
      </a>
    );
  };
});

import LinkPricing from '@atoms/landing/LinkPricing';
import LinkLog from '@atoms/landing/LinkLogIn';

describe('Components de Link', () => {
  it('<LinkPricing> debe renderizar un enlace con href="#plans"', () => {
    render(<LinkPricing />);
    const link = screen.getByTestId('fake-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#plans');
    expect(link).toHaveClass('text-title', 'text-2xl', 'font-medium');
    expect(link).toHaveTextContent('pricing');
  });

  it('<LinkLog> debe renderizar un enlace con href="/login/"', () => {
    render(<LinkLog />);
    const link = screen.getByTestId('fake-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login/');
    expect(link).toHaveClass(
      'text-text',
      'text-2xl',
      'font-medium',
      'hover:text-gray-900',
    );
    expect(link).toHaveTextContent('login');
  });
});
