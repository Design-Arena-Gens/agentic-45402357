import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function Card({ children, className = '', onClick, ariaLabel }: CardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`bg-white rounded-lg shadow-md p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(onClick ? { type: 'button' } : {})}
    >
      {children}
    </Component>
  );
}
