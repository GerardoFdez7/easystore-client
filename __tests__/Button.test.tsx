import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@shadcn/ui/button';
import Link from 'next/link';

describe('Button component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-primary');
    expect(btn).toHaveClass('h-9');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    fireEvent.click(screen.getByRole('button', { name: /press/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>,
    );
    const btn = screen.getByRole('button', { name: /delete/i });
    expect(btn).toHaveClass('bg-destructive');
    expect(btn).toHaveClass('h-10');
  });

  it('renders as child when using asChild', () => {
    render(
      <Button asChild>
        <Link href="/foo">Go</Link>
      </Button>,
    );
    const link = screen.getByRole('link', { name: /go/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/foo');
  });

  it('accepts and merges custom className', () => {
    render(<Button className="my-custom-class">Test</Button>);
    const btn = screen.getByRole('button', { name: /test/i });
    expect(btn).toHaveClass('my-custom-class');
  });
});
