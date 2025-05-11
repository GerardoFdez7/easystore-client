import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  text,
  onClick,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm ${className}`}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </button>
);

export default SocialButton;
